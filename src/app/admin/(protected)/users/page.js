'use client';

import { useState, useEffect, useCallback } from 'react';
import { cmsApi } from '@/lib/cms-api';
import Table from '../../../../components/admin/Table';
import { useAuth } from '@/app/Context/AuthContext';
import { ShieldOff } from 'lucide-react';


function AccessRestricted() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="bg-red-50 border border-red-100 rounded-2xl p-10 max-w-md w-full shadow-sm">
        <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-5">
          <ShieldOff size={32} className="text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Access Restricted</h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          You don&apos;t have permission to view this page. This section is only accessible to administrators.
        </p>
      </div>
    </div>
  );
}


export default function UserPage() {

  const { user, isLoading } = useAuth();

  const [data, setData] = useState({ usersList: [], totalCount: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Determine if the current user is a non-admin role
  const isRestricted = !isLoading && user?.user?.role === 'user';

  const fetchUsers = useCallback(async () => {
    if (isRestricted) return; // Don't fetch if restricted
    setLoading(true);
    setError(null);
    try {
      // Sending search, page and limit to backend
      const response = await cmsApi.post('/users', {
        search: searchTerm,
        page: currentPage,
        limit: ITEMS_PER_PAGE
      });

      // Update state with backend response
      if (response && response.data) {
        setData({
          usersList: response.data.usersList || [],
          totalCount: response.data.totalCount || 0,
          totalPages: Math.ceil((response.data.totalCount || 0) / ITEMS_PER_PAGE) || 1
        });
      } else {
        setData({ usersList: [], totalCount: 0, totalPages: 1 });
      }
    } catch (err) {
      console.error('Failed to fetch Users:', err);
      setError('Failed to load Users. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, currentPage, isRestricted]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchUsers]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= data.totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Show restriction screen if role is 'user'
  if (isRestricted) {
    return <AccessRestricted />;
  }

  return (
    <>
      <Table title="Users" searchTerm={searchTerm} handleSearchChange={handleSearchChange} totalCount={data.totalCount} loading={loading} error={error} dataLength={data.usersList.length} dataArray={data.usersList} currentPage={currentPage} totalPages={data.totalPages} fetch={fetchUsers} handlePageChange={handlePageChange} />
    </>
  )
}
