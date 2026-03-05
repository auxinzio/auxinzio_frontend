'use client';

import { useState, useEffect, useCallback } from 'react';
import { cmsApi } from '@/lib/cms-api';
import Table from '../../../../components/admin/Table';


export default function EnquiryPage() {

    const [data, setData] = useState({ enquiresList: [], product: [], totalCount: 0, totalPages: 1 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;

    const fetchEnquiry = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Sending search, page and limit to backend
            const response = await cmsApi.post('/enquiry', {
                search: searchTerm,
                page: currentPage,
                limit: ITEMS_PER_PAGE
            });
            const response1 = await cmsApi.post('/products', {
                search: searchTerm,
                page: currentPage,
                limit: ITEMS_PER_PAGE
            });

            // Update state with backend response
            if (response && response.data && response1 && response1.data) {
                setData({
                    enquiresList: response.data.enquiresList || [],
                    product: response1.data.productsList || [],
                    totalCount: response.data.totalCount || 0,
                    totalPages: Math.ceil((response.data.totalCount || 0) / ITEMS_PER_PAGE) || 1
                });
            } else {
                setData({ enquiresList: [], product: [], totalCount: 0, totalPages: 1 });
            }
        } catch (err) {
            console.error('Failed to fetch Enquiry:', err);
            setError('Failed to load Enquiry. Please check your connection.');
        } finally {
            setLoading(false);
        }
    }, [searchTerm, currentPage]);


    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchEnquiry();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [fetchEnquiry]);

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
            <Table title="Enquiry" searchTerm={searchTerm} handleSearchChange={handleSearchChange} totalCount={data.totalCount} loading={loading} error={error} dataLength={data.enquiresList.length} dataArray={data.enquiresList} currentPage={currentPage} totalPages={data.totalPages} fetch={fetchEnquiry} handlePageChange={handlePageChange} product={data.product} />
        </>
    )
}
