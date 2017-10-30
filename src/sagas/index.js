import { call, put, takeEvery } from 'redux-saga/effects'
import { getDataSuccess, sendDataSuccess, dataError } from '../actions'
import url from '../config'

function* getData(action) {
	try {
		const data = yield call(getHelper, url)
    	yield put(getDataSuccess(data));
    }
    catch (e) {
    	yield put(dataError(e.message));
   }
}

function* editData(action) {
	try {
		yield call(editHelper, action.link, action.data);
		yield put(sendDataSuccess());
    }
    catch (e) {
    	yield put(dataError(e.message));
   }
}

function* deleteData(action) {
	try {
		yield call(deleteHelper, action.link);
		yield put(sendDataSuccess());
    }
    catch (e) {
    	yield put(dataError(e.message));
   }
}

function* sendData(action) {
	try {
		yield call(sendHelper, url, action.data)
    	yield put(sendDataSuccess());
    }
    catch (e) {
    	yield put(dataError(e.message));
   }
}

const getHelper = (url) => {
	return fetch (url, 
		{
			method: "GET"
		})
		.then(res => res.json())
		.then (data => {return data})
}

const sendHelper = (url, data) => {
	return fetch (url, 
		{
	        method: "POST",
	        body: JSON.stringify(data),
	        headers: {
	          'Content-Type': 'application/json'
	        }
		})
}

const editHelper = (data, link) => {
	return fetch (link,
		{
			"method": "PATCH",
			"body": JSON.stringify(data),
			headers: {
		    	'Content-Type': 'application/json',
		    }
		})
}

const deleteHelper = (link) => {
	return fetch(link, {
        	"method" : "DELETE"
        })
}

export function* mySaga() {
	yield takeEvery('GET_DATA', getData);
	yield takeEvery('SEND_DATA', sendData);
	yield takeEvery('EDIT_DATA', editData);
	yield takeEvery('DELETE_DATA', deleteData)
}

export default mySaga