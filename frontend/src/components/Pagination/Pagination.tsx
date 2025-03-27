import { useRouter } from 'next/navigation';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  search: string;
}

export const Pagination = ({ currentPage, totalItems, itemsPerPage, search }: PaginationProps) => {
  const router = useRouter();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Si solo hay una página, no mostramos la paginación
  if (totalPages <= 1) {
    return null;
  }
  
  const handlePageChange = (page: number) => {
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
    router.push(`/?page=${page}${searchParam}`);
  };
  
  // Crear un array de números de página para mostrar
  const pageNumbers = [];
  const maxPagesToShow = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  
  // Ajustar si estamos cerca del final
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <div className={styles.pagination}>
      <button 
        className={styles.pageButton}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt; Prev
      </button>
      
      {pageNumbers.map(number => (
        <button
          key={number}
          className={`${styles.pageButton} ${currentPage === number ? styles.active : ''}`}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </button>
      ))}
      
      <button 
        className={styles.pageButton}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next &gt;
      </button>
    </div>
  );
}; 