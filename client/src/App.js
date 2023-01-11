import React from 'react';
import config from './config';
import io from 'socket.io-client';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import {encrypt} from "./encryption/encrypt";
import BottomBar from './BottomBar';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: [],
      content: '',
      name: '',
      offset1: 0,
      offset2: 0,
      offset3: 0
    };
  }

  componentDidMount() {
    this.socket = io(config[process.env.NODE_ENV].endpoint);

    // Load messages in the window.
    this.socket.on('init', (msg, randomName) => {
      let i = 0;
      msg.forEach((subMsg) => {
        msg[i]["content"] = encrypt(subMsg["content"], this.state.offset1,
          this.state.offset2, this.state.offset3);
        i++;
      })

      // let msgReversed = msg.reverse();
      this.setState((state) => ({
        chat: [...state.chat, ...msg],
        name: randomName
      }), this.scrollToBottom);
    });

    // Update the chat if a new message is broadcasted.
    this.socket.on('push', (msg) => {
      this.setState((state) => ({
        chat: [...state.chat, encrypt(msg, this.state.offset1, 
            this.state.offset2, this.state.offset3)],
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

    // Send the new message to the server.
    this.socket.emit('message', {
      name: this.state.name,
      content: encrypt(encrypt(this.state.content, this.state.offset1, 
          this.state.offset2, this.state.offset3), 0, 0, 0),
    });

    this.setState((state) => {
      // Update the chat with the user's message and remove the current message.
      return {
        chat: [...state.chat, {
          name: state.name,
          content: encrypt(state.content, this.state.offset1,
              this.state.offset2, this.state.offset3),
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

  shareOffset( n, offset) {
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

  test() {
    if ((this.state.offset1 === 0) && (this.state.offset2 === 0) &&
      (this.state.offset3 === 0)) {
      return 
    }
  }

  render() {
    return (
      <div className="App">
        <Paper id="chat" elevation={3}>
          {this.state.chat.map((el, index) => {
            return (
              <div key={index}>
                <Typography variant="caption" className="name">
                  {el.name}
                </Typography>
                <Typography variant="body1" className="content">
                  {/* {el.content} */}
                  {encrypt(el.content, this.state.offset1, this.state.offset2,
                    this.state.offset3)}
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
      </div>
    );
  }
};

export default App;