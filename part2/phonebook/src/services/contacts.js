import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
	return axios.get(baseUrl);
};

const create = newObject => {
	return axios.post(baseUrl, newObject);
};

const deleteContact = id => {
	return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, updatedNumber) => {
	return axios.put(`${baseUrl}/${id}`, updatedNumber);
};

const contacts = {
	getAll,
	create,
	deleteContact,
	update,
};

export default contacts;
