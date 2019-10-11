import React, { useState } from "react";
import "../../styles/home.scss";
import PropTypes from "prop-types";

class Upload extends React.Component {

    constructor(props) {
		super(props);
		this.state = { 
            image : "",
            loading : false,
            url : ""
         }
	}
    
    uploadImage = e => {
		const files = e.target.files;
		const data = new FormData();
		data.append("file", files[0]);
		data.append("upload_preset", process.env.PRESET);
		this.setState = ({loading : true})
		fetch(process.env.UPLOADIMAGE, {
			method: "POST",
			body: data
        }).then(file => file.json()
        ).then(file => {
            this.setState = ({image : file.secure_url});
            this.setState = ({loading : false})
        });
	};

	toBackend = () => {
		const token = localStorage.token;
		fetch("https://printerdirect.herokuapp.com/sliders/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`
			},

			body: JSON.stringify({
				image: image,
				url: url
			})
		}).then(props.fetchNewImages());
	};
    render() { 
        return ( 
        
        <div className="App">
        <h1>Upload Image</h1>
        <input type="file" name="file" placeholder="Subir una imagen" onChange={this.uploadImage()} />
        <input
            type="text"
            name="url"
            placeholder="Insertar link de redireccion:"
            onChange={e => this.setState = ({url: e.target.value})}
        />
        <input type="button" className="btn btn-primary" value="Cargar" onClick={this.toBackend()} />
        {loading ? <h3>Loading...</h3> : <img src={this.state.image} style={{ width: "300px" }} />}
    </div> 
    
    );
    }
}

Upload.propTypes = {
	fetchNewImages: PropTypes.func
};

export default Upload;
