import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

class UpdateModal extends React.Component {
	constructor() {
		super();
		this.state = {
			updateObj: {}
		};
	}

	render() {
		return (
			<div
				className="modal bg-dark"
				tabIndex="-1"
				role="dialog"
				style={{ display: this.props.show ? "inline-block" : "none" }}>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Editar informacion:</h5>
							{this.props.onClose ? (
								<button
									onClick={() => {
										this.props.onClose();
									}}
									type="button"
									className="close"
									data-dismiss="modal"
									aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							) : (
								""
							)}
						</div>
						{this.props.updateId !== null ? (
							<Context.Consumer>
								{({ store, actions }) => {
									return (
										<div className="modal-body">
											{/* ACA VA EL CONTENIDO DE LA MODAL */}
											<input
												type="text"
												className="form-control"
												name="item"
												value={store.printersFoundUpdate.item}
												onChange={e => actions.handleChangeforUpdatePrinterInput(e)}
											/>
											<input
												type="text"
												defaultValue="{printer.brand}"
												className="form-control my-3"
												placeholder="Marca:"
												onChange={e =>
													this.setState({
														updateObj: { ...this.state.updateObj, brand: e.target.value }
													})
												}
											/>
											<input
												type="text"
												defaultValue="{printer.category}"
												className="form-control"
												placeholder="Categoria:"
												onChange={e =>
													this.setState({
														updateObj: { ...this.state.updateObj, category: e.target.value }
													})
												}
											/>
											<input
												type="text"
												defaultValue="{printer.condition}"
												className="form-control my-3"
												placeholder="Condicion:"
												onChange={e =>
													this.setState({
														updateObj: {
															...this.state.updateObj,
															condition: e.target.value
														}
													})
												}
											/>
											<input
												type="text"
												defaultValue="{printer.quantity}"
												className="form-control"
												placeholder="Cantidad:"
												onChange={e =>
													this.setState({
														updateObj: { ...this.state.updateObj, quantity: e.target.value }
													})
												}
											/>
											<input
												type="text"
												defaultValue="{printer.price}"
												className="form-control my-3"
												placeholder="Precio:"
												onChange={e =>
													this.setState({
														updateObj: { ...this.state.updateObj, price: e.target.value }
													})
												}
											/>
											<div className="modal-footer">
												<button
													onClick={() => {
														actions.updatePrinter(
															this.state.updateObj,
															printer.id,
															this.props
														);
														this.forceUpdate();
													}}
													className="btn btn-success m-1 btn-block">
													Actualizar
												</button>
											</div>
										</div>
									);
								}}
							</Context.Consumer>
						) : (
							<div className="container">
								<h1>NOT FOUND</h1>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}
/**
 * Define the data-types for
 * your component's properties
 **/
UpdateModal.propTypes = {
	history: PropTypes.object,
	onClose: PropTypes.func,
	show: PropTypes.bool,
	updateId: PropTypes.number
};

/**
 * Define the default values for
 * your component's properties
 **/
UpdateModal.defaultProps = {
	show: false,
	onClose: null,
	updateId: null
};
export default withRouter(UpdateModal);
