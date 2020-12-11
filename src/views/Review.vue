<template>
  <div>
    <div id="diffHtml" v-html="diffHtml"></div>
  </div>
</template>

<script>
import axios from "axios";
import * as Diff from "diff";
import * as Diff2Html from "../../node_modules/diff2html/bundles/js/diff2html.min.js";
import "../../node_modules/diff2html/bundles/css/diff2html.min.css";

export default {
  name: "Review",
  data() {
    return {
      lastRevision: "",
      newDraft: "",
      diff: "",
      diffHtml: ""
    };
  },
  methods: {
    async calcDiff() {
      this.newDraft = JSON.parse(
        window.localStorage.getItem("docdownCMS")
      ).saved;
      console.log(this.newDraft);
      const res = await axios.get("http://localhost:3100/revisions");
      const revisions = res.data.revisions;
      console.log(revisions);
      if (revisions.length == 0) {
        this.lastRevision = "";
      } else {
        this.lastRevision = revisions[revisions.length - 1];
      }
      console.log(this.lastRevision);
      // const diff = Diff.diffWords(this.lastRevision, this.newDraft)
      const diff = Diff.createPatch(
        "testSOP.md",
        this.lastRevision,
        this.newDraft
      );
      this.diffHtml = Diff2Html.html(diff, {
        matching: "lines"
      });
      this.diff = diff;
    }
  },
  async mounted() {
    await this.calcDiff();
  }
};
</script>

<style></style>
