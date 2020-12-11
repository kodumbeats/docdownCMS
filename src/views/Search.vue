<template>
  <div class="search">
    <article class="panel is-success">
      <p class="panel-heading">
        Document Control
      </p>
      <a
        v-for="(doc, index) in $store.getters.getRevisions"
        :key="index"
        class="panel-block is-active"
      >
        <span class="panel-icon">
          <i class="fas fa-book" aria-hidden="true"></i>
        </span>
        <!--&emsp; is four spaces-->
        {{ doc.title }}&emsp;rev: {{ index }}
      </a>
    </article>
  </div>
</template>
