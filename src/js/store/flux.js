import PropTypes from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			images: [
				"https://images.unsplash.com/photo-1559666126-84f389727b9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1356&q=80",
				"https://images.unsplash.com/photo-1557389352-e721da78ad9f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
				"https://images.unsplash.com/photo-1553969420-fb915228af51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80",
				"https://images.unsplash.com/photo-1550596334-7bb40a71b6bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
				"https://images.unsplash.com/photo-1550640964-4775934de4af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
			],
			token: null
		},
		actions: {
			logout: () => {
				const store = getStore();
				localStorage.removeItem("token");
				setStore({ token: "medesloguee" });
				//() => props.history.push("/admin");
			},
			// OJO UN A VEZ QUE HAGA LOGIN DEBO PONER TAMBIEN EL SET TIME OUT AQUI .....
			login: (usernameParameter, passwordParameter, props) => {
				fetch("https://printerdirect.herokuapp.com/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},

					body: JSON.stringify({
						username: usernameParameter,
						password: passwordParameter
					})
				})
					.then(resp => {
						if (!resp.ok) {
							alert("INVALID USERNAME OR PASSWORD");
							() => props.history.push("/admin");
							throw Error();
						}
						return resp.json();
					})
					.then(tokenRecieved => {
						setStore({ token: tokenRecieved.jwt });
						localStorage.setItem("token", tokenRecieved.jwt);
						() => props.history.push("/admin"); // can also create another then with the history
					})
					.catch(err => console.error(err));
			}
		}
	};
};

export default getState;

getState.propTypes = {
	history: PropTypes.object
};
