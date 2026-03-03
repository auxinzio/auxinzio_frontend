'use client';

import { useState, useEffect, useCallback } from 'react';
import { cmsApi } from '@/lib/cms-api';
import Table from '../../../../components/admin/Table';


export default function ChatPage() {

  const [data, setData] = useState({ chatList: [], totalCount: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 2;

  const fetchChat = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Sending search, page and limit to backend
      const response = await cmsApi.post('/chat', {
        search: searchTerm,
        page: currentPage,
        limit: ITEMS_PER_PAGE
      });

      // Update state with backend response
      if (response && response.data) {
        setData({
          chatList: response.data.chatList || [],
          totalCount: response.data.totalCount || 0,
          totalPages: Math.ceil((response.data.totalCount || 0) / ITEMS_PER_PAGE) || 1
        });
      } else {
        setData({ chatList: [], totalCount: 0, totalPages: 1 });
      }
    } catch (err) {
      console.error('Failed to fetch Chat:', err);
      setError('Failed to load Chat. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, currentPage]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchChat();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchChat]);

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
      <Table title="Chat" searchTerm={searchTerm} handleSearchChange={handleSearchChange} totalCount={data.totalCount} loading={loading} error={error} dataLength={data.chatList.length} dataArray={data.chatList} currentPage={currentPage} totalPages={data.totalPages} fetch={fetchChat} handlePageChange={handlePageChange} />
    </>
  )
}
