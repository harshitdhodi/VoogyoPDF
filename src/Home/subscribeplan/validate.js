import * as z from 'zod';

export const registrationSchema = z.object({

  // Agency Details
  agencyName: z.string()
    .min(3, { message: "Agency name must be at least 3 characters" })
    .max(100, { message: "Agency name cannot exceed 100 characters" }),
  
  // Owner Details
  ownerName: z.string()
    .min(2, { message: "Owner name must be at least 2 characters" })
    .max(50, { message: "Owner name cannot exceed 50 characters" })
    .regex(/^[A-Za-z\s]+$/, { message: "Owner name can only contain letters" }),
  
  // Contact Information
  email: z.string()
    .email({ message: "Invalid email address" })
    .max(100, { message: "Email cannot exceed 100 characters" }),
  
  phone: z.string()
    .regex(/^[6-9]\d{9}$/, { message: "Invalid Indian mobile number" }),
  
  agencyMobile: z.string()
    .regex(/^[6-9]\d{9}$/, { message: "Invalid Agency mobile number" }),
  
//   Business Details
  employees: z.string()
    .min(1, { message: "Number of employees must be at least 1" })
    .max(1000, { message: "Number of employees cannot exceed 1000" }),
        
  // Services
  services: z.array(z.string())
    .min(1, { message: "Select at least one service" }),
  
  // Payment Details
//   planId: z.string(),
//   additionalLicenses: z.number().min(0)
});

