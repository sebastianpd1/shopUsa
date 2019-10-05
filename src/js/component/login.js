import React from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/login.scss";
import printerDirectLogo from "../../img/printerdirect.png";

export class Login extends React.Component {
	render() {
		return (
			<div id="login">
				<Context.Consumer>
					{({ actions }) => {
						return (
							<div className="container">
								<div className="card card-login mx-auto text-center bg-dark">
									<div className="card-header mx-auto bg-dark">
										<span>
											<img src={printerDirectLogo} className="w-75 mb-3" alt="Logo" />{" "}
										</span>
										<br />
										<span className="logo_title mt-5"> Login Dashboard </span>
									</div>
									<div className="card-body">
										<div className="input-group form-group">
											<div className="input-group-prepend">
												<span className="input-group-text">
													<i className="fas fa-user" />
												</span>
											</div>
											<input
												onChange={e => this.setState({ username: e.target.value })}
												type="text"
												className="form-control"
												placeholder="Username"
											/>
										</div>

										<div className="input-group form-group">
											<div className="input-group-prepend">
												<span className="input-group-text">
													<i className="fas fa-key" />
												</span>
											</div>
											<input
												onChange={e => this.setState({ password: e.target.value })}
												type="password"
												placeholder="Password"
												className="form-control"
											/>
										</div>

										<div className="form-group">
											<button
												className="btn btn-outline-danger float-right login_btn"
												onClick={() => {
													actions.login(this.state.username, this.state.password, this.props);
												}}>
												<h5 className="pt-2">Login</h5>
											</button>
										</div>
									</div>
								</div>
							</div>
						);
					}}
				</Context.Consumer>
			</div>
		);
	}
}
Login.propTypes = {
	history: PropTypes.object
};
