import React from "react";
import { Link } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import PropTypes from "prop-types";

export class Printer extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="card box" style={{ width: "19rem" }}>
				<img
					className="card-img-top"
					src="https://images.costco-static.com/ImageDelivery/imageService?profileId=12026540&imageId=1293489-847__1&recipeName=350"
					alt="Card image cap"
				/>
				<div className="card-body">
					<Tabs defaultActiveKey="item" id="uncontrolled-tab-example">
						<Tab eventKey="item" title={this.props.info.item}>
							<ul className="mt-2">
								<li>Marca: {this.props.info.brand}</li>
								<li>Tipo: {this.props.info.category}</li>
								<li>Condicion: {this.props.info.condition}</li>
								<li>Precio: {this.props.info.price}</li>
								<li>Cantidad Disponible: {this.props.info.quantity}</li>
							</ul>
						</Tab>
						<Tab eventKey="description" title="Caracteristicas">
							<p className="mt-2 px-1">{this.props.info.description}</p>
						</Tab>
					</Tabs>
				</div>
			</div>
		);
	}
}

Printer.propTypes = {
	info: PropTypes.object
};
