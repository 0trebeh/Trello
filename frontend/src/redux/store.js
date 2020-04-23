import { createStore, combineReducers, compose } from 'redux';
import persisState from 'redux-localstorage';

function userId(state='', action){
	switch(action.type) {
		case 'SET_ID':
			return action.Id;
		case 'ClEAR':
			return '';
		default:
			return state;
	}
}

function checkingSession(state=false, action){
	switch(action.type) {
		case 'CHECKED':
			return action.checked;
		case 'LOGOFF':
			return false;
		default:
			return state;
	}
}

let rootReducer = combineReducers({
	Id: userId,
	checked: checkingSession
})

let mainEnhancer = compose(persisState())

export default createStore(rootReducer,{},mainEnhancer)