import path, { resolve } from "path";
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

const root = resolve(__dirname, "src");
const pagesDir = resolve(root, "pages");
const outDir = resolve(__dirname, "dist");
const publicDir = resolve(__dirname, "public");
const isDev = process.env.__DEV__ === "true";

export default defineConfig({
  plugins: [solidPlugin()],
  publicDir,
  build: {
    outDir,
    rollupOptions: {
      input: {
        popup: resolve(pagesDir, "popup", "index.html"),
      },
      output: {
        entryFileNames: "src/pages/[name]/index.js",
        chunkFileNames: isDev
          ? "assets/js/[name].js"
          : "assets/js/[name].[hash].js",
        assetFileNames: (assetInfo) => {
          const { dir, name: _name } = path.parse(assetInfo.name);
          const assetFolder = getLastElement(dir.split("/"));
          const name = assetFolder + firstUpperCase(_name);
          return `assets/[ext]/${name}.chunk.[ext]`;
        },
      },
    },
  },
});

function getLastElement<T>(array: ArrayLike<T>): T {
  const length = array.length;
  const lastIndex = length - 1;
  return array[lastIndex];
}

function firstUpperCase(str: string) {
  const firstAlphabet = new RegExp(/( |^)[a-z]/, "g");
  return str.toLowerCase().replace(firstAlphabet, (L) => L.toUpperCase());
}
