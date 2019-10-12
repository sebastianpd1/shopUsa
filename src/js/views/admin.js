import React, { useState } from "react";
import "../../styles/home.scss";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { Login } from "../component/login";
import Upload from "../component/upload";
import { Redirect } from "react-router-dom";
class Admin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			token: null
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
									<Upload fetchNewImages={() => actions.getSliders()} />
									<div className="card-group">
										<Context.Consumer>
											{({ store, actions }) => {
												return store.sliders.map((item, index) => {
													return (
														<div key={index} className="card">
															<div className="card-header">
																<div className="offset-11 text-dark">
																	<i
																		className="fas fa-times-circle fa-1x text-danger"
																		onClick={() => actions.deleteSlider(item.id)}
																	/>
																</div>
															</div>
															<img src={item.image} alt="" style={{ height: "200px" }} />
														</div>
													);
												});
											}}
										</Context.Consumer>
									</div>
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
