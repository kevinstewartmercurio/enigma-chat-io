import React from "react";

import "./popup.css";
import diagram from "../static/enigma-diagram.png";

export default function HowItWorks(props) {
    let r = document.querySelector(":root");

    return (
        <div className="popup-wrapper">
            <div className="popup-content" id="how-it-works-content">
                <div className="top-line">
                    <h1 className="top-line-h1">
                        the enigma machine explained
                    </h1>
                    <button className="exit-btn" onClick={(e) => {
                        props.sharePopup(null);
                        r.style.setProperty("--blurVal", "blur(0px)");
                    }}>
                        x
                    </button>
                </div>
                <p>
                    enigmachat.io features one chat room for all users. in order
                    to maintain a level of privacy, we rely on the enigma
                    machine.
                </p>
                <div id="img-wrapper">
                    <img src={diagram} alt="enigma machine diagram" 
                        id="diagram"/>
                </div>
                <p>
                    for each plaintext letter <i>c</i>, the encryption process
                </p>
                <ol>
                    <li>
                        maps <i>c</i> through the plugboard to obtain a new
                        letter
                    </li>
                    <li>
                        sends that new letter through three rotors, eaching one 
                        mapping to another new letter
                    </li>
                    <li>
                        maps that new letter through the reflector to obtain 
                        yet another new letter
                    </li>
                    <li>
                        sends that new letter back through each of the three 
                        rotors, again obtaining a new letter at each rotor
                    </li>
                    <li>
                        and finally, maps that letter through the plugboard to
                        obtain an encrypted letter <i>c'</i>
                    </li>
                </ol>
                <p>
                    once <i>c'</i> is obtained the first rotor kicks, 
                    after the first rotor has completed a full rotation 
                    (26 kicks) the second rotor kicks, after the second
                    rotor has completed a full rotation (26 kicks) the third
                    rotor kicks. at this point the process for encrypting 
                    <i>c</i> is done and the machine can move on to the next
                    letter.
                </p>
                <p>
                    <b>note:</b> the plugboard is not implemented in 
                    enigmachat.io. this means that the encryption used in
                    enigmachat.io is not as strong as the encryption used by
                    the original enigma machine, but there are 17,576 possible
                    rotor offset combinations and if someone wanted to decipher
                    your message without knowing the offsets you used they would
                    have to try each combination.
                </p>
                <p>
                    for more information on the enigma machine, check out this
                    page <a href="https://brilliant.org/wiki/enigma-machine/#:~:text=An%20Enigma%20machine%20is%20a,time%20the%20code%20seemed%20unbreakable." 
                        target="_blank" rel="noreferrer">
                        https://brilliant.org/wiki/enigma-machine/
                    </a>
                </p>
            </div>
        </div>
    )
}