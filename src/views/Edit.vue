<template>
  <div>
    <div class="editor"><textarea></textarea></div>
    <div class="output"><span v-html="htmlOutput"></span></div>
  </div>
</template>

<script>
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
    editor.codemirror.on("change", function() {
      console.log(editor.value());
    });
  }
};
</script>

<style>
.editor {
  margin: 1em;
  padding: 1em;
}
</style>
