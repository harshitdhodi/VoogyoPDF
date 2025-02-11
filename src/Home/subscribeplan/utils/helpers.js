import axios from 'axios';
import { toast } from 'react-toastify';

export const BASE_URL = '/api/v1';

export const validateAndFetchGST = async (gstNumber, setValue) => {
    if (gstNumber && gstNumber.length === 15) {
        try {
            const response = await axios.get(`/api/gst/${gstNumber}`);
            const gstData = response.data.data;
            setValue('data',gstData)
            setValue('agencyName', gstData.tradeNam || '');
            setValue('ownerName', gstData.lgnm || '');
            toast.success('GST details fetched successfully');
        } catch (error) {
            toast.error('Invalid GST Number');
        }
    }
};

export const checkExistingUser = async (email) => {
    try {
        const response = await axios.get(`${BASE_URL}/check-email?email=${email}`);
        if (response.data.success) {
            return response.data.agencyDetails;
        }
    } catch (error) {
        toast.error("Email not found");
    }
    return null;
};

export const calculateTotalPrice = (plan, isNewUser, hasActivePlan, additionalLicenses) => {
    if (!plan) return { basePrice: 0, additionalLicensePrice: 0, subtotal: 0, gst: 0, total: 0 };

    const basePrice = isNewUser ? plan.price : (hasActivePlan ? 0 : plan.price);
    const additionalLicensePrice = additionalLicenses * 999;
    const subtotal = basePrice + additionalLicensePrice;
    const gst = subtotal * 0.18;
    const total = subtotal + gst;

    return { basePrice, additionalLicensePrice, subtotal, gst, total };
};

