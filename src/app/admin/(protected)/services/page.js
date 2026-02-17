'use client';

import { useState, useEffect, useCallback } from 'react';
import { cmsApi } from '@/lib/cms-api';
import Table from '../../components/Table';

export default function ServicesPage() {
  const [data, setData] = useState({ serviceList: [], totalCount: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 2;

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Sending search, page and limit to backend
      const response = await cmsApi.post('/services', {
        search: searchTerm,
        page: currentPage,
        limit: ITEMS_PER_PAGE
      });
      
      // Update state with backend response
      if (response && response.data) {
        setData({
          serviceList: response.data.serviceList || [],
          totalCount: response.data.totalCount || 0,
          totalPages: Math.ceil((response.data.totalCount || 0) / ITEMS_PER_PAGE) || 1
        });
      } else {
        setData({ serviceList: [], totalCount: 0, totalPages: 1 });
      }
    } catch (err) {
      console.error('Failed to fetch services:', err);
      setError('Failed to load services. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, currentPage]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchServices();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchServices]);

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
      <Table title="Services" searchTerm={searchTerm} handleSearchChange={handleSearchChange} totalCount={data.totalCount} loading={loading} error={error} dataLength={data.serviceList.length} dataArray={data.serviceList}  currentPage={currentPage} totalPages={data.totalPages} fetch={fetchServices} handlePageChange={handlePageChange}/>
    </>
  );
}

