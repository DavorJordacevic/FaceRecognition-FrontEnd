import React from "react";
import '../App.css';
import { Link } from "react-router-dom"

const MainPage = () => {
  return (
    <div className="App">
      <img src="FaceRecognition.png" alt="Face Recgnition" />
      <div className="container">
        <Link to="recognize"><div class="uploader"><button className="btn btn-primary" >Recognize a Face</button></div></Link>
        <Link to="upload"> <div class="uploader"><button className="btn btn-primary" >Upload a Face</button></div></Link>
      </div>
      <footer className="footer">
        By Davor Jordacevic ©
       </footer>
    </div>
  );
};

export default MainPage;