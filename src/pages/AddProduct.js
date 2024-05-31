import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_ROUTES from '../apiRoutes';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        barcode: '',
        description: '',
        stock: 0,
        image_url: '',
    });
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

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
                toast.success('Product added successfully', {
                    onClose: () => setRedirect(true),
                });
                //setProduct({ name: '', barcode: '', description: '', stock: 0, image_url: '' });
            }
        } catch (error) {
            toast.error('Error adding product:', error.message);
        }
    };

    useEffect(() => {
        if (redirect) {
            navigate('/product-list');
        }
    }, [redirect, navigate]);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-8">New Product</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-1">Barcode</label>
                    <input name="barcode" value={product.barcode} onChange={handleChange} className="border p-2 w-full" />
                </div>
				<div>
                    <label className="block mb-1">Name</label>
                    <input name="name" value={product.name} onChange={handleChange} className="border p-2 w-full" />
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
                <button type="submit" className="bg-blue-950 text-white px-4 py-2 rounded">Add Product</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddProduct;
