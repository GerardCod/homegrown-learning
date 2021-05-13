import React from "react";
import ReactDom from "react-dom";
import "./global.css";
import App from "./components/App";
const container = document.getElementById("app");

ReactDom.render(<App />, container);
