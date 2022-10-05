import { render } from "solid-js/web";
import "./index.css";
import { Popup } from "./Popup";

const root = document.querySelector("#root");
if (!root) {
  throw new Error("Can not find root");
}

render(Popup, root);