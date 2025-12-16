import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "riux0n0i",
  dataset: "production",
  apiVersion: "2023-01-01",
  token: import.meta.env.VITE_SANITY_TOKEN, 
  useCdn: false,
});
