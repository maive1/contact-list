const url = "https://assets.breatheco.de/apis/fake/contact/";
const getState = ({ getStore, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			contact: {
				fullname: "",
				email: "",
				agenda_slug: "agenda2020",
				address: "",
				phone: ""
			},
			contacts: []
		},
		actions: {
			setAllContacts: e => {
				fetch(url + "agenda/agenda2020")
					.then(res => res.json())
					.then(data => {
						setStore({
							contacts: data
						});
					})
					.catch(error => console.log(error));
			},

			handleChange: e => {
				e.preventDefault();
				const { contact } = getStore();
				contact[e.target.name] = e.target.value;
				setStore({ contact: contact });
			},

			addContact: e => {
				const store = getStore();
				fetch(url, {
					method: "POST",
					body: JSON.stringify(store.contact),
					headers: {
						"Content-Type": "aplication/json"
					}
				})
					.then(res => res.json())
					.then(() => {
						fetch(url + "agenda/agenda2020")
							.then(res => res.json())
							.then(data => {
								console.log(data);
								setStore({ contacts: data });
							})
							.catch(error => console.log(error));
					})
					.catch(error => console.log(error));
			},

			updateContact: e => {
				const store = getStore();
				console.log(e.target);
				fetch(url + e.target.value, {
					method: "PUT",
					body: JSON.stringify(store.contact),
					headers: {
						"Content-Type": "aplication/json"
					}
				})
					.then(res => {
						if (res.ok === true) {
							fetch(url + "agenda/agenda2020")
								.then(res => res.json())
								.then(data => {
									console.log(data);
									setStore({ contacts: data });
								})
								.catch(error => console.log(error));
						}
					})

					.catch(error => console.log(error));
			},

			deleteContact: e => {
				const store = getStore();
				fetch(url + e.target.id, {
					method: "DELETE",
					headers: {
						"Content-Type": "aplication/json"
					}
				})
					.then(res => {
						if (res.ok === true) {
							fetch(url + "/agenda/agenda2020", {
								method: "GET",
								headers: {
									"Content-Type": "application/json"
								}
							})
								.then(res => res.json())
								.then(data => setStore({ contacts: data }))
								.catch(error => console.log(error));
						}
					})
					.then(data => console.log("contact removed"))
					.catch(error => console.log(error));
			}
		}
	};
};

export default getState;
