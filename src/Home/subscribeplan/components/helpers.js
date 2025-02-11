import * as z from 'zod';
import axios from 'axios';

// GST Number validation schema using Zod (now optional)
export const gstSchema = z.object({


    agencyName: z.string()
        .min(1, { message: "Agency Name is required" })
        .max(100, { message: "Agency Name cannot exceed 100 characters" }),
    ownerName: z.string()
        .min(1, { message: "Owner Name is required" })
        .max(100, { message: "Owner Name cannot exceed 100 characters" }),
    email: z.string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
    phone: z.string()
        .regex(/^[0-9]{10}$/, { message: "Phone number must be 10 digits" }),
    agencyMobile: z.string()
        .regex(/^[0-9]{10}$/, { message: "Agency Mobile number must be 10 digits" }),
    employees: z.string()
        .refine(val => !isNaN(parseInt(val)), { message: "Number of employees must be a number" })
        .transform(val => parseInt(val)),
    services: z.array(z.string()).min(1, { message: "Select at least one service" }),
    gst:z.optional(),
    gstInfo: z.optional()
});

// Fetch and validate GST information
export const validateAndFetchGST = async (gstNumber, setValue,setGstInf) => {
    try {
        // If no GST number, return early
        if (!gstNumber) return null;

        // Validate GST format
        const gstValidation = z.string()
            .regex(
                /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 
                { message: "Invalid GST Number format" }
            )
            .parse(gstNumber);

        // Fetch GST information
        const response = await axios.get(`/api/gst/${gstNumber}`);
        const gstData = response.data?.data || response.data;
        setGstInf(gstData);
        // Set form values if data is available
        if (gstData) {
            // Set GST-related form fields
            setValue('gstInfo', gstData);
            

            // Optionally pre-fill agency and owner names if not already set
            setValue('agencyName', gstData.tradeNam || gstData.tradeName || '', { 
                shouldValidate: true 
            });
            setValue('ownerName', gstData.lgnm || gstData.legalName || '', { 
                shouldValidate: true 
            });

            return gstData;
        }
    } catch (error) {
        // Handle various error scenarios
        if (error instanceof z.ZodError) {
            // Zod validation error
            throw new Error(error.errors[0].message);
        } else if (error.response) {
            // API response error
            console.warn('Unable to fetch GST details. Please check the GST number.');
            return null;
        } else {
            // Network or other errors
            console.warn('An error occurred while validating GST number');
            return null;
        }
    }
};