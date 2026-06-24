import React, { useEffect } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  setSortOrder,
} from "../../store/productSlice";

export const currentSortSelector = (state) => state.products.sortBy;
const selectItems = (state) => state.products?.items || [];
const selectSelectedSizes = (state) => state.products?.selectedSizes || [];

export const sortedItemsSelector = createSelector(
  [selectItems, currentSortSelector, selectSelectedSizes],
  (items, sortBy, selectedSizes) => {
    let filteredItems = items;
    if (selectedSizes && selectedSizes.length > 0) {
      filteredItems = items.filter((product) =>
        product.availableSizes?.some((size) => selectedSizes.includes(size)),
      );
    }

    if (sortBy === "low-to-high") {
      return [...filteredItems].sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price),
      );
    }

    if (sortBy === "high-to-low") {
      return [...filteredItems].sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price),
      );
    }

    return filteredItems;
  },
);
