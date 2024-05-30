import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_ROUTES from '../apiRoutes';
import Pagination from '../components/Pagination';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(API_ROUTES.GET_PRODUCTS);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const totalPages = Math.ceil(products.length / pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0); // Scroll to top on page change
    };

    const paginatedProducts = products.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="container mx-auto py-8">
            <div className="text-center mb-8">
                <h1 className="text-2xl md:text-4xl lg:text-6xl">Products</h1>
                <h2 className="text-lg md:text-xl lg:text-2xl">
                    Discover our amazing products.
                </h2>
            </div>

            <div className="flex flex-wrap -mx-4 pb-20">
                {paginatedProducts.map(product => (
                    <div key={product.barcode} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                        <Link to={`/product-detail/${product.barcode}`} className="product-card shadow-md transition-all duration-200 ease-in-out transform hover:shadow-xl">
                            <img src={product.image_url} alt="Product Image" className="w-full h-48 object-cover" />
                            <div className="p-6 bg-white">
                                <h2 className="text-2xl mb-2">{product.name}</h2>
                                <p className="text-base font-light">{product.description}</p>
                                <p className="text-sm text-gray-500 mt-2">Barcode: {product.barcode}</p>
                                <p className="text-sm text-gray-500 mt-2">Stock: {product.stock}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
        </div>
    );
};

export default ProductList;
