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
    //this.fileUploadHandler();
  }

  fileUploadHandler = () => {
    // HTTP request using axios
    const formData = new FormData();
    formData.append('image', this.state.selectedFile, this.state.selectedFile.name);
    console.log(formData);
    axios.post('http://localhost:5000/identification', formData)
      .then(res => {
        const items = [];
        Object.keys(res.data).forEach(attribute => {
          console.log(res.data[attribute]);
          items.push(<div key={attribute}>{attribute} => {res.data[attribute]}</div>);
        });
        this.setState({
          data: items
        })
        console.log(res);
        console.log(res.data);
      })
  }
  render() {
    return (

      <div className="App">
        <h2>Face Recognition</h2>
        <p className="lead">No Plugins <b>Just AI</b></p>
        <form id="file-upload-form" className="uploader" >
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
        </form>
        <div className="uploader">
          <div id="response" className={this.state.preview}>
            <div id="messages">{this.state.data}</div>
            <button className="btn btn-primary" onClick={this.fileUploadHandler}>Check</button>
          </div>
        </div>
        <div className="footer">
          <p>By Davor Jordacevic ©</p>
        </div>
      </div>
    );
  }
}

export default App;
