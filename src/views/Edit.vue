<template>
  <div class="padded">
    <textarea></textarea>
    <button class="button" @click="showPreview = !showPreview">
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
import easymde from "../../node_modules/easymde/dist/easymde.min.js";
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
      hideIcons: ["fullscreen", "preview", "side-by-side"],
      initialValue:
        "# EasyMDE \n Go ahead, play around with the editor! Be sure to check out **bold**, *italic* and ~~strikethrough~~ styling, [links](https://google.com) and all the other features. You can type the Markdown syntax, use the toolbar, or use shortcuts like `ctrl-b` or `cmd-b`."
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
