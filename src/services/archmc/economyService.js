import { archmc } from "./client.js";

export async function getBaltopAll() {
  const res = await archmc.get("/v1/economy/baltop");
  return res.data;
}

export async function getBaltopCurrency(currency) {
  const encoded = encodeURIComponent(currency);
  const res = await archmc.get(`/v1/economy/baltop/${encoded}`);
  return res.data;
}
