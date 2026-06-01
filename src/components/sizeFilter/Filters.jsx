import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSizeFilter, setSortOrder } from '../../store/productSlice'
import './Filters.scss';

const Filters = () => {
  const dispatch = useDispatch();
  const selectedSizes = useSelector((state) => state.products.selectedSizes);
  const sortBy = useSelector((state) => state.products.sortBy);

  const availableSizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];

  return (
    <div className="filters-container">
     
      <div className="sizes-section">
        <h3>Sizes:</h3>
        <div className="sizes-grid">
          {availableSizes.map((size) => {
            const isSelected = selectedSizes.includes(size);
            return (
              <button
                key={size}
                className={`size-btn ${isSelected ? 'active' : ''}`}
                onClick={() => dispatch(toggleSizeFilter(size))}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Filters;