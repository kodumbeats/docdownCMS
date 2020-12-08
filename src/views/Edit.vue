<template>
  <div>
    <div class="padded"><textarea></textarea></div>
    <hr />
    <h1>Rendered Output</h1>
    <div class="padded"><span v-html="htmlOutput"></span></div>
    <hr />
    <h1>Raw Output</h1>
    <div class="padded">{{ htmlOutput }}</div>
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
      htmlOutput: ""
    };
  },
  mounted() {
    const editor = new easymde({
      initialValue:
        "# EasyMDE \n Go ahead, play around with the editor! Be sure to check out **bold**, *italic* and ~~strikethrough~~ styling, [links](https://google.com) and all the other features. You can type the Markdown syntax, use the toolbar, or use shortcuts like `ctrl-b` or `cmd-b`."
    });
    editor.codemirror.on("change", () => {
      const payload = {
        data: editor.value()
      };
      axios.post("http://localhost:3100/render", payload).then(renderRes => {
        this.htmlOutput = renderRes.data.data;
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
