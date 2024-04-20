<script setup>
import Logo from "./Logo.vue";
import Search from "./Search.vue";
import Nav from "./Nav.vue";
</script>

<template>
  <header class="header">
    <div class="container header__container">
      <Logo />
      <Search />
      <Nav />
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: #f0f2f5;
  margin-bottom: 40px;
}

.header__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
}
</style>
