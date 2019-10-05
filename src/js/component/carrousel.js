import React from "react";
import ReactDOM from "react-dom";
import { Gallery, GalleryImage } from "react-gesture-gallery";
const images = [
	"https://images.unsplash.com/photo-1559666126-84f389727b9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1356&q=80",
	"https://images.unsplash.com/photo-1557389352-e721da78ad9f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
	"https://images.unsplash.com/photo-1553969420-fb915228af51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80",
	"https://images.unsplash.com/photo-1550596334-7bb40a71b6bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
	"https://images.unsplash.com/photo-1550640964-4775934de4af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
];
class Carrousel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0
		};
	}
	componentDidMount() {
		setInterval(() => {
			if (this.state.index === images.length - 1) {
				this.setState({ index: 0 });
			} else {
				this.setState({ index: this.state.index + 1 });
			}
		}, 2500);
	}
	render() {
		return (
			<Gallery
				style={{ height: "100vh", with: "100vh", background: "black" }}
				index={this.state.index}
				onRequestChange={i => {
					this.setState({
						index: i
					});
				}}>
				{images.map((image, i) => (
					<GalleryImage key={i} objectFit="contain" src={image} />
				))}
			</Gallery>
		);
	}
}

export default Carrousel;
