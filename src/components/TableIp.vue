<script setup>
import { ref, onMounted } from "vue";
import { useStoreIp } from "../store.js";
import useQueryIp from "../hooks/useQueryIp";
import { Delete, Search, CopyDocument } from "@element-plus/icons-vue";
import { debounce } from "lodash";

import StatusIcon from "../components/StatusIcon.vue";

const storeIp = useStoreIp();
const filterQuery = ref("");
const selectedRows = ref([]);
const queryArrIp = useQueryIp();

onMounted(() => {
  storeIp.setItems(queryArrIp);
});

const handleFilterInput = debounce(function () {
  storeIp.filter = filterQuery.value;
  console.log(storeIp.filter);
}, 500);

const handleDeleteItemsClick = () => {
  storeIp.deleteItems(selectedRows.value.map((item) => item.id));
};

const isSelected = (row) => {
  return selectedRows.value.some((selected) => selected.id === row.id);
};

const setSelectedRows = (val) => {
  selectedRows.value = val;
};

const copyIp = async (ip) => {
  try {
    await navigator.clipboard.writeText(ip);
  } catch (err) {
    console.error("Ошибка копирования", err);
  }
};
</script>

<template>
  <el-input
    v-model="filterQuery"
    @input="handleFilterInput"
    placeholder="Фильтровать по всем полям"
    :prefix-icon="Search"
    style="width: 300px; margin-bottom: 20px"
  />

  <el-table
    :data="storeIp.filterSortItems"
    style="width: 100%"
    @selection-change="setSelectedRows"
    height="500"
    row-key="id"
  >
    <template #empty>
      <div class="custom-empty-text">Нет данных для отображения</div>
    </template>

    <el-table-column type="selection" width="50" />

    <el-table-column prop="ip" label="IP" class-name="cell-id">
      <template #header>
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          IP
          <el-button
            v-if="selectedRows.length > 1"
            type="danger"
            plain
            size="small"
            style="float: right"
            @click="handleDeleteItemsClick"
            >Удалить выбранные</el-button
          >
        </div>
      </template>

      <template #default="scope">
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          {{ scope.row.ip }}

          <el-button
            v-if="isSelected(scope.row) && selectedRows.length === 1"
            type="danger"
            :icon="Delete"
            size="small"
            circle
            @click="handleDeleteSelectedItems"
            style="margin-left: auto"
          />
          <el-button
            :icon="CopyDocument"
            circle
            size="small"
            @click="copyIp(scope.row.ip)"
          />
        </div>
      </template>
    </el-table-column>

    <el-table-column prop="country">
      <template #header>
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          Country
          <el-select
            v-model="storeIp.sort.dir"
            placeholder="Select"
            size="small"
            style="width: 100px"
          >
            <el-option label="A-Z" value="asc" />
            <el-option label="Z-A" value="desc" />
          </el-select>
        </div>
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

<style scoped>
.id-cell {
  background-color: red;
}
</style>
