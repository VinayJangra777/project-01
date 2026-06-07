import { useSelector } from 'react-redux';

export const cartItemsSelector=(state)=>{
    return state.cart.cartItems;
}