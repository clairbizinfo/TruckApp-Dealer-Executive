import axiosInstance from "../axiosInstance/axiosInstance";

export const getManufacturersWithModels = async () => {
    const res = await axiosInstance.get('/executive/manufacturer');
    return res.data;
};

export const submitEnquiry = async (payload: any) => {
    const res = await axiosInstance.post('/executive/enquiry', payload);
    return res.data;
};

export const getAllEnquiries = async () => {
    const res = await axiosInstance.get('/executive/enquiry');
    return res.data;
};