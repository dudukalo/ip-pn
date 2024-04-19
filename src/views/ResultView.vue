<script setup>
import { watch } from "vue";
import { useStoreIp } from "../store.js";
import { ElNotification } from "element-plus";

import TableIp from "../components/TableIp.vue";

const storeIp = useStoreIp();

watch(
  () => storeIp.error,
  (newValue) => {
    if (newValue) {
      ElNotification({
        title: "Ошибка",
        message: "Проблема с загрузкой данных",
        type: "error",
      });
    }
  }
);
</script>

<template>
  {{ storeIp.getErrorStatus }}
  <TableIp />
</template>

<style scoped></style>
