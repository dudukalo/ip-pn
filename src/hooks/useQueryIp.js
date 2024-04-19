import { ref } from "vue";
import { useRoute } from "vue-router";

export default function useQueryIp() {
  const route = useRoute();
  const query = ref(route.query);

  return query.value.ips
    ? query.value.ips
        .split(",")
        .map((ip) => ip.trim())
        .filter((ip) => ip)
    : [];
}
