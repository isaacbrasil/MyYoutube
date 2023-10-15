import React, { useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  const videoInputRef = useRef(null);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const arrayBuffer = reader.result;
        socket.emit("send-video", arrayBuffer);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        onChange={handleVideoUpload}
      />
    </div>
  );
}

export default App;
