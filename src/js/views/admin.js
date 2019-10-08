import React, { useState } from "react";
import "../../styles/home.scss";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { Login } from "../component/login";
import Upload from "../component/upload";
import { Redirect } from "react-router-dom";
import { Router, browserHistory } from "react-router";

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
									<Upload />
									<div className="card-group">
										<Context.Consumer>
											{({ store, actions }) => {
												return store.sliders.map((item, index) => {
													return (
														<div key={index} className="card">
															<img src={item.url} alt="" style={{ height: "200px" }} />
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
