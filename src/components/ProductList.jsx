import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, deleteProduct } from '../redux/slices/CategorySlice';
import { fetchProducts } from '../api/index';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const products = useSelector(state => state.products.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts();
      dispatch(setProducts(products));
    };
    loadProducts();
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div>
      <h1>Product List</h1>
      <button onClick={() => navigate('/add')}>Add Product</button>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.title}
            <button onClick={() => navigate(`/edit/${product.id}`)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;