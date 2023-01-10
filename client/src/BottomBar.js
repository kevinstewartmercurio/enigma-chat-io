import React, {useState} from 'react';

import Rotors from "./Rotors";
import './BottomBar.css';

export default function BottomBar(props) {
  // const [offset1, setOffset1] = useState(0);
  // const [offset2, setOffset2] = useState(0);
  // const [offset3, setOffset3] = useState(0);

  // const shareOffsets = (n, offset) => {
  //   switch (n) {
  //     case 1:
  //       setOffset1(offset);
  //       break;
  //     case 2:
  //       setOffset2(offset);
  //       break;
  //     case 3:
  //       setOffset3(offset);
  //       break;
  //     default:
  //       break;
  //   }
  // }

  // const {shareOffsets, offset1, offset2, offset3, ...rest} = props;

  return (
    <div id="bottom-bar">
        <Rotors/>
        <div id="msg-container">
          <form onSubmit={props.handleSubmit}>
            <input
              id="input-base"
              onChange={props.handleContent}
              value={props.content}
              placeholder="type your message..."
              shareOffsets={props.shareOffsets}
              // offset1={offset1}
              // offset2={offset2}
              // offset3={offset3}
            />
          </form>
        </div>
    </div>
  );
}