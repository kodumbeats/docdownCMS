<template>
  <div>
    <div id="diffHtml" v-html="diffHtml"></div>
    <button class="button" @click="$router.push('/edit')">Make changes</button>
    <button class="button" @click="submitRevision">Submit</button>
    <div class="notification is-success" v-show="notification">
      <button class="delete" @click="notification = false"></button>
      Revision saved successfully.
    </div>
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
      diffHtml: "",
      notification: false
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
      console.log(this.lastRevision, this.newDraft);
      const diff = Diff.createPatch(
        "testSOP.md",
        this.lastRevision,
        this.newDraft
      );
      this.diffHtml = Diff2Html.html(diff, {
        matching: "lines"
      });
      this.diff = diff;
    },
    async submitRevision() {
      this.$store.dispatch("saveRevision", this.newDraft);
      this.notification = true;
    }
  },
  async mounted() {
    await this.calcDiff();
  }
};
</script>

<style>
.notification {
  position: absolute;
  bottom: 0;
  width: 25%;
}
</style>
