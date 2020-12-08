<template>
  <div>
    <nav class="navbar is-info" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">docdownCMS</router-link>
        <router-link class="navbar-item" to="/edit">edit</router-link>
      </div>
    </nav>
    <router-view />
    <p>{{ $store.state.html }}</p>
  </div>
</template>

<style>
html,
body {
  padding: 0;
  margin: 0;
}
</style>
