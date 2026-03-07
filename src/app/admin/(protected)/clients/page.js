'use client';

import { useState, useEffect, useCallback } from 'react';
import { cmsApi } from '@/lib/cms-api';
import Table from '../../../../components/admin/Table';


export default function ClientsPage() {

  const [data, setData] = useState({ clientsList: [], totalCount: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Sending search, page and limit to backend
      const response = await cmsApi.post('/clients', {
        search: searchTerm,
        page: currentPage,
        limit: ITEMS_PER_PAGE
      });

      // Update state with backend response
      if (response && response.data) {
        setData({
          clientsList: response.data.clientsList || [],
          totalCount: response.data.totalCount || 0,
          totalPages: Math.ceil((response.data.totalCount || 0) / ITEMS_PER_PAGE) || 1
        });
      } else {
        setData({ clientsList: [], totalCount: 0, totalPages: 1 });
      }
    } catch (err) {
      console.error('Failed to fetch Clients:', err);
      setError('Failed to load Clients. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, currentPage]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchClients();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchClients]);

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
      <Table title="Clients" searchTerm={searchTerm} handleSearchChange={handleSearchChange} totalCount={data.totalCount} loading={loading} error={error} dataLength={data.clientsList.length} dataArray={data.clientsList} currentPage={currentPage} totalPages={data.totalPages} fetch={fetchClients} handlePageChange={handlePageChange} />
    </>
  )
}
