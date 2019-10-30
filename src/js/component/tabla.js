import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

class UpdateModal extends React.Component {
	constructor() {
		super();
		this.state = {
			updated: false
		};
	}

	render() {
		return (
			<table className="table">
				<thead className="thead-dark">
					<tr>
						<th scope="col">item</th>
						<th scope="col">url</th>
						<th scope="col">weight</th>
						<th scope="col">quantity</th>
						<th scope="col">price</th>
						<th scope="col">total</th>
					</tr>
				</thead>
				<tbody>
					<Context.Consumer>
						{({ store, actions }) => {
							return store.orders.map((item, index) => {
								return (
									<tr key={index}>
										<th scope="row">{item.id}</th>
										<td>{item.item}</td>
										<td>{item.url}</td>
										<td>{item.weight}</td>
										<td>{item.quantity}</td>
										<td>{item.price}</td>
										<td>{item.price * item.quantity}</td>
									</tr>
								);
							});
						}}
					</Context.Consumer>
				</tbody>
			</table>
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
