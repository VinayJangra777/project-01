import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import ItemCard from "./ItemCard.jsx";
import axios from "axios";
import { setProducts, setSortOrder } from "../../store/productSlice"; 
import { currentSortSelector,sortedItemsSelector } from "./ProductSelector.js";
import { selectedSort } from "../constants/sorting.js";
import "./ProductListing.scss";


const URL = "https://mocki.io/v1/0fdb8e9e-df08-4b67-9ae0-3cb4eccd3bc8?utm_source=chatgpt.com";

const ProductListing = () => {
    const dispatch = useDispatch(); 
    const currentSort = useSelector(currentSortSelector); 
    const sortedItems = useSelector(sortedItemsSelector);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(URL);           
               
                dispatch(setProducts(response.data.products));
            } catch (error) {
                console.error("fetching failed:", error);
            }
        };
        fetchProducts();
    }, [dispatch]);


    const handleSortChange = (e) => {
        dispatch(setSortOrder(e.target.value));
    };
   
    return (
        <div className="products-view">
            <div className="products-header">
                <p className="products-count">{`${sortedItems.length} Products Found`}</p>
                <div className="sort-section">
                    <label htmlFor="sort-select">Order By:</label>
                    <select id="sort-select" value={currentSort} onChange={handleSortChange}> 
                       {selectedSort.map((option)=>{
                        return (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        )
                    })}
                    </select>
                </div>
            </div>

            <div className="product-list">
                {sortedItems.map((item, idx) => (
    <ItemCard key={`product-${item.id}-${idx}`} item={item} idx={idx} />
))}
            </div>
        </div>
    );
};

export default ProductListing;
