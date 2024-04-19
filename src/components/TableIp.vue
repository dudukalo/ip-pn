<script setup>
import { ref, onMounted } from "vue";
import { useStoreIp } from "../store.js";
import useQueryIp from "../hooks/useQueryIp";
import { Delete, Search } from "@element-plus/icons-vue";

import StatusIcon from "../components/StatusIcon.vue";

const storeIp = useStoreIp();
const selectedRows = ref([]);
const queryArrIp = useQueryIp();

onMounted(() => {
  storeIp.setItems(queryArrIp);
});

const isSelected = (row) => {
  return selectedRows.value.some((selected) => selected.id === row.id);
};

const handleSelectionChange = (val) => {
  selectedRows.value = val;
};

const handleDeleteSelectedItems = () => {
  storeIp.deleteItems(selectedRows.value.map((item) => item.id));
};

const handleDeleteItem = (id) => {
  storeIp.deleteItem(id);
};
</script>

<template>
  <el-input
    v-model="storeIp.filter"
    style="width: 460px"
    placeholder="Фильтровать"
    :prefix-icon="Search"
  />

  <el-table
    :data="storeIp.filterSortItems"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    height="500"
  >
    <template #empty>
      <div class="custom-empty-text">Нет данных для отображения</div>
    </template>

    <el-table-column type="selection" width="50" />

    <el-table-column prop="ip" label="IP">
      <template #header>
        IP
        <el-button
          v-if="selectedRows.length > 1"
          type="danger"
          plain
          @click="handleDeleteSelectedItems"
          >Удалить выбранные</el-button
        >
      </template>

      <template #default="scope">
        {{ scope.row.ip }}

        <el-button
          v-if="isSelected(scope.row) && selectedRows.length === 1"
          type="danger"
          :icon="Delete"
          circle
          @click="handleDeleteItem(scope.row.id)"
        />
      </template>
    </el-table-column>

    <el-table-column prop="country">
      <template #header>
        Country
        <el-select
          v-model="storeIp.sort.dir"
          placeholder="Select"
          size="small"
          style="width: 240px"
        >
          <el-option label="A-Z" value="asc" />
          <el-option label="Z-A" value="desc" />
        </el-select>
      </template>
    </el-table-column>

    <el-table-column prop="city" label="City/Town" />

    <el-table-column prop="status" label="Status" align="right">
      <template #default="scope">
        <StatusIcon :status="scope.row.status" />
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped></style>
