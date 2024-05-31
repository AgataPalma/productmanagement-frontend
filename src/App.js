import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Header from './components/Header';
import Footer from './components/Footer';
import './assets/css/main.scss';

const App = () => {
    const location = useLocation();

    return (
        <div className="font-sans antialiased text-gray-900 bg-gray-100 min-h-screen flex flex-col">
            <title>Stock management</title>
            <Header/>
            <div className="flex-grow">
                <TransitionGroup>
                    <CSSTransition key={location.key} classNames="fade" timeout={500}>
                        <Routes location={location}>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/add-product" element={<AddProduct/>}/>
                            <Route path="/product-list" element={<ProductList/>}/>
                            <Route path="/product-detail/:id" element={<ProductDetail/>}/>
                        </Routes>
                    </CSSTransition>
                </TransitionGroup>
            </div>
            <Footer/>
        </div>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
