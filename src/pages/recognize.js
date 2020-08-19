import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from "react-router-dom"

class RecognizePage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      file: null,
      selectedFile: null,
      preview: "hidden",
      hide: "",
      data: "",
      recognized: ""
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

  setResponse = (res) => {
    const items = [];
    if (res.data['status'] === "SUCCESS") {
      const data = res.data['response'];
      console.log(res.data['status']);
      console.log(data);
      data.forEach((obj, id) => {
        console.log(obj['name']);
        items.push(<div key={id++}><b>Face {id} {'=>'} {obj['name'] != null ? obj['name'] : "Fake"}</b></div>);
      })
    }
    this.setState({
      data: items
    })
    console.log(res);
    console.log(res.data);
  }


  fileUploadHandler = () => {
    // HTTP request using axios
    const formData = new FormData();
    formData.append('image', this.state.selectedFile);
    console.log(this.state.selectedFile);
    axios.post('http://localhost:5000/identification', formData)
      .then(res => this.setResponse(res))
      .catch(err => alert("Server not available"))
  }

  render() {
    return (

      <div className="App">
        <h2 className="title">Face Recognition</h2>
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
        </form>
        <div className="uploader">
          <div id="response" className={this.state.preview}>
            <div id="messages">{this.state.data}</div>
            <button className="btn btn-primary" onClick={this.fileUploadHandler}>Recognize</button>
          </div>
        </div>
        <div className="uploader">
          <div className="container">
            <Link to=""><div className="uploader"><button className="btn btn-primary">Home</button></div></Link>
            <Link to="upload"> <div className="uploader"><button className="btn btn-primary">Upload a Face</button></div></Link>
          </div>
        </div>
        <footer className="footer">
          By Davor Jordacevic ©
       </footer>
      </div>
    );
  }
}

export default RecognizePage;
