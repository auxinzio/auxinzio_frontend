'use client';

import { useState, useEffect, useCallback } from 'react';
import { cmsApi } from '@/lib/cms-api';
import Table from '../../../../components/admin/Table';


export default function FeedbacksPage() {

  const [data, setData] = useState({ feedbacksList: [], totalCount: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 2;

  const fetchFeedbacks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Sending search, page and limit to backend
      const response = await cmsApi.post('/feedbacks', {
        search: searchTerm,
        page: currentPage,
        limit: ITEMS_PER_PAGE
      });

      // Update state with backend response
      if (response && response.data) {
        setData({
          feedbacksList: response.data.feedbacksList || [],
          totalCount: response.data.totalCount || 0,
          totalPages: Math.ceil((response.data.totalCount || 0) / ITEMS_PER_PAGE) || 1
        });
      } else {
        setData({ feedbacksList: [], totalCount: 0, totalPages: 1 });
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
      fetchFeedbacks();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchFeedbacks]);

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
      <Table title="Feedbacks" searchTerm={searchTerm} handleSearchChange={handleSearchChange} totalCount={data.totalCount} loading={loading} error={error} dataLength={data.feedbacksList.length} dataArray={data.feedbacksList} currentPage={currentPage} totalPages={data.totalPages} fetch={fetchFeedbacks} handlePageChange={handlePageChange} />
    </>
  )
}
