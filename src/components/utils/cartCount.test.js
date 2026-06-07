import { describe,it,expect } from "vitest";
import { cartQty } from "./cartCount";

describe("calculate total cart items",()=>{
    
    
    it("calculate total cart item for mock",()=>{const mockCart=[
      {  id:'prod-01',title:'black jeans',quantity:4},
      {  id:'prod-02',title:'T-shirt',quantity:2}
    ];
    const result =cartQty(mockCart);
    expect(result).toBe(6);});

    it("should return 0 when cart empty",()=>{
        expect(cartQty([])).toBe(0);
    });

})

