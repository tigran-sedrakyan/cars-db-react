import {GET_DATA_SUCCESS, SEND_DATA_SUCCESS, RESET_COMPLETION, DATA_ERROR} from '../constants';
import {combineReducers} from 'redux';

const data = (state = [], action) => {
	switch (action.type) {
		case GET_DATA_SUCCESS:
			return action.data._embedded.cars
		case DATA_ERROR:
			throw action.message
		default:
			return state;
	}
}

const completion = (state = false, action) => {
	let isDone = null;
	switch (action.type) {
		case SEND_DATA_SUCCESS:
			isDone = true;
			return isDone;
		case RESET_COMPLETION:
			isDone = false;
			return isDone;
		default:
			return state
	}
}

export default combineReducers({data, completion});