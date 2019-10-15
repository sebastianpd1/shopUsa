import React, { useState } from "react";
import "../../styles/home.scss";
import PropTypes from "prop-types";

export default function PrinterUpload(props) {
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
			<div className="row">
				<div className="col">
					<input
						type="text"
						name="url"
						className="form-control"
						placeholder="Item:"
						onChange={e => setUrl(e.target.value)}
					/>
					<input
						type="text"
						name="url"
						className="form-control my-3"
						placeholder="Marca:"
						onChange={e => setUrl(e.target.value)}
					/>
					<input
						type="text"
						name="url"
						className="form-control"
						placeholder="Categoria:"
						onChange={e => setUrl(e.target.value)}
					/>
					<input
						type="text"
						name="url"
						className="form-control my-3"
						placeholder="Condicion:"
						onChange={e => setUrl(e.target.value)}
					/>
					<input
						type="text"
						name="url"
						className="form-control"
						placeholder="Cantidad:"
						onChange={e => setUrl(e.target.value)}
					/>
					<input
						type="text"
						name="url"
						className="form-control my-3"
						placeholder="Precio:"
						onChange={e => setUrl(e.target.value)}
					/>
				</div>
				<div className="col">
					<input type="file" name="file" placeholder="Subir una imagen" onChange={uploadImage} />
					{loading ? <h3>Cargando la imagen...</h3> : <img src={image} style={{ width: "300px" }} />}
					<textarea
						type="text"
						name="url"
						className="my-4"
						placeholder="Insertar link de redireccion:"
						rows="10"
						cols="50"
						onChange={e => setUrl(e.target.value)}
					/>
				</div>
			</div>
			<div className="row my-3">
				<div className="col">
					<input
						type="button"
						className="btn btn-primary btn-block mb-2"
						value="Cargar"
						onClick={toBackend}
					/>
				</div>
			</div>
		</div>
	);
}

PrinterUpload.propTypes = {
	fetchNewImages: PropTypes.func
};
