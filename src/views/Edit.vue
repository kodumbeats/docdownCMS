<template>
  <div class="padded">
    <div class="editorContainer"><textarea></textarea></div>
    <button class="button" @click="localSave">Save Locally</button>
    <button class="button" @click="loadFromSave">Load Save</button>
    <button class="button" @click="review">Review & Submit</button>
  </div>
</template>

<script>
import axios from "axios";
import easymde from "easymde";
import "../../node_modules/easymde/dist/easymde.min.css";

export default {
  name: "Edit",
  data() {
    return {
      docHeader: "",
      htmlOutput: ""
    };
  },
  methods: {
    initialData() {
      const localStore = localStorage.getItem("docdownCMS");
      const initialData = localStore
        ? JSON.parse(localStore).saved
        : "---\ntitle: Title\ndocnum: SOP-ABC-XXXX\neff: DRAFT\n\n---\n# Begin writing";
      return initialData;
    },
    loadFromSave() {
      this.editor.value(
        JSON.parse(window.localStorage.getItem("docdownCMS")).saved
      );
    },
    localSave() {
      this.$store.dispatch("saveDoc", this.editor.value());
    },
    review() {
      this.localSave();
      this.$router.push("/review");
    }
  },
  mounted() {
    const editor = new easymde({
      toolbar: [
        "bold",
        "italic",
        "strikethrough",
        "underline",
        "|",
        "heading-smaller",
        "heading-bigger",
        "|",
        "table",
        "image",
        "|",
        "preview",
        "side-by-side",
        "fullscreen"
      ],
      initialValue: this.initialData(),
      maxHeight: "500px",
      previewRender: () => {
        return String(this.docHeader + this.htmlOutput);
      },
      sideBySideFullscreen: false
    });
    Object.assign(this, { editor });
    editor.codemirror.on("change", () => {
      this.$store.dispatch("saveMd", editor.value());
      const payload = {
        data: editor.value()
      };
      axios.post("http://localhost:3100/render", payload).then(renderRes => {
        this.htmlOutput = renderRes.data.data;
        this.docHeader = renderRes.data.header;
        this.$store.dispatch(
          "saveHtml",
          String(renderRes.data.header + renderRes.data.data)
        );
      });
    });
  }
};
</script>

<style>
.padded {
  margin: 1em;
  padding: 1em;
}
.editorContainer {
  height: 600px;
}
</style>
