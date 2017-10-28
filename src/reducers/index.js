import {GET_DATA, GET_DATA_SUCCESS, SEND_DATA, SEND_DATA_SUCCESS, EDIT_DATA, DELETE_DATA} from '../constants';

const data_item = (action) => {
	return {
		value: action.value
	}
}

const data = (state = [], action) => {
	switch (action.type) {
		case GET_DATA_SUCCESS:
			return action.data._embedded.cars
		default:
			return state;
	}
}

export default data;