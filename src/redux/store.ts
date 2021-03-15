import { createStore, applyMiddleware, compose } from 'redux'
import { allReducers } from './reducers/allReducers'
import thunk from 'redux-thunk'

const middleware = [thunk]
const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
    allReducers,
    composeEnhancers(applyMiddleware(...middleware)),
)

export type RootState = ReturnType<typeof allReducers>