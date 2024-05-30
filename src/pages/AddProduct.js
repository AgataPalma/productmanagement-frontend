import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import API_ROUTES from '../apiRoutes';

const AddProduct = () => {
    const location = useLocation();
    const [product, setProduct] = useState({
        name: '',
        barcode: location.state?.barcode || '',
        description: '',
        stock: 0,
        image_url: '',
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API_ROUTES.ADD_PRODUCT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });
            if (response.ok) {
                alert('Product added successfully');
                setProduct({ name: '', barcode: '', description: '', stock: 0, image_url: '' });
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-8">Add Product</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-1">Name</label>
                    <input name="name" value={product.name} onChange={handleChange} className="border p-2 w-full" />
                </div>
                <div>
                    <label className="block mb-1">Barcode</label>
                    <input name="barcode" value={product.barcode} onChange={handleChange} className="border p-2 w-full" />
                </div>
                <div>
                    <label className="block mb-1">Description</label>
                    <textarea name="description" value={product.description} onChange={handleChange} className="border p-2 w-full" />
                </div>
                <div>
                    <label className="block mb-1">Stock</label>
                    <input name="stock" type="number" value={product.stock} onChange={handleChange} className="border p-2 w-full" />
                </div>
                <div>
                    <label className="block mb-1">Image URL</label>
                    <input name="image_url" value={product.image_url} onChange={handleChange} className="border p-2 w-full" />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
