import React from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
//import stars from "../../img/5stars.png";

export class Home extends React.Component {
	render() {
		const stars = require("../../img/" + "5stars" + ".png");
		return <div className="home" />;
	}
}
