import styles from './PaginationConsole.module.css';

interface PaginationConsoleProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

const PaginationConsole = (props: PaginationConsoleProps) => {
    const { currentPage, totalPages, onPageChange } = props

    return (
        <div className={styles.pagination}>
            <button 
                disabled={currentPage <= 1} 
                onClick={() => onPageChange(currentPage - 1)}
                className={styles.pageButton}
            >
                Previous
            </button>
            
            <span className={styles.pageIndicator}>
                Page {currentPage} of {totalPages}
            </span>
            
            <button 
                disabled={currentPage >= totalPages} 
                onClick={() => onPageChange(currentPage + 1)}
                className={styles.pageButton}
            >
                Next
            </button>
        </div>
    );
};

export default PaginationConsole