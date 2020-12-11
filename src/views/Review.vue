<template>
  <div class="padded">
    <div class="editorContainer"><textarea></textarea></div>
  </div>
</template>

<script>
import axios from "axios";
import easymde from "easymde";
import "../../node_modules/easymde/dist/easymde.min.css";

export default {
  name: "Review",
  data() {
    return {
      lastRevision: "",
      newDraft: ""
    };
  },
  methods: {},
  mounted() {
    const editor = new easymde({
      toolbar: [],
      initialValue: "",
      maxHeight: "500px"
    });
    Object.assign(this, { editor });
    this.newDraft = window.localStorage.getItem("docdownCMS").saved;
    axios.get("http://localhost:3100/revisions", res => {
      if (res.revisions.length == 0) {
        this.lastRevision = "";
      } else {
        this.lastRevision = res.revisions[res.revisions.length - 1];
      }
    });
  }
};
</script>

<style></style>
