<template>
  <div>
    <nav class="navbar is-info" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">docdownCMS</router-link>
        <router-link class="navbar-item" to="/edit">edit</router-link>
      </div>
    </nav>
    <div class="columns">
      <div class="column is-1"><router-view name="sidebar"></router-view></div>
      <div class="column is-10"><router-view name="default"></router-view></div>
      <div class="column is-1"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    renderedHtml: {
      get() {
        return this.$store.state.html;
      }
    }
  }
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
}
</style>
