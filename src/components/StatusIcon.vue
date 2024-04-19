<script setup>
import { computed } from "vue";
import { Check, Refresh, Close } from "@element-plus/icons-vue";

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
});

const label = computed(() => {
  let statusObj = {
    loading: "В процессе",
    success: "Успешно",
    fail: "Не успешно",
  };

  return statusObj[props.status];
});
</script>

<template>
  <el-tooltip :content="label" placement="top">
    <el-icon v-if="status === 'loading'" color="orange"><Refresh /></el-icon>
    <el-icon v-if="status === 'success'" color="green"><Check /></el-icon>
    <el-icon v-if="status === 'fail'" color="red"><Close /></el-icon>
  </el-tooltip>
</template>

<style scoped></style>
