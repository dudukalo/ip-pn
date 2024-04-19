import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const apiURL = "http://ip-api.com/json";

export const useStoreIp = defineStore("storeIp", () => {
  const data = reactive({
    error: false,
    items: [],
    filter: "",
    sort: {
      column: "country",
      dir: "asc",
    },
  });

  const addItem = async (ip) => {
    data.items.push({
      id: uuidv4(),
      ip: ip,
      country: "",
      city: "",
      status: "loading",
    });

    const item = data.items.at(-1);
    axios
      .get(`${apiURL}/${ip}`)
      .then((response) => {
        const { country, city, status } = response.data;

        item.city = city || "";
        item.country = country || "";
        item.status = status;
      })
      .catch((error) => {
        console.log(error);
        data.error = true;
      });
  };

  const setItems = (arr) => {
    data.items.length = 0;
    arr.forEach((ip) => addItem(ip));
  };

  const deleteItem = (id) => {
    const index = data.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      data.items.splice(index, 1);
    }
  };

  const deleteItems = (ids) => {
    data.items = ref(data.items.filter((item) => !ids.includes(item.id)));
  };

  return { data, addItem, setItems, deleteItem, deleteItems };
});
