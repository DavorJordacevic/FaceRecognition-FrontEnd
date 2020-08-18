import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

import { Link } from "react-router-dom"

class UploadPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      file: null,
      selectedFile: null,
      preview: "hidden",
      hide: "",
      data: ""
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      selectedFile: event.target.files[0],
      preview: "",
      hide: "hidden",
      data: ""
    })
    console.log(event.target.files[0].name);
  }

  fileUploadHandler = () => {
    // HTTP request using axios
    const formData = new FormData();
    formData.append('image', this.state.selectedFile, this.state.selectedFile.name);
    console.log(formData);
    axios.post('http://localhost:5000/upload', formData)
      .then(res => alert("Server not available"))
      .catch(err => alert("Server not available"))
  }
  render() {
    return (

      <div className="App">
        <h2 className="title">Face Upload</h2>
        <form id="file-upload-form" className="uploader" >
          <input id="file-upload" type="file" name="fileUpload" onChange={this.handleChange} accept="image/*" />
          <label htmlFor="file-upload" id="file-drag">
            <img id="file-image" src={this.state.file} alt="Preview" className={this.state.preview} />
            <div id="start" className={this.state.hide}>
              <i className="fa fa-download" aria-hidden="true"></i>
              <div>Select an image</div>
              <div id="notimage" className="hidden">Please select an image</div>
              <span id="file-upload-btn" className="btn btn-primary">Select an image</span>
            </div>
          </label>
          <input id="faceName" type="text" placeholder="Add person's name" />
        </form>
        <div className="uploader">
          <div id="response" className={this.state.preview}>
            <div id="messages">{this.state.data}</div>
            <button className="btn btn-primary" onClick={this.fileUploadHandler}>Send</button>
          </div>
        </div>
        <div className="uploader">
          <div className="container">
            <Link to=""><div class="uploader"><button className="btn btn-primary">Home</button></div></Link>
            <Link to="recognize"> <div class="uploader"><button className="btn btn-primary">Recognize a Face</button></div></Link>
          </div>
        </div>
        <footer className="footer">
          By Davor Jordacevic ©
       </footer>
      </div>
    );
  }
}

export default UploadPage;