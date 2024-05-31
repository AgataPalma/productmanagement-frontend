import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBarcode, FaTimes } from 'react-icons/fa';
import API_ROUTES from '../apiRoutes';
import loadingGif from '../assets/barcode_reader.gif';

const Home = () => {
    const [barcode, setBarcode] = useState('');
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const navigate = useNavigate();

    const handleRetrieve = () => {
        setLoading(true);
        const id = setInterval(async () => {
            try {
                const response = await fetch(`${API_ROUTES.GET_BARCODE}`);
                if (!response.ok) {
                    //const errorText = await response.text();
                    //console.error('Error response:', errorText);
                    //throw new Error(errorText || 'Failed to read barcode');
                }
                const data = await response.json();
                if (data.action) {
                    clearInterval(id);
                    setStatus(data.action);
                    setBarcode(data.barcode);

                    if (data.action === 'ADDED' || data.action === 'REMOVED') {
                        const productResponse = await fetch(API_ROUTES.GET_PRODUCT_BY_BARCODE(data.barcode));
                        if (!productResponse.ok) {
                            throw new Error('Network response was not ok');
                        }
                        const productData = await productResponse.json();
                        setProduct(productData);
                        setLoading(false);

                        toast.success(`Stock successfully ${data.action === 'ADDED' ? 'increased' : 'decreased'} for ${productData.name}`, {
                            onClose: () => {
                                setBarcode('');
                                setProduct(null);
                                setStatus(null);
                            }
                        });
                    } else if (data.action === 'CREATE') {
                        setLoading(false);
                        navigate('/add-product', { state: { barcode: data.barcode } });
                    }
                }
            } catch (error) {
               // toast.error('Error retrieving product: ' + error.message);
               // clearInterval(id);
               // setLoading(false);
            }
        }, 1000);
        setIntervalId(id);
    };

    const handleCancel = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="container mx-auto text-center p-8">
                <h1 className="text-5xl font-bold mb-4">Product Management App</h1>
                <p className="text-2xl mb-6">Manage your products with ease</p>
                <div className="mt-8 flex justify-center">
                    {!loading ? (
                        <button onClick={handleRetrieve} className="bg-blue-950 text-white px-4 py-2 rounded flex items-center">
                            <FaBarcode className="mr-2" />
                            Read Barcode
                        </button>
                    ) : (
                        <div className="flex flex-col items-center">
                            <img src={loadingGif} alt="Loading..." className="mx-auto mb-4 w-52 h-28" />
                            <button onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded flex items-center">
                                <FaTimes className="mr-2" />
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
                {barcode && !loading && (
                    <div className="mt-4 text-lg">
                        <p>Barcode: {barcode}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
