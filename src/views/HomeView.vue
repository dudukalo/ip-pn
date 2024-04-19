<script setup>
import FormIp from "../components/FormIp.vue";

watch(myRef, (newValue, oldValue) => {
  console.log(`Значение ref изменилось с ${oldValue} на ${newValue}`);
  lastChange.value = `изменилось с ${oldValue} на ${newValue}`;
});
</script>

<template>
  <FormIp />
</template>
<style scoped></style>
