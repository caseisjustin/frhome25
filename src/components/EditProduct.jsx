import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct } from '../redux/slices/CategorySlice';

const EditProduct = () => {
  const { id } = useParams();
  const products = useSelector(state => state.products.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');

  useEffect(() => {
    const product = products.find(p => p.id === parseInt(id));
    if (product) {
      setTitle(product.title);
    }
  }, [id, products]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id: parseInt(id), title }));
    navigate('/');
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProduct;