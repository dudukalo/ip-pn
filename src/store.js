import { defineStore } from "pinia";
import { computed, ref, reactive } from "vue";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const apiURL = "http://ip-api.com/json";

export const useStoreIp = defineStore("storeIp", () => {
  const items = ref([]);
  const filter = ref("");
  const error = ref(false);
  const sort = reactive({
    column: "country",
    dir: "asc",
  });

  const addItem = async (ip) => {
    items.value.push({
      id: uuidv4(),
      ip: ip,
      country: "",
      city: "",
      status: "loading",
    });

    const item = items.value.at(-1);

    axios
      .get(`${apiURL}/${ip}?fields=status,country,city`)
      .then((response) => {
        const { status, country, city } = response.data;

        item.status = status;
        if (status === "success") {
          item.city = city;
          item.country = country;
        }
      })
      .catch(() => {
        error.value = true;
      });
  };

  const filterSortItems = computed(() => {
    return items.value
      .filter((item) => {
        return Object.values(item).some((value) => {
          return value
            .toString()
            .toLowerCase()
            .includes(filter.value.toLowerCase());
        });
      })
      .sort((a, b) => {
        if (sort.dir === "asc") {
          return a[sort.column].localeCompare(b[sort.column]);
        }
        if (sort.dir === "desc") {
          return b[sort.column].localeCompare(a[sort.column]);
        }
      });
  });

  const setItems = (arr) => {
    items.value = [];
    arr.forEach((ip) => addItem(ip));
  };

  const deleteItem = (id) => {
    items.value = items.value.filter((item) => item.id !== id);
  };

  const deleteItems = (ids) => {
    items.value = items.value.filter((item) => !ids.includes(item.id));
  };

  return {
    items,
    error,
    sort,
    filter,
    filterSortItems,
    addItem,
    setItems,
    deleteItem,
    deleteItems,
  };
});
