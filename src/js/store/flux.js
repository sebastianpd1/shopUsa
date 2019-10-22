import PropTypes from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			sliders: [],
			images: [
				"https://images.unsplash.com/photo-1559666126-84f389727b9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1356&q=80",
				"https://images.unsplash.com/photo-1557389352-e721da78ad9f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
				"https://images.unsplash.com/photo-1553969420-fb915228af51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80",
				"https://images.unsplash.com/photo-1550596334-7bb40a71b6bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
				"https://images.unsplash.com/photo-1550640964-4775934de4af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
			],
			printers: [],
			vips: [],
			printersFoundUpdate: []
		},
		actions: {
			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			/////////////////////////////////////////////////////// LOGOUT //////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			logout: () => {
				const store = getStore();
				localStorage.removeItem("token");
				setStore({ token: null });
			},
			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			/////////////////////////////////////////////////////// LOGIN //////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			// OJO UN A VEZ QUE HAGA LOGIN DEBO PONER TAMBIEN EL SET TIME OUT AQUI .....
			login: (usernameParameter, passwordParameter, props) => {
				// const actions = getActions(); this is how you call actions to be used inside a flux function
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
							props.history.push("/login");
							throw Error();
						}
						return resp.json();
					})
					.then(tokenRecieved => {
						setStore({ token: tokenRecieved.jwt });
						localStorage.setItem("token", tokenRecieved.jwt);
					})
					// .then(actions.getSliders()) only if the user is logged in i would run this fx
					.catch(err => console.error(err));

				props.history.push("/admin");
			},
			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			/////////////////////////////////////////////////////// SLIDERS //////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			getSliders: () => {
				const token = localStorage.token;
				fetch("https://printerdirect.herokuapp.com/sliders/all", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						Authorization: `Bearer ${token}`
					}
				})
					.then(response => response.json())
					.then(data => {
						setStore({ sliders: data });
					});
			},

			deleteSlider: slider_id => {
				const token = localStorage.token;
				fetch("https://printerdirect.herokuapp.com/slider/" + slider_id, {
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
					.then(response => response.json())
					.then(data => {
						setStore({ sliders: data });
					});
			},

			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			/////////////////////////////////////////////////////// PRINTERS //////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			getPrinters: () => {
				const token = localStorage.token;
				fetch("https://printerdirect.herokuapp.com/printers/all", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						Authorization: `Bearer ${token}`
					}
				})
					.then(response => response.json())
					.then(data => {
						setStore({ printers: data });
					});
			},

			deletePrinter: printer_id => {
				const token = localStorage.token;
				fetch("https://printerdirect.herokuapp.com/printer/" + printer_id, {
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
					.then(response => response.json())
					.then(data => {
						setStore({ printers: data });
					});
			},

			savePrinterFoundToUpdateToTheStore: itemId => {
				const store = getStore();
				let printer = store.printers.find(e => e.id === itemId);
				setStore({ printersFoundUpdate: printer });
			},

			handleChangeforUpdatePrinterInput: e => {
				const store = getStore();
				const target = e.target;
				const value = target.value;
				const name = target.name;
				setStore({ printersFoundUpdate: { ...store.printersFoundUpdate, [name]: value } });
			},

			updatePrinter: (updateObj, id, props) => {
				const url = "https://printerdirect.herokuapp.com/printer/";
				const token = localStorage.token;

				fetch(url + id, {
					method: "PUT",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json"
					},
					body: JSON.stringify(updateObj)
				})
					.then(response => response.json())
					.then(data => {
						setStore({ printers: data });
					});
				props.history.push("/admin");
			},

			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			/////////////////////////////////////////////////////// VIPS //////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			getVips: () => {
				const token = localStorage.token;
				fetch("https://printerdirect.herokuapp.com/vips/all", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						Authorization: `Bearer ${token}`
					}
				})
					.then(response => response.json())
					.then(data => {
						setStore({ vips: data });
					});
			},

			deleteVip: vip_id => {
				const token = localStorage.token;
				fetch("https://printerdirect.herokuapp.com/vip/" + vip_id, {
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
					.then(response => response.json())
					.then(data => {
						setStore({ vips: data });
					});
			},

			saveVipFoundToUpdateToTheStore: itemId => {
				const store = getStore();
				let printer = store.vips.find(e => e.id === itemId);
				setStore({ printersFoundUpdate: printer });
			},

			updateVip: (updateObj, id, props) => {
				const url = "https://printerdirect.herokuapp.com/vip/";
				const token = localStorage.token;

				fetch(url + id, {
					method: "PUT",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json"
					},
					body: JSON.stringify(updateObj)
				})
					.then(response => response.json())
					.then(data => {
						setStore({ vips: data });
					});
				props.history.push("/admin");
			}
		}
	};
};

getState.propTypes = {
	history: PropTypes.object
};
export default getState;
