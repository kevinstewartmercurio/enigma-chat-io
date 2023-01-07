import React from 'react';

// import { fade, makeStyles } from '@material-ui/core/styles';
// import { createTheme } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import InputBase from '@mui/material/InputBase';
import Toolbar from '@mui/material/Toolbar';

import ChatIcon from '@mui/icons-material/Chat';
import FaceIcon from '@mui/icons-material/Face';

import './BottomBar.css';

// const useStyles = makeStyles(theme => ({
//   appBar: {
//     bottom: 0,
//     top: 'auto',
//   },
//   inputContainer: {
//     backgroundColor: fade(theme.palette.common.white, 0.15),
//     '&:hover': {
//       backgroundColor: fade(theme.palette.common.white, 0.25),
//     },
//     borderRadius: theme.shape.borderRadius,
//     marginLeft: theme.spacing(1),
//     position: 'relative',
//     width: '100%',
//   },
//   icon: {
//     width: theme.spacing(7),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   inputRoot: {
//     color: 'inherit',
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 7),
//     width: '100%',
//   },
// }));

// const useStyles = createTheme({
//     appBar: {
//         bottom: 0,
//         top: 'auto'
//     }
// });

export default function BottomBar(props) {
//   const classes = useStyles();
  const classes = {};

  return (
    <AppBar position="fixed" className={classes.appBar} id="appBar">
      <Toolbar>
        <div className={classes.inputContainer} style={{maxWidth: '200px'}}
          id="inputContainer">
          <div className={classes.icon}>
            <FaceIcon />
          </div>
          <InputBase
            onChange={props.handleName}
            value={props.name}
            placeholder="Name"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'name' }}
          />
        </div>
        <div className={classes.inputContainer}>
          <form onSubmit={props.handleSubmit}>
            <div className={classes.icon}>
              <ChatIcon />
            </div>
            <InputBase
              onChange={props.handleContent}
              value={props.content}
              placeholder="Type your message..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'content' }}
            />
          </form>
        </div>
      </Toolbar>
    </AppBar>
  );
}