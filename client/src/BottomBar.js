import React from 'react';

import Rotors from "./Rotors";
import './BottomBar.css';

export default function BottomBar(props) {
  return (
    <div id="bottom-bar">
        <Rotors
          shareOffset={props.shareOffset}
          offset1={props.offset1}
          offset2={props.offset2}
          offset3={props.offset3}
        />
        <div id="msg-container">
          <form onSubmit={props.handleSubmit}>
            <input
              id="input-base"
              onChange={props.handleContent}
              value={props.content}
              placeholder="type your message..."
            />
          </form>
        </div>
    </div>
  );
}