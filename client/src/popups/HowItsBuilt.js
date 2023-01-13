import React from "react"

import {Icon} from "@iconify/react";

export default function HowItsBuilt(props) {
    let r = document.querySelector(":root");

    return (
        <div className="popup-wrapper">
            <div className="popup-content" id="how-to-use-content">
                <div className="top-line">
                    <h1 className="top-line-h1">
                        tools used
                    </h1>
                    <button className="exit-btn" onClick={(e) => {
                        props.sharePopup(null);
                        r.style.setProperty("--blurVal", "blur(0px)");
                    }}>
                        x
                    </button>
                </div>
                <p>
                    enigmachat.io is a full stack web application, hosted on
                    Heroku, that was built using the mern stack (MongoDB, 
                    Express, React, and Node.js).
                </p>
                <div id="icon-bar">
                    <Icon className="popup-icon" icon="logos:heroku"/>
                    <Icon className="popup-icon" icon="logos:mongodb"/>
                    <Icon className="popup-icon" icon="logos:express"/>
                    <Icon className="popup-icon" icon="logos:react"/>
                    <Icon className="popup-icon" icon="fa6-brands:node"/>
                </div>
                <p>
                    additionally the enigma module responsible for all
                    encryption was written in JavaScript, the browser icon came
                    from&nbsp;
                    <a href="https://www.flaticon.com/free-icons/encrypted"
                        title="encrypted icons" target="_blank"
                        rel="noreferrer"
                    >
                        an artist on Flaticon
                    </a>
                    , and the icons above came from&nbsp;
                    <a href="https://iconify.design" target="_blank"
                        rel="noreferrer">
                        iconify.design
                    </a>
                    .
                </p>
                <p>
                    a github repository for this project can be found&nbsp;
                    <a href="https://github.com/kstewartmercurio/enigma-chat-io"
                        target="_blank" rel="noreferrer">
                        here
                    </a>
                    .
                </p>
                <div id="credit-tag-wrapper">
                    <p id="credit-tag">
                        designed and built by Kevin Stewart-Mercurio &#x2022;
                        january 2023
                    </p>
                </div>
            </div>
        </div>
    )
}
// <a href="https://www.flaticon.com/free-icons/encrypted" title="encrypted icons">Encrypted icons created by Muhammad Atif - Flaticon</a>