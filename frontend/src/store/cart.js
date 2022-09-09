import csrfFetch from "./csrf";

const RECEIVE_ITEMS = 'cartItem/RECEIVE_ITEMS'
const RECEIVE_ITEM = 'cartItem/RECEIVE_ITEM';
const REMOVE_ITEM = 'cartItem/REMOVE_ITEM';
const RESET = 'cartItem/RESET';

export const receiveItems = (payload) => {
    return {
        type: RECEIVE_ITEMS,
        payload
    }
}

export const receiveItem = (item) => {
    return {
        type: RECEIVE_ITEM,
        item
    };
};


export const removeItem = (itemId) => {
    return {
        type: REMOVE_ITEM,
        itemId
    };
};

export const reset = () => {
    return {
        type: RESET
    };
};

// selectors

export const getItems = state => { 
    if (!state.cartItems) {
        return []
    } else {
        return Object.values(state.cartItems)
    }
}

// thunk action creators 

export const fetchCartItems = (userId) => async dispatch => {
    const res = await csrfFetch(`api/cartItems/${userId}`)
    const cartItems = await res.json();
    dispatch(receiveItems(cartItems))
}

export const createCartItem = (cartData) => async dispatch => {
    const res = await csrfFetch(`api/cartItems`, {
        method: 'POST',
        body: JSON.stringify(cartData),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const cartItem = await res.json();
    dispatch(receiveItem(cartItem))
}

export const updateCartItem = (cartData) => async dispatch => {
    const res = await csrfFetch(`api/cartItems/${cartData.id}`, {
        method: 'PATCH',
        body: JSON.stringify(cartData),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const cartItem = await res.json();
    dispatch(receiveItem(cartItem))
}

export const deleteCartItem = (itemId) => async dispatch => {
    const res = await csrfFetch(`api/cartItems/${itemId}`, {
        method: 'DELETE'
    })
    dispatch(removeItem(itemId))
}

// reducer - populates the view 

function cartReducer(state = {}, action) {
    Object.freeze(state);
    const nextState = {...state};

    switch(action.type) {
        case RECEIVE_ITEMS: 
            return action.payload.cartItems;
        case RECEIVE_ITEM:
            return nextState[action.cartItem.id] = action.cartItem;
        case REMOVE_ITEM: 
            delete nextState[action.itemId];
            return nextState;
        default:
            return state;
    }
}

export default cartReducer;




