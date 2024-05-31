import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_ROUTES from '../apiRoutes';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${API_ROUTES.GET_PRODUCTS}/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                setError(error.message);
                toast.error(`Error loading product: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'stock') {
            const parsedValue = parseInt(value, 10);
            if (isNaN(parsedValue) || parsedValue < 0) return;
        }
        setProduct({ ...product, [name]: value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch(API_ROUTES.UPDATE_PRODUCT(product.id), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });
            if (!response.ok) {
                throw new Error('Failed to update the product');
            }
            toast.success('Product updated successfully');
            navigate('/product-list');
            
        } catch (error) {
            toast.error(`Error updating product: ${error.message}`);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(API_ROUTES.DELETE_PRODUCT(product.barcode), {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(errorText || 'Failed to delete product');
            }
            toast.success('Product deleted successfully');
            navigate('/product-list');

        } catch (error) {
            toast.error(`Error deleting product: ${error.message}`);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-8">Product Details</h1>
            <div className="bg-white p-6 shadow-md rounded">
                <div className="mb-4 block">
                    <label className="block mb-1">Barcode</label>
                    <input
                        name="barcode"
                        value={product.barcode}
                        onChange={handleChange}
                        className="border p-2 w-full disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                        disabled={true}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Name</label>
                    <input
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Description</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Stock</label>
                    <div className="flex items-center">
                        <input
                            name="stock"
                            value={product.stock}
                            onChange={handleChange}
                            className="border p-2 w-20 text-center mx-2"
                            type="number"
                            min="0"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Image URL</label>
                    <input
                        name="image_url"
                        value={product.image_url}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="flex space-x-4">
                    <button
                        className="bg-blue-950 text-white px-4 py-2 rounded"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                    <button
                        className="bg-red-800 text-white px-4 py-2 rounded"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
