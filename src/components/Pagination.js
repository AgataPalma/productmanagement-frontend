import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="flex justify-center mt-8">
            {pages.map(page => (
                <button
                    key={page}
                    className={`px-4 py-2 mx-2 ${currentPage === page ? 'bg-blue-950 text-white' : 'bg-gray-300'}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
