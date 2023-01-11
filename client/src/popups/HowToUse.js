import React from "react";

import "./popup.css";

export default function HowToUse(props) {
    let r = document.querySelector(":root");

    return (
        <div className="popup-wrapper">
            <div className="popup-content" id="how-to-use-content">
                <div className="top-line">
                    <h1 className="top-line-h1">
                        sending messages
                    </h1>
                    <button className="exit-btn" onClick={(e) => {
                        props.sharePopup(null);
                        r.style.setProperty("--blurVal", "blur(0px)");
                    }}>
                        x
                    </button>
                </div>
                <ol>
                    <li>
                        change your rotor offsets to whichever encryption 
                        settings you wish to use
                    </li>
                    <li>
                        type your plaintext message into the input field
                    </li>
                    <li>
                        hit enter
                    </li>
                </ol>
                <p>
                    after hitting enter your message is converted into
                    ciphertext, sent to the server, and shown to all other
                    users.
                </p>
                <p>
                    <b>note:</b> only those using the same offset values you
                    used to encrypt your message will be able to see your
                    plaintext message.
                </p>
                <h1>
                    reading messages
                </h1>
                <ol>
                    <li>
                        obtain the rotor offsets used by the author of
                        whichever message you wish to read
                    </li>
                    <li>
                        change your rotor offsets to match those used by the
                        author
                    </li>
                </ol>
                <p>
                    once your rotor offsets match those used by the author, the
                    author's plaintext message will be displayed to you.
                </p>
            </div>
        </div>
    )
}