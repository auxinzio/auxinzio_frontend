"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Edit, Trash2, Loader2, ChevronLeft, ChevronRight, X, Save, Eye } from "lucide-react";
import Image from "next/image";
import { useSettings } from "@/app/Context/SettingsContext";
import Modal, { ApplicationModal } from "./Modal";
import { cmsApi } from "@/lib/cms-api";
import { toast } from "react-toastify";

export default function Table({ title, searchTerm, handleSearchChange, totalCount, loading, error, dataLength, dataArray, currentPage, handlePageChange, fetch, totalPages, product }) {

    const { settings } = useSettings();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        if (product && Array.isArray(product)) {
            setProductList(product.map((item) => ({
                id: item.id,
                name: item.product_name
            })));
        }
    }, [product]);

    const getFormFields = (type) => {
        switch (type) {
            case "Settings":
                return [
                    { name: "key", label: "Key", type: "text", placeholder: "Enter key" },
                    { name: "value", label: "Value", type: "text", placeholder: "Enter value" },
                    { name: "status", label: "Status", type: "select", options: ["Active", "Inactive"] }
                ];
            case "Chat":
                return [
                    { name: "question", label: "Question", type: "text", placeholder: "Enter Question" },
                    { name: "answer", label: "Answer", type: "textarea", placeholder: "Enter Answer" },
                    { name: "status", label: "Status", type: "select", options: ["Active", "Inactive"] }
                ];
            case "FAQ":
                return [
                    { name: "product_id", label: "Product", type: "select", placeholder: "Select product", options: productList },
                    { name: "question", label: "Question", type: "text", placeholder: "Enter Question" },
                    { name: "answer", label: "Answer", type: "textarea", placeholder: "Enter Answer" },
                    { name: "status", label: "Status", type: "select", options: ["Active", "Inactive"] }
                ];
            case "Subscribers":
                return [
                    { name: "email", label: "Email Address", type: "email", placeholder: "Enter Email Address" },
                    { name: "status", label: "Status", type: "select", options: ["Active", "Inactive"] }
                ];
            case "Feedbacks":
                return [
                    { name: "name", label: "Name", type: "text", placeholder: "Enter Name" },
                    { name: "content", label: "Content", type: "textarea", placeholder: "Enter Content" },
                    { name: "rating", label: "Rating", type: "number", placeholder: "Enter Rating" },
                    { name: "location", label: "Location", type: "text", placeholder: "Enter Location" },
                    { name: "image", label: "Image", type: "image", placeholder: "Upload Image" },
                    { name: "status", label: "Status", type: "select", options: ["Active", "Inactive"] }
                ];
            case "Services":
                return [
                    { name: "title", label: "Service Title", type: "text", placeholder: "Enter Service Title" },
                    { name: "slug", label: "Service Slug", type: "text", placeholder: "Enter Service Slug" },
                    { name: "service_item", label: "Service Keypoints ('~' separated)", type: "textarea", placeholder: "Enter Service Keypoints" },
                    { name: "short_description_title", label: "Short Description Title", type: "text", placeholder: "Enter Short Description Title" },
                    { name: "short_description", label: "Short Description", type: "textarea", placeholder: "Enter Short Description" },
                    { name: "long_description_title", label: "Long Description Title", type: "text", placeholder: "Enter Long Description Title" },
                    { name: "long_description", label: "Long Description ('~' separated)", type: "textarea", placeholder: "Enter Long Description" },
                    { name: "main_logo", label: "Service Main Logo", type: "image", placeholder: "Upload Image" },
                    { name: "sub_logo", label: "Service Sub Logo", type: "image", placeholder: "Upload Image" },
                    { name: "status", label: "Status", type: "select", options: ["Active", "In-active"] },
                ];
            case "Products":
                return [
                    { name: "product_name", label: "Product Name", type: "text", placeholder: "Enter Product Name" },
                    { name: "slug", label: "Product Slug", type: "text", placeholder: "Enter Product Slug" },
                    { name: "tag", label: "Product Tag", type: "text", placeholder: "Enter Product Tag" },
                    { name: "category_name", label: "Category Name", type: "text", placeholder: "Enter Category Name" },
                    { name: "description", label: "Description ('~' separated)", type: "textarea", placeholder: "Enter Description" },
                    { name: "key_feature", label: "Product Key Features ('~' separated)", type: "textarea", placeholder: "Enter Product Key Features" },
                    { name: "time_benefits", label: "Time Benefits ('~' separated)", type: "textarea", placeholder: "Enter Time Benefits" },
                    { name: "cloud_benefits", label: "Cloud Benefits ('~' separated)", type: "textarea", placeholder: "Enter Cloud Benefits" },
                    { name: "growth_benefits", label: "Growth Benefits ('~' separated)", type: "textarea", placeholder: "Enter Growth Benefits" },
                    { name: "communication_benefits", label: "Communication Benefits ('~' separated)", type: "textarea", placeholder: "Enter Communication Benefits" },
                    { name: "logo", label: "Product Logo", type: "image", placeholder: "Upload image" },
                    { name: "image", label: "Product Image", type: "image", placeholder: "Upload image" },
                    { name: "status", label: "Status", type: "select", options: ["Active", "In-active"] },
                ];
            case "Solutions":
                return [
                    { name: "name", label: "Solution Name", type: "text", placeholder: "Enter Solution Name" },
                    { name: "title", label: "Solution Title", type: "text", placeholder: "Enter Solution Title" },
                    { name: "slug", label: "Solution Slug", type: "text", placeholder: "Enter Solution Slug" },
                    { name: "key_point", label: "Solution Keypoints ('~' separated)", type: "textarea", placeholder: "Enter Solution Keypoints" },
                    { name: "description", label: "Description", type: "textarea", placeholder: "Enter Description" },
                    { name: "main_logo", label: "Solution Main Logo", type: "image", placeholder: "Upload Image" },
                    { name: "sub_logo", label: "Solution Sub Logo", type: "image", placeholder: "Upload Image" },
                    { name: "status", label: "Status", type: "select", options: ["Active", "In-active"] },
                ];
            case "Careers":
                return [
                    { name: "title", label: "Job Title", type: "text", placeholder: "Enter Job Title" },
                    { name: "department", label: "Department", type: "text", placeholder: "Ex: Engineering" },
                    { name: "job_id", label: "Job ID", type: "text", placeholder: "Ex: J-101" },
                    { name: "type", label: "Job Type", type: "select", options: ["Full-time", "Part-time", "Contract"] },
                    { name: "location", label: "Location", type: "text", placeholder: "Ex: Remote, New York" },
                    { name: "slug", label: "Job Slug", type: "text", placeholder: "Enter Job Slug" },
                    { name: "description", label: "Description", type: "textarea", placeholder: "Enter Description" },
                    { name: "experience", label: "Experience ('~' separated)", type: "textarea", placeholder: "Enter Experience" },
                    { name: "skill", label: "Skills ('~' separated)", type: "textarea", placeholder: "Enter Skills" },
                    { name: "extra", label: "Additional Responsibilities ('~' separated)", type: "textarea", placeholder: "Enter Additional Responsibilities" },
                    { name: "status", label: "Status", type: "select", options: ["Active", "In-active"] },
                ];
            case "Applications":
                return [
                    { name: "applicant_name", label: "Applicant Name", type: "text", placeholder: "Enter Applicant Name" },
                    { name: "email", label: "Applicant Email", type: "text", placeholder: "Enter Applicant Email" },
                    { name: "phone", label: "Applicant Phone", type: "text", placeholder: "Enter Applicant Phone" },
                    { name: "resume", label: "Resume", type: "file", placeholder: "Upload Resume" },
                    { name: "status", label: "Status", type: "select", options: ["Active", "In-active"] },
                ];
            case "Teams":
                return [
                    { name: "name", label: "Member Name", type: "text", placeholder: "Enter Member Name" },
                    { name: "designation", label: "Role/Designation", type: "text", placeholder: "Ex: CEO, Developer" },
                    { name: "description", label: "Role Description", type: "textarea", placeholder: "Enter Role Description" },
                    { name: "email", label: "Email", type: "text", placeholder: "Enter Email Id" },
                    { name: "linkedin", label: "Linkedin", type: "text", placeholder: "Enter Linkedin Url" },
                    { name: "github", label: "Github", type: "text", placeholder: "Enter Github Url" },
                    { name: "image", label: "Profile Image", type: "image", placeholder: "Upload Image" },
                    { name: "designation_flag", label: "Designation Flag", type: "select", options: ["True", "False"] },
                    { name: "status", label: "Status", type: "select", options: ["Active", "In-active"] },
                ];
            case "Contacts":
                return [
                    { name: "name", label: "Name", type: "text", placeholder: "Enter Name" },
                    { name: "email", label: "Email", type: "text", placeholder: "Enter Email Id" },
                    { name: "phone", label: "Phone", type: "text", placeholder: "Enter Phone Number" },
                    { name: "title", label: "Title", type: "text", placeholder: "Enter Title" },
                    { name: "description", label: "Description", type: "textarea", placeholder: "Enter Description" },
                    { name: "status", label: "Status", type: "select", options: ["Active", "In-active"] },
                ];
            case "Enquiry":
                return [
                    { name: "name", label: "Name", type: "text", placeholder: "Enter Name" },
                    { name: "company", label: "Company", type: "text", placeholder: "Enter Company Name" },
                    { name: "email", label: "Email", type: "text", placeholder: "Enter Email Id" },
                    { name: "phone", label: "Phone", type: "text", placeholder: "Enter Phone Number" },
                    { name: "product_id", label: "Product", type: "select", placeholder: "Select product", options: productList },
                    { name: "object", label: "Object", type: "text", placeholder: "Enter Object" },
                    { name: "status", label: "Status", type: "select", options: ["Active", "In-active"] },
                ];
            default:
                return [];
        }
    };

    const handleModalOpen = (mode, item = null) => {
        setModalMode(mode);
        setSelectedItem(item);

        if (mode === 'edit' && item) {
            let initialData = { ...item };
            if (title === "Services") {
                initialData.short_description = item.description.short_description;
                initialData.long_description = item.description.long_description;
                initialData.short_description_title = item.description.short_description_title;
                initialData.long_description_title = item.description.long_description_title;
                initialData.service_item = item.service_item?.join('~');
            }

            if (title === "Products") {
                initialData.description = Array.isArray(item.description) ? item.description.join('~') : item.description || '';
                initialData.key_feature = item.key_feature?.join('~');
                initialData.time_benefits = item.benefit.time_benefits?.join('~');
                initialData.cloud_benefits = item.benefit.cloud_benefits?.join('~');
                initialData.growth_benefits = item.benefit.growth_benefits?.join('~');
                initialData.communication_benefits = item.benefit.communication_benefits?.join('~');
            }

            if (title === "Solutions") {
                initialData.key_point = item.key_point?.join('~');
            }

            if (title === "Teams") {
                initialData.email = item.social_link?.email;
                initialData.linkedin = item.social_link?.linkedin;
                initialData.github = item.social_link?.github;
                initialData.designation_flag = item.designation_flag === 1 || item.designation_flag === true ? "True" : "False";
            }

            if (title === "Careers") {
                initialData.experience = Array.isArray(item.requirements?.experience) ? item.requirements.experience.join('~') : item.requirements?.experience || '';
                initialData.skill = Array.isArray(item.requirements?.skill) ? item.requirements.skill.join('~') : item.requirements?.skill || '';
                initialData.extra = Array.isArray(item.requirements?.extra) ? item.requirements.extra.join('~') : item.requirements?.extra || '';
            }
            initialData.status = item.status === 1 || item.status === true ? "Active" : "Inactive";

            setFormData(initialData);
        } else if (mode === "view") {
            openApplicationModal(item, 'view');
        } else {
            setFormData({});
        }
        setIsModalOpen(true);
    };

    const openApplicationModal = (item) => {
        const initialData = { ...item };
        setIsApplicationModalOpen(true);
        if (title === "Applications") {
            initialData.linkedin = item.social_link?.linkedin;
            initialData.portfolio = item.social_link?.portfolio;
        }
        setFormData(initialData);
    };

    const handleApplicationModalClose = () => {
        setIsApplicationModalOpen(false);
        setFormData({});
        setSelectedItem(null);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setFormData({});
        setSelectedItem(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, [fieldName]: file }));
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e, fieldName) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setFormData(prev => ({ ...prev, [fieldName]: file }));
        }
    };

    const handleRemoveFile = (fieldName) => {
        setFormData(prev => {
            const newData = { ...prev };
            delete newData[fieldName];
            return newData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let dataToSave = { ...formData };

        // Structure data based on the section title
        if (title === "Services") {
            dataToSave = {
                ...formData,
                name: formData.title,
                service_item: formData.service_item?.split('~').map(s => s.trim()).filter(Boolean) || [],
                description: {
                    short_description: formData.short_description,
                    long_description: formData.long_description,
                    short_description_title: formData.short_description_title,
                    long_description_title: formData.long_description_title,
                }
            };
            // Remove flattened fields that are now nested
            ['short_description', 'status', 'short_description_title', 'long_description', 'long_description_title'].forEach(f => delete dataToSave[f]);
        }
        else if (title === "Products") {
            dataToSave = {
                ...formData,
                description: formData.description,
                key_feature: formData.key_feature?.split('~').map(s => s.trim()).filter(Boolean) || [],
                benefit: {
                    time_benefits: formData.time_benefits?.split('~').map(s => s.trim()).filter(Boolean) || [],
                    cloud_benefits: formData.cloud_benefits?.split('~').map(s => s.trim()).filter(Boolean) || [],
                    growth_benefits: formData.growth_benefits?.split('~').map(s => s.trim()).filter(Boolean) || [],
                    communication_benefits: formData.communication_benefits?.split('~').map(s => s.trim()).filter(Boolean) || [],
                }
            };
            ['time_benefits', 'status', 'cloud_benefits', 'growth_benefits', 'communication_benefits'].forEach(f => delete dataToSave[f]);
        }
        else if (title === "Solutions") {
            console.log(formData);
            dataToSave = {
                ...formData,
                name: formData.title,
                key_point: formData.key_point?.split('~').map(s => s.trim()).filter(Boolean) || [],
            };
            ['status'].forEach(f => delete dataToSave[f]);
        }
        else if (title === "Teams") {
            dataToSave = {
                ...formData,
                designation_flag: formData.designation_flag === "True" ? 1 : 0,
                social_link: {
                    email: formData.email,
                    linkedin: formData.linkedin,
                    github: formData.github,
                }
            };
            ['email', 'linkedin', 'github', 'status'].forEach(f => delete dataToSave[f]);
        }
        else if (title === "Careers") {
            dataToSave = {
                ...formData,
                name: formData.title,
                requirements: {
                    experience: formData.experience?.split('~').map(s => s.trim()).filter(Boolean) || [],
                    skill: formData.skill?.split('~').map(s => s.trim()).filter(Boolean) || [],
                    extra: formData.extra?.split('~').map(s => s.trim()).filter(Boolean) || [],
                }
            };
            ['experience', 'skill', 'extra', 'status'].forEach(f => delete dataToSave[f]);
        }
        console.log("Submitting:", modalMode, dataToSave, title);
        await handleSave(modalMode, dataToSave, title);
    };

    const getApiEndpoint = (mode, title) => {
        switch (title) {
            case 'Services':
                return mode === 'add' ? '/services/create' : '/services/update';
            case 'Products':
                return mode === 'add' ? '/products/create' : '/products/update';
            case 'Solutions':
                return mode === 'add' ? '/solutions/create' : '/solutions/update';
            case 'Teams':
                return mode === 'add' ? '/teams/create' : '/teams/update';
            case 'Careers':
                return mode === 'add' ? '/careers/create' : '/careers/update';
            case 'Subscribers':
                return mode === 'add' ? '/subscribers/create' : '/subscribers/update';
            case 'Feedbacks':
                return mode === 'add' ? '/feedbacks/create' : '/feedbacks/update';
            case 'FAQ':
                return mode === 'add' ? '/faq/create' : '/faq/update';
            case 'Chat':
                return mode === 'add' ? '/chat/create' : '/chat/update';
            case 'Contacts':
                return mode === 'add' ? '/contact/create' : '/contact/update';
            case 'Enquiry':
                return mode === 'add' ? '/enquire/create' : '/enquire/update';
            case 'Settings':
                return mode === 'add' ? '/settings/create' : '/settings/update';
            default:
                return '';
        }
    };

    const handleSave = async (mode, data, title) => {
        try {
            const apiEndpoint = getApiEndpoint(mode, title);
            const processedData = {};
            let result;

            Object.keys(data).forEach(key => {
                const value = data[key];
                if (value !== undefined && value !== null) {
                    if (value instanceof File) {
                        processedData[key] = value;
                    } else if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
                        processedData[key] = JSON.stringify(value);
                    } else {
                        processedData[key] = value;
                    }
                }
            });

            const hasFiles = Object.values(processedData).some(value => value instanceof File);
            if (hasFiles) {
                const submissionData = new FormData();
                Object.keys(processedData).forEach(key => {
                    submissionData.append(key, processedData[key]);
                });
                result = await cmsApi.post(apiEndpoint, submissionData);
            } else {
                result = await cmsApi.post(apiEndpoint, processedData);
            }

            if (result && (result.success !== false && !result.error)) {
                toast.success(`${title} ${mode === 'add' ? 'added' : 'updated'} successfully!`);
                handleModalClose();
                if (fetch) fetch();
            } else {
                toast.error(`Failed to save ${title}: ${result?.message || result?.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error(`Error saving ${title}:`, error);
            toast.error(error.message || `Failed to save ${title}`);
        }
    };

    const handleStatusToggle = async (item) => {
        try {
            const apiEndpoint = `/${title.toLowerCase()}/updateStatus`;
            const result = await cmsApi.post(apiEndpoint, { id: item.id, status: item.status ? false : true });

            if (result && (result.success !== false && !result.error)) {
                toast.success(`${title} status ${item.status === true ? 'deactivated' : 'activated'} successfully!`);
                if (fetch) fetch();
            }
        } catch (error) {
            console.error(`Status Update Error:`, error);
            toast.error(`Failed to update ${title} status`);
        }
    };

    const handleDelete = async (id) => {
        try {
            const apiEndpoint = `/${title.toLowerCase()}/delete`;
            const result = await cmsApi.post(apiEndpoint, { id: id });

            if (result && (result.success !== false && !result.error)) {
                toast.success(`${title} deleted successfully!`);
                if (fetch) fetch();
            }
        } catch (error) {
            console.error(`Delete Error:`, error);
            toast.error(`Failed to delete ${title}`);
        }
    }

    const handleApplicationStatusChange = async (item, status) => {
        try {
            const apiEndpoint = `/${title.toLowerCase()}/updateStatus`;
            const result = await cmsApi.post(apiEndpoint, { id: item.id, status: status });

            if (result && (result.success !== false && !result.error)) {
                toast.success(`${title} status ${status} successfully!`);
                if (fetch) fetch();
            }
        } catch (error) {
            console.error(`Application Status Update Error:`, error);
            toast.error(`Failed to update ${title} status`);
        }
    };

    return (
        <>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{title} Management</h1>
                        <p className="text-gray-500">View and manage your agency {title.toLowerCase()}</p>
                    </div>
                    <button
                        onClick={() => handleModalOpen('add')}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-all shadow-lg shadow-green-500/20">
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
                                            {
                                                title !== "FAQ" && title !== "Applications" && title !== "Chat" && title !== "Contacts" && title !== "Enquiry" && (
                                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">{title === "Subscribers" ? "Subscribers Email" : title === "Settings" ? "Key" : `${title} Name`}</th>
                                                )
                                            }
                                            {
                                                (title === "Products" || title === "Solutions" || title === "Services") && (
                                                    <>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Description</th>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Image</th>
                                                    </>
                                                )
                                            }
                                            {
                                                title === "Careers" && (
                                                    <>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Job ID</th>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Job Type</th>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Department</th>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Location</th>
                                                    </>
                                                )
                                            }
                                            {
                                                title === "Teams" && (
                                                    <>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Role</th>
                                                        <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Image</th>
                                                    </>
                                                )
                                            }
                                            {
                                                title === "Feedbacks" && (
                                                    <>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Content</th>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Rating</th>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Location</th>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Image</th>
                                                    </>
                                                )
                                            }
                                            {
                                                title === "Settings" && (
                                                    <>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Value</th>
                                                    </>
                                                )
                                            }
                                            {
                                                title === "FAQ" && (
                                                    <>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Product Name</th>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Question</th>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Answer</th>
                                                    </>
                                                )
                                            }
                                            {
                                                title === "Chat" && (
                                                    <>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Question</th>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Answer</th>
                                                    </>
                                                )
                                            }
                                            {
                                                title === "Applications" && (
                                                    <>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Job ID</th>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Department</th>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Applicant Name</th>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Applicant Email</th>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Applicant Phone</th>
                                                    </>
                                                )
                                            }
                                            {
                                                title === "Contacts" && (
                                                    <>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Name</th>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Email</th>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Phone</th>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Subject</th>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Message</th>
                                                    </>
                                                )
                                            }
                                            {
                                                title === "Enquiry" && (
                                                    <>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Name</th>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Company Name</th>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Email</th>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Phone</th>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Product</th>
                                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Object</th>
                                                    </>
                                                )
                                            }
                                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
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
                                                {
                                                    title !== "FAQ" && title !== "Applications" && title !== "Chat" && title !== "Enquiry" && title !== "Contacts" && (
                                                        <td className="px-6 py-4">
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">{item.product_name || item.title || item.email || item.name || item.key}</div>
                                                            </div>
                                                        </td>
                                                    )
                                                }
                                                {
                                                    (title === "Products" || title === "Solutions" || title === "Services") && (
                                                        <>
                                                            <td className="px-6 py-4">
                                                                <span className="py-1 text-xs font-medium">
                                                                    {title === "Services" ? item.description?.short_description : item.description.split("~")[0]}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className="py-1 text-xs font-medium">
                                                                    <Image src={`${settings?.backend_api_url}/${title === "Products" ? item.image : item.main_logo}`} alt={title} className="w-30 mx-auto" width={100} height={100} />
                                                                </span>
                                                            </td>
                                                        </>
                                                    )
                                                }
                                                {
                                                    title === "Careers" && (
                                                        <>
                                                            <td className="px-6 py-4">
                                                                <span className="px-2 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-full">
                                                                    {item.job_id}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className="px-2 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-full">
                                                                    {item.type}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className="px-2 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-full">
                                                                    {item.department}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className="px-2 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-full">
                                                                    {item.location}
                                                                </span>
                                                            </td>
                                                        </>
                                                    )
                                                }
                                                {
                                                    title === "Teams" && (
                                                        <>
                                                            <td className="px-6 py-4">
                                                                <span className="px-2 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-full">
                                                                    {item.designation}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className="px-2 py-1">
                                                                    <Image src={`${settings?.backend_api_url}/${item.image}`} alt={`${item.name}`} className="w-10 mx-auto rounded-full" width={100} height={100} />
                                                                </span>
                                                            </td>
                                                        </>
                                                    )
                                                }
                                                {
                                                    title === "Feedbacks" && (
                                                        <>
                                                            <td className="px-6 py-4">
                                                                <span className="px-2 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-full">
                                                                    {item.content}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className="px-2 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-full">
                                                                    {item.rating}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className="px-2 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-full">
                                                                    {item.location}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className="px-2 py-1">
                                                                    <Image src={`${settings?.backend_api_url}/${item.image}`} alt="feedback image" className="w-10 mx-auto rounded-full" width={100} height={100} />
                                                                </span>
                                                            </td>
                                                        </>
                                                    )
                                                }
                                                {
                                                    title === "Settings" && (
                                                        <>
                                                            <td className="px-6 py-4">
                                                                {item.value}
                                                            </td>
                                                        </>
                                                    )
                                                }
                                                {
                                                    title === "FAQ" && (
                                                        <>
                                                            <td className="px-6 py-4">
                                                                {item.product_name}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {item.question}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {item.answer}
                                                            </td>
                                                        </>
                                                    )
                                                }
                                                {
                                                    title === "Chat" && (
                                                        <>
                                                            <td className="px-6 py-4">
                                                                {item.question}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {item.answer}
                                                            </td>
                                                        </>
                                                    )
                                                }
                                                {
                                                    title === "Enquiry" && (
                                                        <>
                                                            <td className="px-6 py-4">
                                                                {item.name}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {item.company}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {item.email}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {item.phone}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {item.product_name}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {item.object}
                                                            </td>
                                                        </>
                                                    )
                                                }
                                                {
                                                    title === "Contacts" && (
                                                        <>
                                                            <td className="px-6 py-4">
                                                                {item.name}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {item.email}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {item.phone}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {item.title || item.subject}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {item.description || item.message}
                                                            </td>
                                                        </>
                                                    )
                                                }
                                                {
                                                    title === "Applications" && (
                                                        <>
                                                            <td className="px-6 py-4">
                                                                {item.job_id}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {item.designation}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {item.applicant_name}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {item.email}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {item.phone}
                                                            </td>
                                                        </>
                                                    )
                                                }
                                                {
                                                    title === "Applications" ? (
                                                        <td className="px-6 py-4">
                                                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md" onChange={(e) => handleApplicationStatusChange(item, e.target.value)} value={item.status}>
                                                                <option value="">Select</option>
                                                                <option value="pending" selected={item.status === "pending"}>Pending</option>
                                                                <option value="approved" selected={item.status === "approved"}>Approved</option>
                                                                <option value="schedule" selected={item.status === "schedule"}>Schedule</option>
                                                                <option value="on_hold" selected={item.status === "on_hold"}>On Hold</option>
                                                                <option value="rejected" selected={item.status === "rejected"}>Rejected</option>
                                                            </select>
                                                        </td>
                                                    ) : (
                                                        <td className="px-6 py-4">
                                                            <button
                                                                onClick={() => handleStatusToggle(item)}
                                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${item.status ? 'bg-green-500' : 'bg-gray-200'
                                                                    }`}
                                                            >
                                                                <motion.span
                                                                    layout
                                                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${item.status ? 'translate-x-6' : 'translate-x-1'
                                                                        }`}
                                                                />
                                                            </button>
                                                        </td>
                                                    )
                                                }
                                                {
                                                    title === "Applications" ? (
                                                        <td className="px-6 py-4">
                                                            <div className="">
                                                                <button onClick={() => openApplicationModal(item)} className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-all">
                                                                    <Eye size={16} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    ) : (
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="flex justify-end gap-2">
                                                                <button
                                                                    onClick={() => handleModalOpen('edit', item)}
                                                                    className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-all">
                                                                    <Edit size={16} />
                                                                </button>
                                                                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" onClick={() => handleDelete(item.id)}>
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    )
                                                }
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
                                                    className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${currentPage === pageNum
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

            {/* Modal for Add/Edit using the shared Modal component */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                title={`${modalMode === 'add' ? 'Add New' : 'Edit'} ${title.slice(0, -1)}`} // Remove 's' from title for singular
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    {getFormFields(title).map((field) => (

                        <div key={field.name} className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">
                                {field.label}
                            </label>

                            {field.type === 'textarea' ? (
                                <textarea
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleInputChange}
                                    placeholder={field.placeholder}
                                    className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 min-h-[100px]"
                                />
                            ) : field.type === 'select' ? (
                                <div className="relative">
                                    <select
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 appearance-none pr-10"
                                    >
                                        <option value="">Select {field.label}</option>
                                        {field.options && field.options.map((opt) => (
                                            <option key={typeof opt === 'object' ? opt.id : opt} value={typeof opt === 'object' ? opt.id : opt}>
                                                {typeof opt === 'object' ? opt.name : opt}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            ) : field.type === 'image' ? (
                                <div className="space-y-2">
                                    <label
                                        htmlFor={`file-${field.name}`}
                                        className="block"
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={(e) => handleDrop(e, field.name)}
                                    >
                                        <input
                                            id={`file-${field.name}`}
                                            type="file"
                                            onChange={(e) => handleFileChange(e, field.name)}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                        <div className={`flex items-center justify-center w-full px-6 py-8 border-2 border-dashed rounded-xl cursor-pointer transition-all group ${isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:bg-gray-50 hover:border-green-400'
                                            }`}>
                                            <div className="space-y-2 text-center w-full">
                                                <div className={`mx-auto w-10 h-10 mb-2 flex items-center justify-center rounded-full transition-colors ${isDragging ? 'bg-green-100 text-green-600' : 'bg-gray-50 text-gray-400 group-hover:bg-green-50 group-hover:text-green-500'
                                                    }`}>
                                                    <Plus size={20} />
                                                </div>
                                                <div className="text-sm text-gray-600 px-4">
                                                    {formData[field.name] ? (
                                                        <div className="flex items-center justify-center gap-2">
                                                            <span className="font-semibold text-green-600 truncate max-w-[200px]">
                                                                {formData[field.name] instanceof File ? formData[field.name].name : formData[field.name].split('/').pop()}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    handleRemoveFile(field.name);
                                                                }}
                                                                className="p-1 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                                                                title="Remove image"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="font-medium">Upload Image / Drag and Drop</span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-400">SVG, PNG, JPG or WEBP</p>
                                            </div>
                                        </div>
                                    </label>

                                    {/* Preview if image exists */}
                                    {formData[field.name] && (
                                        <div className="relative group w-24 h-24 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                                            <Image
                                                src={formData[field.name] instanceof File ? URL.createObjectURL(formData[field.name]) : (formData[field.name].startsWith('http') ? formData[field.name] : `${settings?.backend_api_url}/${formData[field.name]}`)}
                                                alt="Preview"
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveFile(field.name)}
                                                    className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                                    title="Remove image"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleInputChange}
                                    placeholder={field.placeholder}
                                    className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                                />
                            )}
                        </div>
                    ))}

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={handleModalClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            <Save size={16} />
                            Save Changes
                        </button>
                    </div>
                </form>

            </Modal>

            <ApplicationModal
                isOpen={isApplicationModalOpen}
                onClose={handleApplicationModalClose}
                title="Application Details"
            >
                <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="grid grid-cols-[140px_1fr] gap-4 border-b border-gray-100 py-3">
                                <th className="text-sm font-semibold text-gray-500 text-left">Field</th>
                                <th className="text-sm font-semibold text-gray-900 text-left">Value</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {[
                                { label: 'Name', value: formData.applicant_name },
                                { label: 'Email', value: formData.email },
                                { label: 'Phone', value: formData.phone },
                                { label: 'Position', value: formData.designation },
                                { label: 'Cover Letter', value: formData.cover_letter },
                                { label: 'Social Links', value: `${formData.linkedin || ''}${formData.linkedin && formData.portfolio ? ', ' : ''}${formData.portfolio || ''}` },
                                { label: 'Resume', value: <a href={`${settings?.backend_api_url}/${formData.resume}`} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline font-medium">Download Resume</a> },
                                { label: 'Status', value: <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">{formData.status}</span> },
                            ].map((row, idx) => (
                                <tr key={idx} className="grid grid-cols-[140px_1fr] gap-4 py-4 items-start">
                                    <td className="text-sm font-medium text-gray-500">{row.label}</td>
                                    <td className="text-sm font-semibold text-gray-900 leading-relaxed whitespace-pre-wrap break-words">{row.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Application details will be displayed here */}
            </ApplicationModal>
        </>
    )
}