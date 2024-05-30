import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_ROUTES from '../apiRoutes';

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
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
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
            alert('Product updated successfully');
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product');
        }
    };

    const handleStockChange = async (amount) => {
        const updatedStock = product.stock + amount;
        if (updatedStock < 0) return;
        try {
            const response = await fetch(API_ROUTES.UPDATE_PRODUCT(product.id), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...product, stock: updatedStock }),
            });
            if (!response.ok) {
                throw new Error('Failed to update the stock');
            }
            setProduct({ ...product, stock: updatedStock });
        } catch (error) {
            console.error('Error updating stock:', error);
            alert('Failed to update stock');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(API_ROUTES.DELETE_PRODUCT(product.id), {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete the product');
            }
            alert('Product deleted successfully');
            navigate('/product-list');
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-8">Product Detail</h1>
            <div className="bg-white p-6 shadow-md rounded">
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
                    <label className="block mb-1">Barcode</label>
                    <input
                        name="barcode"
                        value={product.barcode}
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
                        <button
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                            onClick={() => handleStockChange(-1)}
                        >
                            -
                        </button>
                        <input
                            name="stock"
                            value={product.stock}
                            onChange={handleChange}
                            className="border p-2 w-20 text-center mx-2"
                        />
                        <button
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                            onClick={() => handleStockChange(1)}
                        >
                            +
                        </button>
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
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
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