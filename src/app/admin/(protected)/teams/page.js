'use client';

import { useState, useEffect, useCallback } from 'react';
import { cmsApi } from '@/lib/cms-api';
import Table from '../../../../components/admin/Table';


export default function TeamsPage() {

  const [data, setData] = useState({ teamsList: [], totalCount: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const fetchTeams = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Sending search, page and limit to backend
      const response = await cmsApi.post('/teams', {
        search: searchTerm,
        page: currentPage,
        limit: ITEMS_PER_PAGE
      });

      // Update state with backend response
      if (response && response.data) {
        setData({
          teamsList: response.data.teamsList || [],
          totalCount: response.data.totalCount || 0,
          totalPages: Math.ceil((response.data.totalCount || 0) / ITEMS_PER_PAGE) || 1
        });
      } else {
        setData({ teamsList: [], totalCount: 0, totalPages: 1 });
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
      fetchTeams();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchTeams]);

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
      <Table title="Teams" searchTerm={searchTerm} handleSearchChange={handleSearchChange} totalCount={data.totalCount} loading={loading} error={error} dataLength={data.teamsList.length} dataArray={data.teamsList} currentPage={currentPage} totalPages={data.totalPages} fetch={fetchTeams} handlePageChange={handlePageChange} />
    </>
  )
}
