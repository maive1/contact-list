import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Proptypes from "prop-types";

import { ContactCard } from "../component/ContactCard.js";

export const EditContact = props => {
	const { store, actions } = useContext(Context);
	let short = store.contacts[props.match.params.index];
	let id = props.match.params.id;
	const [phone, setPhone] = useState(short.phone);
	const [name, setName] = useState(short.name);
	const [email, setEmail] = useState(short.full_name);
	const [address, setAddress] = useState(short.address);
	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Edit Contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Full Name"
							name="fullname"
							defaultValue={name}
							onChange={e => setName(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
							name="email"
							defaultValue={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className="form-control"
							placeholder="Enter phone"
							name="phone"
							defaultValue={phone}
							onChange={e => setPhone(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter address"
							name="address"
							defaultValue={address}
							onChange={e => setAddress(e.target.value)}
						/>
					</div>
					<Link to={"/"}>
						<button
							type="button"
							value="submit"
							className="btn btn-primary form-control"
							onClick={e => {
								actions.updateContact(e, id, name, phone, email, address);
							}}>
							save
						</button>
					</Link>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};

EditContact.propTypes = {
	match: Proptypes.object
};
