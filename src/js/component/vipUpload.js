import React, { useState } from "react";
import "../../styles/home.scss";
import PropTypes from "prop-types";

export default function VipUpload(props) {
	const [image, setImage] = useState(""); // image es la variable que va en el state, y set image es para setear el state, en esta
	// primera linea el valor de image sera ''
	const [loading, setLoading] = useState(false); //  valor inicial de loading sera false
	const [item, setItem] = useState("");
	const [category, setCategory] = useState("");
	const [brand, setBrand] = useState("");
	const [condition, setCondition] = useState("");
	const [price, setPrice] = useState("");
	const [quantity, setQuantity] = useState("");
	const [description, setDescription] = useState("");

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
		fetch("https://printerdirect.herokuapp.com/vips/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`
			},

			body: JSON.stringify({
				image: image,
				item: item,
				brand: brand,
				category: category,
				quantity: quantity,
				price: price,
				description: description,
				condition: condition
			})
		}).then(props.fetchNewVips);
	};

	return (
		<div className="App">
			<div className="row">
				<div className="col">
					<input
						type="text"
						name="item"
						className="form-control"
						placeholder="Item:"
						onChange={e => setItem(e.target.value)}
					/>
					<input
						type="text"
						name="brand"
						className="form-control my-3"
						placeholder="Marca:"
						onChange={e => setBrand(e.target.value)}
					/>
					<input
						type="text"
						name="category"
						className="form-control"
						placeholder="Categoria:"
						onChange={e => setCategory(e.target.value)}
					/>
					<input
						type="text"
						name="condition"
						className="form-control my-3"
						placeholder="Condicion:"
						onChange={e => setCondition(e.target.value)}
					/>
					<input
						type="text"
						name="quantity"
						className="form-control"
						placeholder="Cantidad:"
						onChange={e => setQuantity(e.target.value)}
					/>
					<input
						type="text"
						name="url"
						className="form-control my-3"
						placeholder="Precio:"
						onChange={e => setPrice(e.target.value)}
					/>
				</div>
				<div className="col">
					<input type="file" name="file" placeholder="Subir una imagen" onChange={uploadImage} />
					{loading ? <h3>Cargando la imagen...</h3> : <img src={image} style={{ width: "300px" }} />}
					<textarea
						type="text"
						name="description"
						className="my-4"
						placeholder="Descripcion / Caracteristicas:"
						rows="10"
						cols="50"
						onChange={e => setDescription(e.target.value)}
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

VipUpload.propTypes = {
	fetchNewVips: PropTypes.func
};
