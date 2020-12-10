<template>
  <div class="padded">
    <textarea></textarea>
    <button
      class="button"
      :class="[showPreview ? 'is-info' : '']"
      @click="showPreview = !showPreview"
    >
      Show Preview
    </button>
    <button class="button" @click="localSave">Save Locally</button>
    <button class="button" @click="review">Review & Submit</button>
    <hr />
    <div v-show="showPreview">
      <div v-html="docHeader"></div>
      <div v-html="htmlOutput"></div>
    </div>
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
      showPreview: false,
      docHeader: "",
      htmlOutput: ""
    };
  },
  methods: {
    localSave() {
      console.log("localSave");
    },
    review() {
      console.log("review");
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
        "heading",
        "heading-bigger",
        "|",
        "table",
        "image",
        "|",
        "preview",
        "side-by-side",
        "fullscreen"
      ],
      initialValue:
        "---\ntitle: Title\ndocnum: SOP-ABC-XXXX\neff: DRAFT\n\n---\n# Begin writing"
    });
    editor.codemirror.on("change", () => {
      this.$store.dispatch("saveMd", editor.value());
      const payload = {
        data: editor.value()
      };
      axios.post("http://localhost:3100/render", payload).then(renderRes => {
        this.htmlOutput = renderRes.data.data;
        this.docHeader = renderRes.data.header;
        this.$store.dispatch("saveHtml", renderRes.data.data);
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
</style>
