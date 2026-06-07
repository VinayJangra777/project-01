import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useSelector, useDispatch } from "react-redux";
import ProductListing from "./ProductListings";
import axios from "axios";

vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

vi.mock("axios");

vi.mock("./ItemCard.jsx", () => ({
  default: ({ item }) => <div data-testid="mock-item-card">{item.title}</div>,
}));

vi.mock("../constants/sorting.js", () => ({
  selectedSort: [
    { value: "", label: "Select Price Order" },
    { value: "low-to-high", label: "Lowest to Highest" },
    { value: "high-to-low", label: "Highest to Lowest" },
  ],
}));

describe("Product Listing", () => {
  const mockDispatch = vi.fn();
  const sampleProducts = [
    { id: 1, title: "Running Shoes", price: "120.00" },
    { id: 2, title: "Leather Wallet", price: "45.00" },
  ];

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    vi.clearAllMocks();
  });

  it("should fetch products from the API on mount and dispatch them to the store", async () => {
    useSelector.mockReturnValue([]);

    axios.get.mockResolvedValueOnce({
      data: { products: sampleProducts },
    });
    render(<ProductListing />);

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining(
        "https://mocki.io/v1/0fdb8e9e-df08-4b67-9ae0-3cb4eccd3bc8",
      ),
    );

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "products/setProducts",
        payload: sampleProducts,
      });
    });
  });

  it("should accurately display the count and loop list items when products state populates", () => {
    useSelector.mockImplementation((selector) => {
      if (selector.name === "currentSortSelector") return "";
      return sampleProducts;
    });

    render(<ProductListing />);

    expect(screen.getByText("2 Products Found")).toBeInTheDocument();
    expect(screen.getByText("Running Shoes")).toBeInTheDocument();
    expect(screen.getByText("Leather Wallet")).toBeInTheDocument();
  });

  it("should dispatch setSortOrder action when user changes dropdown option selection", async () => {
    useSelector.mockReturnValue([]);

    render(<ProductListing />);

    const user = userEvent.setup();

    const selectDropdown = screen.getByLabelText("Order By:");

    await user.selectOptions(selectDropdown, "low-to-high");

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "products/setSortOrder",
      payload: "low-to-high",
    });
  });
});
