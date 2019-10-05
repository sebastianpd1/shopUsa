import React from "react";
import { Link } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

export class Printer extends React.Component {
	render() {
		return (
			<div className="card box" style={{ width: "19rem" }}>
				<img
					className="card-img-top"
					src="https://images.costco-static.com/ImageDelivery/imageService?profileId=12026540&imageId=1293489-847__1&recipeName=350"
					alt="Card image cap"
				/>
				<div className="card-body">
					<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
						<Tab eventKey="home" title="Home">
							<h1>hello</h1>
						</Tab>
						<Tab eventKey="profile" title="Profile">
							<h1>hi</h1>
						</Tab>
						<Tab eventKey="contact" title="Contact" disabled>
							<h1>hola</h1>
						</Tab>
					</Tabs>
				</div>
			</div>
		);
	}
}
