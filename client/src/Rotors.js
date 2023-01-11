import React from "react";

import "./Rotors.css";

export default function Rotors(props) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const {shareOffset, offset1, offset2, offset3} = props;

    return (
        <div id="rotor-bar-wrapper">
          <div id="rotor-bar">
            <div className="rotor" id="rotor1">
              <div>
                <button className="rotor-btn" id="left-btn" onClick={(e) => {
                    (offset1 === 0) ? shareOffset(1, 25) :
                        shareOffset(1, (offset1 - 1));  
                }}>
                  &lt;
                </button>
                <div className="rotor-txt">{alphabet[offset1]}</div>
                <button className="rotor-btn" id="right-btn" onClick={(e) => {
                    (offset1 === 25) ? shareOffset(1, 0) : 
                        shareOffset(1, (offset1 + 1));
                }}>
                  &gt;
                </button>
              </div>
            </div>
            <div className="rotor" id="rotor2">
              <div>
                <button className="rotor-btn" onClick={(e) => {
                    (offset2 === 0) ? shareOffset(2, 25) :
                        shareOffset(2, (offset2 - 1));
                }}>
                  &lt;
                </button>
                <div className="rotor-txt">{alphabet[offset2]}</div>
                <button className="rotor-btn" onClick={(e) => {
                    (offset2 === 25) ? shareOffset(2, 0) :
                        shareOffset(2, (offset2 + 1)); 
                }}>
                  &gt;
                </button>
              </div>
            </div>
            <div className="rotor" id="rotor3">
              <div>
                <button className="rotor-btn" onClick={(e) => {
                    (offset3 === 0) ? shareOffset(3, 25) :
                        shareOffset(3, (offset3 - 1));
                }}>
                  &lt;
                </button>
                <div className="rotor-txt">{alphabet[offset3]}</div>
                <button className="rotor-btn" onClick={(e) => {
                    (offset3 === 25) ? shareOffset(3, 0) :
                        shareOffset(3, (offset3 + 1));
                }}>
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
    )
}