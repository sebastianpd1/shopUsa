import React, { useState } from "react";
import "../../styles/home.scss";

function Upload() {
	const [image, setImage] = useState(""); // image es la variable que va en el state, y set image es para setear el state, en esta
	// primera linea el valor de image sera ''
	const [loading, setLoading] = useState(false); //  valor inicial de loading sera false
	const uploadImage = async e => {
		const files = e.target.files;
		const data = new FormData();
		const token = localStorage.token;
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

		const toBackend = await fetch("https://printerdirect.herokuapp.com/sliders/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`
			},

			body: JSON.stringify({
				image: file.secure_url,
				url: null
			})
		});
	};
	return (
		<div className="App">
			<h1>Upload Image</h1>
			<input type="file" name="file" placeholder="Upload an image" onChange={uploadImage} />
			{loading ? <h3>Loading...</h3> : <img src={image} style={{ width: "300px" }} />}
		</div>
	);
}

export default Upload;
