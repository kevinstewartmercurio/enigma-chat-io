import React from 'react';
import config from './config';
import io from 'socket.io-client';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import {encrypt} from "./encryption/encrypt";
import Navbar from "./Navbar";
import BottomBar from './BottomBar';
import HowToUse from './popups/HowToUse';
import HowItWorks from './popups/HowItWorks';
import './App.css';

// when false, all messages get stored in the database as plaintext (so any
// message already in the database when toggling from false to true will have
// an encryption key of AAA)
const toggleEncryption = true;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: [],
      content: '',
      name: '',
      offset1: 0,
      offset2: 0,
      offset3: 0,
      activePopup: null
    };
  }

  componentDidMount() {
    this.socket = io(config[process.env.NODE_ENV].endpoint);

    // Load messages in the window.
    this.socket.on('init', (msg, randomName) => {
      if (toggleEncryption === true) {
        if ((this.state.offset1 === 0) && (this.state.offset2 === 0) &&
          (this.state.offset3 === 0)) {
          let i = 0;
          msg.forEach((subMsg) => {
            msg[i]["content"] = encrypt(subMsg["content"], this.state.offset1,
              this.state.offset2, this.state.offset3);
            i++;
          })
        }
      }

      this.setState(() => ({
        // chat: [...state.chat, ...msg],
        chat: [...msg],
        name: randomName
      }), this.scrollToBottom);
    });

    // Update the chat if a new message is broadcasted.
    this.socket.on('push', (msg) => {
      if (toggleEncryption === true) {
        msg["content"] = encrypt(msg["content"], 0, 0, 0);
      }
      this.setState((state) => ({
        chat: [...state.chat, msg]
      }), this.scrollToBottom);
    });
  }

  // Save the message the user is typing in the input field.
  handleContent(event) {
    this.setState({
      content: event.target.value,
    });
  }

  handleName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  handleSubmit(event) {
    // Prevent the form to reload the current page.
    event.preventDefault();

    let newContent = this.state.content;
    if (toggleEncryption === true) {
      newContent = encrypt(encrypt(this.state.content, this.state.offset1, 
        this.state.offset2, this.state.offset3), 0, 0, 0);
    }

    // Send the new message to the server.
    this.socket.emit('message', {
      name: this.state.name,
      // content: this.state.content
      // content: encrypt(encrypt(this.state.content, this.state.offset1, 
      //     this.state.offset2, this.state.offset3), 0, 0, 0),
      content: newContent
    });

    this.setState((state) => {
      let newContent = state.content;
      if (toggleEncryption === true) {
        newContent = encrypt(state.content, this.state.offset1,
          this.state.offset2, this.state.offset3);
      }

      // Update the chat with the user's message and remove the current message.
      return {
        chat: [...state.chat, {
          name: state.name,
          // content: state.content
          // content: encrypt(state.content, this.state.offset1,
          //     this.state.offset2, this.state.offset3),
          content: newContent
        }],
        content: '',
      };
    }, this.scrollToBottom);
  }

  // Always make sure the window is scrolled down to the last message.
  scrollToBottom() {
    const chat = document.getElementById('chat');
    chat.scrollTop = chat.scrollHeight;
  }

  shareOffset(n, offset) {
    this.socket.emit("init", this.state.chat, this.state.name);
    switch (n) {
      case 1:
        this.setState({
          offset1: offset
        });
        break;
      case 2:
        this.setState({
          offset2: offset
        });
        break;
      case 3:
        this.setState({
          offset3: offset
        });
        break;
      case 4:
        console.log("here");
        break;
      default:
        break;
    }
  }

  sharePopup(popupVal) {
    this.setState({
      activePopup: popupVal
    });
  }

  getActivePopup() {
    if (this.state.activePopup === "how to use") {
      return <HowToUse sharePopup={this.sharePopup.bind(this)}/>;
    } else if (this.state.activePopup === "how it works") {
      return <HowItWorks sharePopup={this.sharePopup.bind(this)}/>;
    }

    return null;
  }

  render() {
    return (
      <>
        <div className="App">
          <Navbar sharePopup={this.sharePopup.bind(this)}/>
          <Paper id="chat" elevation={0}>
            {this.state.chat.map((el, index) => {
              return (
                <div key={index}>
                  <Typography variant="caption" className="name">
                    {el.name}
                  </Typography>
                  <Typography variant="body1" className="content">
                    {/* {el.content} */}
                    {(toggleEncryption === true) ? ((typeof(el) === "string") ? 
                      encrypt(el, this.state.offset1, this.state.offset2, 
                      this.state.offset3) : encrypt(el.content, 
                      this.state.offset1, this.state.offset2, 
                      this.state.offset3)) : el.content}
                  </Typography>
                </div>
              );
            })}
          </Paper>
          <BottomBar
            id="bottomBar"
            content={this.state.content}
            handleContent={this.handleContent.bind(this)}
            handleSubmit={this.handleSubmit.bind(this)}
            shareOffset={this.shareOffset.bind(this)}
            offset1={this.state.offset1}
            offset2={this.state.offset2}
            offset3={this.state.offset3}
          />
          {this.getActivePopup()}
        </div>
      </>
    );
  }
};

export default App;