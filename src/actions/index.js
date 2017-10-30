import {GET_DATA, GET_DATA_SUCCESS, SEND_DATA, SEND_DATA_SUCCESS, EDIT_DATA, DELETE_DATA, RESET_COMPLETION, DATA_ERROR} from '../constants';

export function getData () {
	const action = {
		type: GET_DATA
	}
	return action;
}

export function sendData (data) {
	const action = {
		type: SEND_DATA,
		data: data
	}
	return action;
}

export function editData (data, link) {
	const action = {
		type: EDIT_DATA,
		data: data,
		link: link
	}
	return action;
}

export function deleteData (link) {
	const action = {
		type: DELETE_DATA,
		link: link
	}
	return action;
}

export function getDataSuccess (data) {
	const action = {
		type: GET_DATA_SUCCESS,
		data: data
	}
	return action;
}

export function sendDataSuccess () {
	const action = {
		type: SEND_DATA_SUCCESS,
	}
	return action;
}

export function dataError(message) {
	const action = {
		type: DATA_ERROR,
		message: message
	}
	return action
}

export function resetCompletion () {
	const action = {
		type: RESET_COMPLETION
	}
	return action
}