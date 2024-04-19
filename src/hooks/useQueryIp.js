import { useRoute } from "vue-router";

export default function useQueryIp() {
  const route = useRoute();

  return route.query.ips
    ? route.query.ips
        .split(",")
        .map((ip) => ip.trim())
        .filter((ip) => ip)
    : [];
}
