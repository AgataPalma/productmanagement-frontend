import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
    return (
        <header className="flex items-center py-4 md:py-8 bg-white shadow-md">
            <div className="header__logo ml-8"> {}
                <Link to="/">
                    <img src={logo} alt="Logo" className="h-10 w-auto" />
                </Link>
            </div>
            <nav className="nav ml-auto">
                <ul className="flex flex-row items-center sm:mt-4 sm:pt-4 md:mt-0 md:pt-0 md:mr-4 lg:mr-8 text-blue-950">
                    <li>
                        <Link to="/add-product" className="block font-medium px-4 py-1 md:p-2 lg:px-4">
                            Add Product
                        </Link>
                    </li>
                    <li>
                        <Link to="/product-list" className="block font-medium px-4 py-1 md:p-2 lg:px-4">
                            View Products
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;