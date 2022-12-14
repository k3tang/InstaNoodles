import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import session from './session';
import productsReducer from './products';
import cartReducer from './cart';
import reviewsReducer from './reviews';


const rootReducer = combineReducers({
    session,
    products: productsReducer,
    cartItems: cartReducer,
    reviews: reviewsReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers = 
        window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer)
};

export default configureStore;