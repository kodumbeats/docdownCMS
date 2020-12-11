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
  // data() {
  //   return {
  //   };
  // },
  methods: {},
  mounted() {
    const editor = new easymde({
      toolbar: [],
      initialValue: "",
      maxHeight: "500px"
    });
    Object.assign(this, { editor });
  }
};
</script>

<style></style>
