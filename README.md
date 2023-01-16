# enigmachat.io

Welcome to engimachat.io! This full stack application is my take on a traditional chat app. There's one chat room for all users and any messages sent to the chat are visible to everyone, but each user is presented with three rotors and each message can only be deciphered when the reader has matched their rotor settings to those used by the author.

<img src="./client/src/static/enigmachat.png" alt="enigmachat.io screenshot">

## Concept
I learned C++ in my Data Structures & Algorithms course and for extra practice I decided to write a program that would emulate the Engima machine. All of my prior experience had been in school, so this was my first attempt at programming something without any guidance or structure from anyone else. I ended up with a final product that allowed me to put text into one file, run a program from the command line, and see that text either encrypted or decrypted in another file. At the time I was satisfied with my result, as it was exactly what I had pictured in my mind. Years later I revisited this project, this time equipped with some web development skills, to build something that everyone can use.

## Data Flow
Each time a user opens the site they are assigned a number that will act as their username for the duration of their time on the site. Upon loading in, each user is presented with messages that have previously been sent to the chat. Since messages are stored as ciphertext in the database, they appear as ciphertext when presented on load in (except when a message's encryption key is AAA). Each time the user changes their rotor settings, these preexisting messages get encrypted on the client side. After a user chooses their preferred offsets, types out a message, and hits enter, their message will be encrypted, again on the client side, and sent to the database along with the user's username/number. 

## Tech Stack
This app was built using the MERN stack and it is hosted on Heroku.
