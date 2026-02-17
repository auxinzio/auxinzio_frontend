"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Edit, Trash2, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useSettings } from "@/app/Context/SettingsContext";


export default function Table({title, searchTerm, handleSearchChange, totalCount, loading, error, dataLength, dataArray, currentPage, handlePageChange, fetch, totalPages}) {

    const { settings } = useSettings();

    return (
        <>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                    <h1 className="text-2xl font-bold text-gray-900">{title} Management</h1>
                    <p className="text-gray-500">View and manage your agency {title.toLowerCase()}</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-all shadow-lg shadow-green-500/20">
                    <Plus size={18} />
                    Add {title}
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                        <input
                        type="text"
                        placeholder={`Search ${title.toLowerCase()}...`}
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                        />
                    </div>
                    <div className="text-sm text-gray-500 me-4">
                        Total {title}: <span className="font-semibold text-gray-900">{totalCount}</span>
                    </div>
                    </div>

                    {loading ? (
                    <div className="p-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
                        <p className="text-gray-500 text-sm">Fetching services...</p>
                    </div>
                    ) : error ? (
                    <div className="p-20 text-center">
                        <p className="text-red-500 mb-4">{error}</p>
                        <button 
                        onClick={fetch}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm"
                        >
                        Try Again
                        </button>
                    </div>
                    ) : dataLength === 0 ? (
                    <div className="p-20 text-center text-gray-500">
                        <p>No {title} found.</p>
                    </div>
                    ) : (
                    <>
                        <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">{title} Name</th>
                                {
                                    title === "Careers" && (
                                        <>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Location</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Department</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Job Type</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Job ID</th>
                                        </>
                                    )
                                }
                                {
                                    title === "Teams"?(
                                        <>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Role</th>
                                        <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Image</th>
                                        </>
                                    ):(
                                        <>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                        </>
                                    )
                                }
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                            {dataArray.map((item, index) => (
                                <motion.tr 
                                key={item.id || index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="hover:bg-gray-50 transition-colors"
                                >
                                <td className="px-6 py-4">
                                    <div>
                                    <div className="text-sm font-medium text-gray-900">{item.name || item.product_name || item.title}</div>
                                    {/* <div className="text-xs text-gray-500 truncate max-w-xs">{item.description?.short_description || 'No description'}</div> */}
                                    </div>
                                </td>
                                {
                                    title === "Careers" && (
                                        <>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-full">
                                            {item.location}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-full">
                                            {item.department}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-full">
                                            {item.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-full">
                                            {item.job_id}
                                            </span>
                                        </td>
                                        </>
                                    )
                                }
                                {
                                    title === "Teams"?(
                                        <>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-full">
                                            {item.designation}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1">
                                            <Image src={`${settings?.backend_api_url}/${item.image}`} alt="team image" className="w-10 mx-auto rounded-full" width={100} height={100} />
                                            </span>
                                        </td>
                                        </>
                                    ):(
                                        <>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-full">
                                            Active
                                            </span>
                                        </td>
                                        </>
                                    )
                                }
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                    <button className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-all">
                                        <Edit size={16} />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                        <Trash2 size={16} />
                                    </button>
                                    </div>
                                </td>
                                </motion.tr>
                            ))}
                            </tbody>
                        </table>
                        </div>

                        {/* Pagination Controls */}
                        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="text-xs text-gray-500 font-medium">
                            Showing Page {currentPage} of {totalPages}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1 || loading}
                            className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                            <ChevronLeft size={16} />
                            </button>
                            <div className="flex gap-1">
                            {[...Array(Math.min(5, totalPages))].map((_, i) => {
                                // Simple pagination numbers logic (showing first 5 or around current)
                                let pageNum = i + 1;
                                if (totalPages > 5 && currentPage > 3) {
                                pageNum = currentPage - 3 + i + 1;
                                if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                                }
                                if (pageNum <= 0) return null;
                                if (pageNum > totalPages) return null;

                                return (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                                    currentPage === pageNum
                                        ? 'bg-green-500 text-white shadow-md shadow-green-500/20'
                                        : 'text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-200'
                                    }`}
                                >
                                    {pageNum}
                                </button>
                                );
                            })}
                            </div>
                            <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages || loading}
                            className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                            <ChevronRight size={16} />
                            </button>
                        </div>
                        </div>
                    </>
                    )}
                </div>
            </div>
        </>
    )
}