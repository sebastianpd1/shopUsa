import PropTypes from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			orders: [
				{
					id: 1,
					item: "laptop",
					url: "www.amazon.com/laptop",
					weight: "1 kg",
					quantity: 2,
					cost: 4,
					price: 8
				},
				{
					id: 2,
					item: "phone",
					url: "www.amazon.com/laptop",
					weight: "1 kg",
					quantity: 2,
					cost: 4,
					price: 8
				},
				{
					id: 3,
					item: "tablet",
					url: "www.amazon.com/laptop",
					weight: "1 kg",
					quantity: 2,
					cost: 4,
					price: 8
				}
			],
			orderToUpload:[]
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
			/////////////////////////////////////////////////////// Orders //////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			getOrders: () => {
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

			deleteOrder: slider_id => {
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

			savePrinterFoundToUpdateToTheStore: itemId => {
				const store = getStore();
				let printer = store.printers.find(e => e.id === itemId);
				setStore({ printersFoundUpdate: printer });
			},

			handleChangeforOrderUpload: e => {
				const store = getStore();
				const target = e.target;
				const value = target.value;
				const name = target.name;
				setStore({ orderToUpload: { ...store.orderToUpload, [name]: value } });
			},
			uploadOrder: (orderToUpload, props) => {
				const url = "https://printerdirect.herokuapp.com/printer/";
				const token = localStorage.token;

				fetch(url, {
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json"
					},
					body: JSON.stringify(orderToUpload)
				})
					.then(response => response.json())
					.then(data => {
						setStore({ orders: data });
					});
				props.history.push("/admin");
			},
			updateOrder: (updateObj, id, props) => {
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
			}
		}
	};
};

getState.propTypes = {
	history: PropTypes.object
};
export default getState;
