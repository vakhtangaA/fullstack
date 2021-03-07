import axios from "axios";
const baseUrl = "https://stormy-badlands-91104.herokuapp.com/api/persons";

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
