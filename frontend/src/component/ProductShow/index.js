import { useSelector } from "react-redux";
import "./productshow.css";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProduct, getProduct } from "../../store/products";
import { useEffect, useState } from "react";
import { getCartItem, updateCartItem, createCartItem, fetchCartItems } from "../../store/cart";

const ProductShow = () => {
    const {productId} = useParams();
    const dispatch = useDispatch();
    const user = sessionStorage.getItem('currentUser')
    const product = useSelector(getProduct(productId));
    const item = useSelector(getCartItem(productId))
    const [count, setCount] = useState(1);
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchProduct(productId))
        dispatch(fetchCartItems())
    }, [productId])

    useEffect(() => {
        dispatch(getCartItem(productId))
      
    },[item])

    if (!product) return null;

    const handleInput = () => {
        let input = parseInt(document.getElementById("show-input").value);
        console.log(input + 1)
        if (input > 0) {
            setCount(input)
        } else {
            setCount("")
        }
    }
   
    const {name, photoUrl, price, desc} = product;

    //add to cart 
 
    const handleAddCart = (e) => {
        console.log(user)
        e.preventDefault();
        if (!user) return history.push("/signup");


        const userId = JSON.parse(user).id
        if (!item ) {
            const newItem = {
                cartItem: {
                    quantity: count,
                    productId: Number(productId),
                    userId: userId
                }
            }
            return dispatch(createCartItem(newItem))
        } else if (item) {
            const updateItem = {
                cartItem: {
                    id: item.id,
                    quantity: item.quantity + count,
                    productId: Number(productId),
                    userId: userId
                }
            }
            return dispatch(updateCartItem(updateItem))
        }
    }
    
    return (
        <>
        <div id="show-component">
            <div id="show-picture">
                <img src={photoUrl} alt="product-picture"/>
            </div>
            <div id="show-text-container">
                    <div id="show-name">{name}</div>
                    <div id="show-description">{desc}</div>
                    <div id="show-price">${(Math.round(price * 100)/100).toFixed(2)}</div>
                    <div id="show-quantity-container">
                        <label htmlFor="show-quantity-container" id="show-label">Select Quantity</label>
                            <div className="show-quantity">
                              
                            <button onClick={() => ((parseInt(count) - 1) > 0 ? setCount(parseInt(count) - 1) : setCount(1))}>-</button>
                                <input type="text" id="show-input" value={count} onChange={handleInput}></input>
                            <button onClick={() => setCount(parseInt(count) + 1)}>+</button>
                              
                            </div>
                    </div>
                    <button id="show-add-button" onClick={handleAddCart}>Add to cart</button>
            </div>    
        </div>
        </>
    )
}

export default ProductShow;