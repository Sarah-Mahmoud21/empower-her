// src/AddProduct.js

import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import '../AddProduct/AddProduct.css'; // Assuming you have a CSS file for styling

function AddProduct() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { memberId } = useParams(); // Access memberId directly here

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!productName || !description || !price || !category || images.length === 0 || !quantity) {
      setError('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('quantity', quantity);
    formData.append('memberId', memberId); // Add memberId to the formData

    images.forEach((image) => {
      formData.append('images', image); // Append each image file to the FormData
    });

    try {
      const response = await axios.post('http://localhost:4000/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        setMessage('Product added successfully!');
        setError('');
        setProductName('');
        setDescription('');
        setPrice('');
        setImages([]);
        setCategory('');
        setQuantity('1');
      }
    } catch (error) {
      setError('Failed to add product. Please try again.');
      console.error('Error adding product:', error);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prevImages => [...prevImages, ...files]);
  };

  return (
    <>
      <Header />
      
      <div className="add-product-container">
      <h3>Add your product for your customers here</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group-container">
            <div className="form-group">
              <h3>Basic Information</h3>
              <label htmlFor="productName"> Input Your Product's Name</label><br/>
              <input
                type="text"
                id="productName" 
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              /><br/>
              <label htmlFor="description"> Input Your Descriptions Here</label><br/>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea><br/>
            </div>
            
            <div className="form-group">
              <h3>Price</h3>
              <label htmlFor="price">Order Price </label><br/>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              /><br/>
            </div>
          </div>
          
          <div className="form-group-container">
            <div className="form-group">
              <h3>Category</h3>
              <label htmlFor="category">Product Category</label><br/>
              <select
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                  <option value="">Select Category</option>
                  <option value="Home">Home</option>
                  <option value="ClothesAndCrochete">Clothes And Crochet"</option>
                  <option value="Food">Food</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Other">Other</option>
              </select>
              <br/>
            </div>
            <div className="form-group">
              <h3>Quantity</h3>
              <label htmlFor="quantity">Available Quantity Of The Product</label><br/>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              /><br/>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="images">Images</label><br/>
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </div><br/>
          <div className="uploaded-pictures">
            {images.length > 0 && images.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt={`Uploaded Image ${index}`}
                style={{
                  maxWidth: '100px',
                  maxHeight: '100px',
                  margin: '10px',
                }}
              />
            ))}
          </div>
          <button type="submit">Add Product</button>
          {error && <p className="error">{error}</p>}
          {message && <p className="success">{message}</p>}
        </form>
      </div>
      <Footer />
    </>
  );
}

export default AddProduct;
