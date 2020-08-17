import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      file: null,
      selectedFile: null,
      preview: "hidden",
      hide: ""
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      selectedFile: event.target.files[0],
      preview: "",
      hide: "hidden"
    })
    console.log(event.target.files[0].name);
  }

  fileUploadHandler = () => {
    // HTTP request using axios
    const formData = new FormData();
    formData.append('image', this.state.selectedFile, this.state.selectedFile.name);
    console.log(formData);
    axios.post('localhost:5000/identification', formData)
      .then(res => {
        console.log(res);
      })
  }
  render() {
    return (

      <div className="App">
        <h2>Face Recognition</h2>
        <p className="lead">No Plugins <b>Just AI</b></p>
        <form id="file-upload-form" className="uploader" onSubmit={this.fileUploadHandler}>
          <input id="file-upload" type="file" name="fileUpload" onChange={this.handleChange} accept="image/*" />
          <label htmlFor="file-upload" id="file-drag">
            <img id="file-image" src={this.state.file} alt="Preview" className={this.state.preview} />
            <div id="start" className={this.state.hide}>
              <i className="fa fa-download" aria-hidden="true"></i>
              <div>Select a file or drag here</div>
              <div id="notimage" className="hidden">Please select an image</div>
              <span id="file-upload-btn" className="btn btn-primary">Select a file</span>
            </div>
          </label>  
          <div id="response"className={this.state.preview}>
              <div id="messages">Treba izvuci tekst nekako</div>
           </div>
        </form>
        <div className="footer">
          <p>By Davor Jordacevic  ©</p>
        </div>
      </div>
    );
  }
}

export default App;
