import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (direction) => {
    onPageChange(direction);
  };

  return (
    <div>
      <button
        onClick={() => handlePageChange(-1)}
        disabled={currentPage === 1}
      >
        Précédent
      </button>
      <span>Page {currentPage} sur {totalPages}</span>
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === totalPages}
      >
        Suivant
      </button>
    </div>
  );
};

export default Pagination;
