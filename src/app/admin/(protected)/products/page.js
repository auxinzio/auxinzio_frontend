
'use client';

import { useState, useEffect, useCallback } from 'react';
import { cmsApi } from '@/lib/cms-api';
import Table from '../../components/Table';


export default function ProductsPage() {

    const [data, setData] = useState({ productList: [], totalCount: 0, totalPages: 1 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 2;

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
          // Sending search, page and limit to backend
          const response = await cmsApi.post('/products', {
            search: searchTerm,
            page: currentPage,
            limit: ITEMS_PER_PAGE
          });

          // Update state with backend response
          if (response && response.data) {
            setData({
              productList: response.data.productsList || [],
              totalCount: response.data.count || 0,
              totalPages: Math.ceil((response.data.count || 0) / ITEMS_PER_PAGE) || 1
            });
          } else {
            setData({ productList: [], totalCount: 0, totalPages: 1 });
          }
        } catch (err) {
          console.error('Failed to fetch Products:', err);
          setError('Failed to load Products. Please check your connection.');
        } finally {
          setLoading(false);
        }
      }, [searchTerm, currentPage]);
    
      useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
          fetchProducts();
        }, 500);
    
        return () => clearTimeout(delayDebounceFn);
      }, [fetchProducts]);
    
      const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
      };
    
      const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= data.totalPages) {
          setCurrentPage(newPage);
        }
      };
    
    
  return (
    <>
    <Table title="Products" searchTerm={searchTerm} handleSearchChange={handleSearchChange} totalCount={data.totalCount} loading={loading} error={error} dataLength={data.productList.length} dataArray={data.productList}  currentPage={currentPage} totalPages={data.totalPages} fetch={fetchProducts} handlePageChange={handlePageChange}/>
    </>
  )
}
