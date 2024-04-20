<script setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";

const searchIp = ref("");
</script>

<template>
  <el-input
    v-model="searchIp"
    style="width: 460px"
    placeholder="Поиск"
    :prefix-icon="Search"
  />
</template>

<style scoped></style>
