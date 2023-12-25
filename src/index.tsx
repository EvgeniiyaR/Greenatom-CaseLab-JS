import { createRoot } from "react-dom/client";
import { App } from "./App";
const domNode =document.querySelector("#root");
if (domNode) {
    const root = createRoot(domNode);
    root.render(<App/>);
} else {
    console.error("Root node is null");
}