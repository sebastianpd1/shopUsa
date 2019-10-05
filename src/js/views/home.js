import React from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
//import stars from "../../img/5stars.png";
import { Printer } from "../component/printer";

export class Home extends React.Component {
	render() {
		const stars = require("../../img/" + "5stars" + ".png");
		return (
			<div className="container">
				<div className="row">
					<div className="col-8">lrem</div>
					<div className="col-4">
						<div className="row">
							<img className="img-fluid" src={stars} alt="" />
						</div>
						<div className="row">
							<h5>IMPRESORAS REMANUFACTURADAS PREMIUM</h5>
						</div>
						<div className="row">
							<marquee behavior="" direction="">
								<ul className="marquee">
									<li>RODILLO DE PRESION</li>
									<li>FUSER FILM</li>
									<li>ALIMENTADORES DE PAPEL</li>
									<li>SEPARADOR DE HOJA</li>
									<li>FUSOR</li>
									<li>ENGRANAJES</li>
									<li>RODILLOS DE TRANSFERENCIA</li>
									<li>UNIDAD DE IMAGEN</li>
									<li>CARTUCHO DE TONER</li>
								</ul>
							</marquee>
						</div>
						<div className="row">
							<h1>THE BRANDS HERE</h1>
						</div>
					</div>
				</div>
				<div className="row arrow bounce justify-content-center">
					<a
						className="fa fa-arrow-down fa-3x "
						href="#"
						onClick={() =>
							window.scrollTo({
								top: 780,
								behavior: "smooth"
							})
						}
					/>
				</div>

				<div className="row">
					<Printer />
					<Printer />
					<Printer />
					<Printer />
					<Printer />
				</div>
			</div>
		);
	}
}
