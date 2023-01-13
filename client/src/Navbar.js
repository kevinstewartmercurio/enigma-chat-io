import React from "react";

import "./Navbar.css";

export default function Navbar(props) {
    let r = document.querySelector(":root");

    return (
        <div id="navbar">
          <p id="header">
            enigmachat.io
          </p>
          <div id="navbar-right">
            <button className="nav-btn" id="use-btn" onClick={(e) => {
                props.sharePopup("how to use");
                r.style.setProperty("--blurVal", "blur(3px)");
            }}>
              how to use
            </button>
            <button className="nav-btn" id="explanation-btn" onClick={(e) => {
                props.sharePopup("how it works");
                r.style.setProperty("--blurVal", "blur(3px)");
            }}>
              how it works
            </button>
            <button className="nav-btn" id="tools-btn" onClick={(e) => {
              props.sharePopup("how it's built");
              r.style.setProperty("--blurVal", "blur(3px");
            }}>
              how it's built
            </button>
          </div>
        </div>
    )
}