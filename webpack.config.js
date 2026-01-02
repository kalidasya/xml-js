import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import UnminifiedWebpackPlugin from "unminified-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: {
    dist: "./lib/index.js",
    doc: "./lib/index.js",
  },
  output: {
    filename: "[name]/xml-js.min.js",
    path: resolve(__dirname, "dist"),
    libraryTarget: "window",
  },
  plugins: [new UnminifiedWebpackPlugin()],
  resolve: {
    fallback: {
       "stream": import.meta.resolve("stream-browserify")
    }
  }
};
