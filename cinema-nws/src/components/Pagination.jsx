import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (direction) => {
        onPageChange(direction);
    };

    return (
        <div class="mt-10 flex flex-col items-center">
            <span class="text-sm text-gray-700 dark:text-gray-400">
                Page <span class="font-semibold text-gray-900 dark:text-white">{currentPage}</span> sur <span class="font-semibold text-gray-900 dark:text-white">{totalPages}</span>
            </span>
            <div class="inline-flex mt-2 xs:mt-0">
                <button
                    onClick={() => handlePageChange(-1)}
                    disabled={currentPage === 1}
                    class="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <svg class="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                    </svg>
                    Précédent
                </button>
                <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === totalPages}
                    class="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Suivant
                    <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Pagination;
