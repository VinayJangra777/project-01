import { describe,it,expect } from "vitest";
import { cartPrice } from "./cartPrice";

describe("calculate total price of cart",()=>{
    it(" should return price of cart for cart",()=>{
        const mockCart=[
      {  id:'prod-01',title:'black jeans',price:799,quantity:4},
      {  id:'prod-02',title:'T-shirt',price:499,quantity:2}
    ];
    const result = cartPrice(mockCart);
    expect(result).toBe(4194);
    })
})