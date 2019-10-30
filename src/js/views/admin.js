import React from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import Tabla from "../component/tabla";
import UpdateModal from "../component/updateModal";
import { Redirect } from "react-router-dom";

class Admin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			token: null,
			showModal: false,
			updateId: null
		};
	}

	componentDidMount() {
		const token = localStorage.token;
		if (token) {
			return fetch("https://printerdirect.herokuapp.com/verify/token", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${token}`
				}
			}).then(resp => {
				if (!resp.ok) {
					localStorage.removeItem("token");
					this.setState({ token: "granted" });
				}
			});
		}
		this.setState({ token: "granted" });
	}

	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					return (
						<div>
							{!localStorage.token && store.token === null ? (
								/*<Redirect to="/carrousel" />*/
								<div className="container">
									<h1>NOT FOUND</h1>
								</div>
							) : (
								<div className="container">
									<label htmlFor="item">Item:</label>
									<input
										type="text"
										className="form-control"
										name="item"
										onChange={e => actions.handleChangeforOrderUpload(e)}
									/>
									<label htmlFor="url">Link:</label>
									<input
										type="text"
										className="form-control"
										name="url"
										onChange={e => actions.handleChangeforOrderUpload(e)}
									/>
									<label htmlFor="weight">Peso:</label>
									<input
										type="text"
										className="form-control"
										name="weight"
										onChange={e => actions.handleChangeforOrderUpload(e)}
									/>
									<label htmlFor="quantity">Cantidad:</label>
									<input
										type="text"
										className="form-control"
										name="quantity"
										onChange={e => actions.handleChangeforOrderUpload(e)}
									/>
									<label htmlFor="price">Precio:</label>
									<input
										type="text"
										className="form-control"
										name="price"
										onChange={e => actions.handleChangeforOrderUpload(e)}
									/>
									<button
													onClick={() => {
														actions.uploadOrder(
															store.orderToUpload,
															this.props
														);
													}}
													className="btn btn-success m-1 btn-block">
													Subir Orden
									</button>
									<Tabla />
								</div>
							)}
						</div>
					);
				}}
			</Context.Consumer>
		);
	}
}

export default Admin;
