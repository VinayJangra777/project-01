import React from "react";
import "./ItemCard.scss";
import { useDispatch } from "react-redux"; 
import { addToCart } from "../../store/cartSlice"; 

const ItemCard=({item,idx})=>{
    const dispatch = useDispatch();
    const {
        availableSizes,
        currencyFormat,
        currencyId,
        description,
        id,
        installments,
        isFreeShipping,
        price,
        sku,
        style,
        title
        } = item;
        const basePath="/products";
        const handleAddToCart = () => {
        dispatch(addToCart(item)); 
    };
    return (
        <div className="item-card">
        {isFreeShipping ? <p className="shipping-tag">Free Shipping</p> : null}
        <img src={`${basePath}/${sku}_1.jpg`} alt={title} className="product-image"/>
            <h2 className="product-title">{title}</h2>
            <span className="title-divider"></span>
               <div className="price-container">
                <span className="currency">
                    {currencyFormat}
                </span>

                <span className="price">
                    {price}
                </span>
            </div>
            <button className="cart-button" onClick={handleAddToCart}>Add to Cart</button>
        </div>
    )
}
export default ItemCard;

