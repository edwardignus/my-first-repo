import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "dup-web",

  projectId: "riux0n0i",
  dataset: "production",

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },
});
