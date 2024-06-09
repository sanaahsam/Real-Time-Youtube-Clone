<h1>Real-Time YouTube Clone App</h1>

Welcome to the YouTube Clone App, a real-time video sharing platform built with the MERN stack (MongoDB, Express, React, Node.js). This app mimics 
YouTube's core functionalities, allowing users to upload videos, like/dislike videos, comment, subscribe to channels, and much more. 

## Features

- **Authentication**: Users can log in using Google OAuth.
- **Channel Management**: Users can create their own channels to upload videos.
- **Video Interaction**: Users can like, dislike, and comment on videos.
- **Subscription**: Users can subscribe to other channels.
- **History & Liked Videos**: Liked videos are shown in a dedicated section, and watched videos appear in the history.
- **Search**: Users can search for specific videos using the search bar in the navbar.
- **Points System**: Users earn 5 points for each video they watch, which they can view in the "Your Channel" section.
- **Custom Video Player**:
  - Double-tap on the right side: Move playback 10 seconds forward.
  - Double-tap on the left side: Move playback 10 seconds backward.
  - Single-tap in the middle: Pause the playback.
  - Three-tap in the middle: Move to the next video.
  - Three-tap on the right side: Close the website.
  - Three-tap on the left side: Show the comment section.
  - Single-tap on the top right corner: Show current location and temperature as a popup notification.
  - Hold on the right side: Play video at 2X speed.
  - Hold on the left side: Play video at 2X slower speed.
- **Video Conferencing**: Users can create and join video rooms for real-time conferencing using ZegoCloud. Features include screen sharing and chat.
- **Recording**: Users can record their screens in the video room using `react-media-recorder`.

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Real-Time Communication**: Socket.io
- **Video Conferencing**: ZegoCloud
- **Screen Recording**: React Media Recorder

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- Node.js
- MongoDB
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sanaahsam/Youtube-Clone.git
   cd Youtube-Clone
   
2. Install backend dependencies:
    ```bash
   cd Server
   npm install


3. Install frontend dependencies:
    ```bash
    cd ../Client
    npm install


4. Set up environment variables:

    Create a .env file in the Server directory and add your MongoDB URI, Google OAuth credentials, and other necessary environment variables.
    Example .env file:

    

   MONGO_URI=your_mongodb_uri
   PORT = your_port
   ORIGIN=your_frontend_port

 <h1>Running the Application</h1>

7. Start the backend server:

     ```bash
     cd Server
     npm start

6. Start the frontend development server:
    ```bash
    cd ../Client
    npm start
