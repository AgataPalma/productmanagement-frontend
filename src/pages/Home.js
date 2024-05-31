import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            const response = await fetch(`${API_ROUTES.GET_BARCODE}?barcode=${barcode}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setStatus(data.exists);
            if (data.exists) {
                // Ensure barcode is set correctly
                const currentBarcode = data.barcode || barcode;
                setBarcode(currentBarcode);

                // Make another API call to fetch product details using the barcode
                const productResponse = await fetch(API_ROUTES.GET_PRODUCT_BY_BARCODE(currentBarcode));
                if (!productResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const productData = await productResponse.json();
                setProduct(productData);
            } else {
                navigate('/add-product', { state: { barcode: data.barcode } });
            }
        } catch (error) {
            console.error('Error retrieving product:', error);
            setBarcode("No barcodes to read");
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
            setBarcode(''); // Clear barcode input field
            setProduct(null); // Reset product
            setStatus(null); // Reset status
            toast.success(`Stock successfully ${amount > 0 ? 'increased' : 'decreased'} by 1.`);
        } catch (error) {

            toast.error('Failed to update stock');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="container mx-auto text-center p-8">
                <h1 className="text-5xl font-bold mb-4">Product Management App</h1>
                <p className="text-2xl mb-6">Manage your products with ease</p>
                <div className="mt-8">
                    <input
                        type="text"
                        placeholder="Barcode"
                        value={barcode}
                        onChange={handleBarcodeChange}
                        className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
                        disabled
                    />
                    <button onClick={handleRetrieve} className="bg-blue-950 text-white px-4 py-2 rounded-r-md">
                        Retrieve
                    </button>
                </div>
                {status !== null && status === true && product && (
                    <div className="mt-4">
                        <p className="text-xl font-bold">{product.name}</p>
                        <div className="mt-4">
                            <button onClick={() => handleStockChange(1)} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                                Add 1 Unit
                            </button>
                            <button onClick={() => handleStockChange(-1)} className="bg-blue-500 text-white px-4 py-2 rounded">
                                Remove 1 Unit
                            </button>
                        </div>
                    </div>
                )}
                <ToastContainer />
            </div>
        </div>
    );
};

export default Home;
