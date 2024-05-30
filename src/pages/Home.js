import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_ROUTES from '../apiRoutes';

const Home = () => {
    const [barcode, setBarcode] = useState('');
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();

    const handleBarcodeChange = (e) => {
        setBarcode(e.target.value);
    };

    const handleRetrieve = async () => {
        try {
            const response = await fetch(`${API_ROUTES.GET_BARCODE}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setStatus(data.exists);
            setProduct(data.product);
            if (data.exists === false) {
                setBarcode(data.barcode); // Update the barcode input field if status is false
            }
            if (data === "No records found in 'products_to_be_added' table"){
                setBarcode("No barcodes to read"); // Update the barcode input field if status is false
                console.log(data);
            }
        } catch (error) {
            console.error('Error retrieving product:', error);
            setBarcode("No barcodes to read"); // Update the barcode input field if status is false
        }
    };

    const handleStockChange = async (amount) => {
        if (!product) return;
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

    const handleAddProduct = () => {
        navigate('/add-product', { state: { barcode } });
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="container mx-auto text-center p-8">
                <h1 className="text-5xl font-bold mb-4">Product Management App</h1>
                <p className="text-2xl mb-6">Manage your products with ease</p>
                <div className="mt-8">
                    <input
                        type="text"
                        placeholder="Enter barcode"
                        value={barcode}
                        onChange={handleBarcodeChange}
                        className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
                    />
                    <button onClick={handleRetrieve} className="bg-blue-500 text-white px-4 py-2 rounded-r-md">
                        Retrieve
                    </button>
                </div>
                {status !== null && status === true && product && (
                    <div className="mt-4">
                        <button onClick={() => handleStockChange(1)} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                            Add 1 Unit
                        </button>
                        <button onClick={() => handleStockChange(-1)} className="bg-red-500 text-white px-4 py-2 rounded">
                            Remove 1 Unit
                        </button>
                    </div>
                )}
                {status !== null && status === false && (
                    <div className="mt-4">
                        <button onClick={handleAddProduct} className="bg-yellow-500 text-white px-4 py-2 rounded">
                            Add Product
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
