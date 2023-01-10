import React from "react";

import "./Rotors.css";

export default function Rotors(props) {
    // let mappingStr1 = "ekmflgdqvzntowyhxuspaibrcj";
    // let mappingStr2 = "ajdksiruxblhwtmcqgznpyfvoe";
    // let mappingStr3 = "bdfhjlcprtxvznyeiwgakmusqo";
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // const {shareOffsets, offset1, offset2, offset3, ...rest} = props;

    // console.log(offset1, " in Rotors.js");

    return (
        <div id="rotor-bar-wrapper">
          <div id="rotor-bar">
            <div className="rotor" id="rotor1">
              <p className="rotor-txt">
                <button className="rotor-btn">
                  &lt;
                </button>
                &nbsp;A&nbsp;
                <button className="rotor-btn">
                  &gt;
                </button>
              </p>
            </div>
            <div className="rotor" id="rotor2">
              <p className="rotor-txt">
                <button className="rotor-btn">
                  &lt;
                </button>
                &nbsp;A&nbsp;
                <button className="rotor-btn">
                  &gt;
                </button>
              </p>
            </div>
            <div className="rotor" id="rotor3">
              <p className="rotor-txt">
                <button className="rotor-btn">
                  &lt;
                </button>
                &nbsp;A&nbsp;
                <button className="rotor-btn">
                  &gt;
                </button>
              </p>
            </div>
          </div>
        </div>
    )
}