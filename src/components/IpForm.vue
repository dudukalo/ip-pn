<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const sampleArrIps = String(
  ["31.41.0.1", "31.41.0.2", "313.41.0.1"].join(",\n")
);
const listIpText = ref(sampleArrIps);

const handleSubmit = () => {
  router.push(`/result?ips=${listIpText.value}`);
};
</script>

<template>
  <el-form @submit.native.prevent="handleSubmit" style="max-width: 620px">
    <el-form-item>
      <el-input
        v-model="listIpText"
        type="textarea"
        rows="6"
        placeholder="Введите IP адреса через запятую"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit"> Отправить </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.header {
  background-color: #f2f0f0;
}

.header__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
}
</style>
