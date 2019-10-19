import React from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import PrinterUpload from "../component/printerUpload";
import SliderUpload from "../component/sliderUpload";
import VipUpload from "../component/vipUpload";
import UpdateModal from "../component/updateModal";
import { Redirect } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

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
									<Tabs defaultActiveKey="Sliders" id="uncontrolled-tab-example">
										<Tab eventKey="Sliders" title="Sliders">
											<div className="col">
												<div className="row my-3">
													<h1>SLIDER</h1>
												</div>
												<div className="row">
													<SliderUpload fetchNewImages={() => actions.getSliders()} />
												</div>
											</div>
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
																				onClick={() =>
																					actions.deleteSlider(item.id)
																				}
																			/>
																		</div>
																	</div>
																	<img
																		src={item.image}
																		alt=""
																		style={{ height: "200px" }}
																	/>
																</div>
															);
														});
													}}
												</Context.Consumer>
											</div>
										</Tab>
										<Tab eventKey="Impresoras" title="Impresoras">
											<div className="col">
												<div className="row my-3">
													<h1>IMPRESORAS</h1>
												</div>
												<div className="row">
													<PrinterUpload fetchNewImages={() => actions.getSliders()} />
												</div>
											</div>
											<div className="card-group">
												<Context.Consumer>
													{({ store, actions }) => {
														return store.printers.map((item, index) => {
															return (
																<div key={index} className="card">
																	<div className="card-header">
																		<div className="text-dark">
																			<i
																				className="fas fa-pen-square text-danger"
																				onClick={() => {
																					this.setState({
																						showModal: true,
																						updateId: item.id
																					});
																					actions.saveFoundToUpdateToTheStore(
																						item.id
																					);
																				}}
																			/>
																		</div>
																		<div className="offset-11 text-dark">
																			<i
																				className="fas fa-times-circle fa-1x text-danger"
																				onClick={() =>
																					actions.deleteSlider(item.id)
																				}
																			/>
																		</div>
																	</div>
																	<h1>{item.item}</h1>
																	<img
																		src={item.image}
																		alt=""
																		style={{ height: "200px" }}
																	/>
																</div>
															);
														});
													}}
												</Context.Consumer>
											</div>

											<UpdateModal
												show={this.state.showModal}
												updateId={this.state.updateId}
												onClose={() => this.setState({ showModal: false })}
											/>
										</Tab>
										<Tab eventKey="Destacados" title="Destacados">
											<div className="col">
												<div className="row my-3">
													<h1>PRODUCTOS DESTACADOS</h1>
												</div>
												<div className="row">
													<VipUpload fetchNewImages={() => actions.getSliders()} />
												</div>
											</div>
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
																				onClick={() =>
																					actions.deleteSlider(item.id)
																				}
																			/>
																		</div>
																	</div>
																	<img
																		src={item.image}
																		alt=""
																		style={{ height: "200px" }}
																	/>
																</div>
															);
														});
													}}
												</Context.Consumer>
											</div>
										</Tab>
									</Tabs>
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
