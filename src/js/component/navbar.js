import React from "react";
import { Link } from "react-router-dom";

export class Navbar extends React.Component {
	render() {
		return (
			<nav className="navbar navbar-dark bg-dark">
				<div className="row">
					<Link to="/">
						<span className="text-light ml-3">Inicio</span>
					</Link>
					<Link to="/admin">
						<span className="mx-5 text-light">Impresoras</span>
					</Link>
					<Link to="/login">
						<span className="mx-5 text-light">Impresoras</span>
					</Link>
					<Link to="/">
						<span className="text-light">Ofertas / Liquidacion</span>
					</Link>
				</div>
			</nav>
		);
	}
}
