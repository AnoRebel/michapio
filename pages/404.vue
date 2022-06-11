<template>
  <div class="container">
    <div class="flex">
      <div class="text-center">
        <img src="/images/404.svg" />
        <a>
          <NuxtLink to="/" class="btn"> Home </NuxtLink>
        </a>
      </div>
      <div class="text-center">
        <p>
          <small>&copy; Reserverd Rights</small>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "user",
  title: "Not Found",
  // pageTransition: "moveUp",
  // layoutTransition: "moveUp",
});
</script>

<style scoped>
a {
  color: #1aa59a;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  transition: all 0.3s ease;
  margin-bottom: 120px !important;
  margin-left: -90px !important;
}
a:hover {
  color: #137971;
}
</style>
