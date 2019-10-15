import React, { useState } from "react";
import "../../styles/home.scss";
import PropTypes from "prop-types";

export default function SliderUpload(props) {
	const [image, setImage] = useState(""); // image es la variable que va en el state, y set image es para setear el state, en esta
	// primera linea el valor de image sera ''
	const [loading, setLoading] = useState(false); //  valor inicial de loading sera false
	const [url, setUrl] = useState("");

	const uploadImage = async e => {
		const files = e.target.files;
		const data = new FormData();
		data.append("file", files[0]);
		data.append("upload_preset", process.env.PRESET);
		setLoading(true);
		const res = await fetch(process.env.UPLOADIMAGE, {
			method: "POST",
			body: data
		});
		const file = await res.json();
		setImage(file.secure_url);
		setLoading(false);
	};

	const toBackend = () => {
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
		}).then(props.fetchNewImages);
	};

	return (
		<div className="App">
			<input type="file" name="file" placeholder="Subir una imagen" onChange={uploadImage} />
			<input
				type="text"
				className="form-control my-3"
				name="url"
				placeholder="Insertar link:"
				onChange={e => setUrl(e.target.value)}
			/>
			<input type="button" className="btn btn-primary mb-2 btn-block" value="Cargar" onClick={toBackend} />
			{loading ? <h3>Loading...</h3> : <img src={image} className="my-3" style={{ width: "300px" }} />}
		</div>
	);
}

SliderUpload.propTypes = {
	fetchNewImages: PropTypes.func
};
