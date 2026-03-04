'use client';

import { useState, useEffect, useCallback } from 'react';
import { cmsApi } from '@/lib/cms-api';
import Table from '../../../../components/admin/Table';


export default function SettingsPage() {

  const [data, setData] = useState({ settingsList: [], totalCount: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Sending search, page and limit to backend
      const response = await cmsApi.post('/settings', {
        search: searchTerm,
        page: currentPage,
        limit: ITEMS_PER_PAGE
      });

      // Update state with backend response
      if (response && response.data) {
        setData({
          settingsList: response.data.settingsList || [],
          totalCount: response.data.totalCount || 0,
          totalPages: Math.ceil((response.data.totalCount || 0) / ITEMS_PER_PAGE) || 1
        });
      } else {
        setData({ settingsList: [], totalCount: 0, totalPages: 1 });
      }
    } catch (err) {
      console.error('Failed to fetch Teams:', err);
      setError('Failed to load Teams. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, currentPage]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSettings();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchSettings]);

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
      <Table title="Settings" searchTerm={searchTerm} handleSearchChange={handleSearchChange} totalCount={data.totalCount} loading={loading} error={error} dataLength={data.settingsList.length} dataArray={data.settingsList} currentPage={currentPage} totalPages={data.totalPages} fetch={fetchSettings} handlePageChange={handlePageChange} />
    </>
  )
}
