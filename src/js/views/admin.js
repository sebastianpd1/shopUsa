import React, { useState } from "react";
import "../../styles/home.scss";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { Login } from "../component/login";
import Upload from "../component/upload";

class Admin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					return (
						<div>
							{store.token === null ? (
								<div className="container">
									<Login />
								</div>
							) : (
								<div className="container">
									<Upload />
									<div className="card-group">
										<Context.Consumer>
											{({ store, actions }) => {
												return store.images.map((item, index) => {
													return (
														<div key={index} className="card">
															<img src={item} alt="" style={{ height: "200px" }} />
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
