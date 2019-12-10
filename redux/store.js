import { createStore, applyMiddleware, compose } from 'redux'
import { allReducers } from './reducers/allReducers'
import thunk from 'redux-thunk'

const store = createStore(
    allReducers,

    compose(
        applyMiddleware(thunk),
        window.navigator.userAgent
            ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
                  window.__REDUX_DEVTOOLS_EXTENSION__()
            : compose,
    ),
)

export default store
