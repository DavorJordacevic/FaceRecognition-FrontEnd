import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from "react-router-dom"

class UploadPage extends Component {
    fileObj = [];
    fileArray = [];
    selectedFileArray = [];
    index = 0;

    constructor(props) {
        super(props)
        this.state = {
            files: [null],
            selectedFiles: [null],
            preview: "hidden",
            hide: "",
            nameFace: ""
        }
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)
        this.updateName = this.updateName.bind(this)
    }

    uploadMultipleFiles(e) {
        this.fileObj.push(e.target.files)
        console.log(e.target.files)
        console.log(this.fileObj[this.index])
        console.log(this.fileObj[this.index].length)
        for (let i = 0; i < this.fileObj[this.index].length; i++) {
            this.fileArray.push(URL.createObjectURL(this.fileObj[this.index][i]))
            this.selectedFileArray.push(this.fileObj[this.index][i])
        }
        this.setState({
            files: [this.fileArray],
            selectedFiles: this.selectedFileArray,
            preview: "",
            hide: "hidden"
        })
        this.uploaded = true;
        this.index++;

    }

    updateName(e) {
        this.setState({
            nameFace: e.target.value
        })
    }

    setResponse = (res) => {
        const items = [];
        if (res.data['status'] === "SUCCESS") {
          const data = res.data['response'];
          console.log(res.data['status']);
          console.log(data);
             items.push(<div key={1}><b><h3>SUCCESS</h3></b></div>);
        }else{
          const data = res.data['response'];
          items.push(<div key={1}><b><h3>{data}</h3></b></div>);
        }
        this.setState({
          data: items
        })
        console.log(res);
        console.log(res.data);
      }

    uploadFiles() {
        // HTTP request using axios
        const formData = new FormData();
        this.state.selectedFiles.forEach((file) => formData.append('images', file));
        formData.append('name', this.state.nameFace);
        console.log(this.state.selectedFiles);
        axios.post('http://localhost:5000/encodeAndInsert', formData)
            .then(res => this.setResponse(res))
            .catch(err => alert("Server not available"))
    }

    render() {
        return (
            <div className="App">
                <h2 className="title">Face Upload</h2>
                <form id="file-upload-form" className="uploader">
                    <label htmlFor="file-upload" id="file-drag">
                        <div className="form-group multi-preview">
                            {(this.fileArray || []).map((url, id) => (
                                <img key={id} id="file-image" src={url} alt="Preview" className={this.state.preview} />
                            ))}
                        </div>
                        <input id="file-upload" type="file" name="fileUpload" className="form-control" onChange={this.uploadMultipleFiles} multiple accept="image/*" />
                        <div id="start" className={this.state.hide}>
                            <i className="fa fa-download" aria-hidden="true"></i>
                            <div>Select an image</div>
                            <div id="notimage" className="hidden">Please select an image or images</div>
                            <span id="file-upload-btn" className="btn btn-primary">Select an image</span>
                        </div>
                    </label>
                    <input id="faceName" type="text" placeholder="Add person's name" onChange={this.updateName} />
                </form >
                <div className="uploader">
                    <div id="response" className={this.state.preview}>
                        <div id="messages">{this.state.data}</div>
                        <button className="btn btn-primary" onClick={this.uploadFiles}>Send</button>
                    </div>
                </div>
                <div className="uploader">
                    <div className="container">
                        <Link to=""><div className="uploader"><button className="btn btn-primary">Home</button></div></Link>
                        <Link to="recognize"> <div className="uploader"><button className="btn btn-primary">Recognize a Face</button></div></Link>
                    </div>
                </div>
                <footer className="footer">
                    By Davor Jordacevic ©
                </footer>
            </div>
        )
    }
}

export default UploadPage;
