import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { validateAndFetchGST } from './helpers.js';

const NewUserForm = ({ control, errors, serviceOptions,setGstInf, isLoading, onSubmit, watch, setValue }) => {
    const [gstError, setGstError] = useState(null);
    const watchGST = watch('gst');

    const handleGSTValidation = async () => {
        try {
            setGstError(null);
            if (watchGST) {
                await validateAndFetchGST(watchGST, setValue,setGstInf);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="gst">GST Number</Label>
                    <Controller
                        name="gst"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Input
                                {...field}
                                required={false}
                                placeholder="GST Number"
                                onBlur={handleGSTValidation}
                            />
                        )}
                    />
                    {errors.gst && <p className="text-red-500 text-sm">{errors.gst.message}</p>}
                    {gstError && <p className="text-red-500 text-sm">{gstError}</p>}
                </div>
                <div>
                    <Label htmlFor="agencyName">Agency Name</Label>
                    <Controller
                        name="agencyName"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Input id="agencyName" {...field} placeholder="Enter agency name" />
                        )}
                    />
                    {errors.agencyName && <p className="text-red-500 text-sm">{errors.agencyName.message}</p>}
                </div>
               
                <div>
                    <Label htmlFor="ownerName">Owner Name</Label>
                    <Controller
                        name="ownerName"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Input id="ownerName" {...field} placeholder="Enter owner name" />
                        )}
                    />
                    {errors.ownerName && <p className="text-red-500 text-sm">{errors.ownerName.message}</p>}
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Input id="email" type="email" {...field} placeholder="Enter email address" />
                        )}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Controller
                        name="phone"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Input id="phone" type="tel" {...field} placeholder="Enter phone number" />
                        )}
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                </div>
                <div>
                    <Label htmlFor="agencyMobile">Agency Mobile No</Label>
                    <Controller
                        name="agencyMobile"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Input id="agencyMobile" type="tel" {...field} placeholder="Enter agency mobile number" />
                        )}
                    />
                    {errors.agencyMobile && <p className="text-red-500 text-sm">{errors.agencyMobile.message}</p>}
                </div>
            </div>
            <div>
                <Label htmlFor="employees">Number Of Employees</Label>
                <Controller
                    name="employees"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Input id="employees" type="number" {...field} placeholder="Enter number of employees" />
                    )}
                />
                {errors.employees && <p className="text-red-500 text-sm">{errors.employees.message}</p>}
            </div>
            <div>
                <Label>Services</Label>
                <Controller
                    name="services"
                    control={control}
                    render={({ field: { value = [], onChange } }) => (
                        <div className="grid grid-cols-7 gap-1">
                            {serviceOptions.map((service) => (
                                <div key={service} className="flex items-center">
                                    <Checkbox
                                        checked={value.includes(service)}
                                        onCheckedChange={(checked) => {
                                            const newValue = checked
                                                ? [...value, service]
                                                : value.filter(v => v !== service);
                                            onChange(newValue);
                                        }}
                                    />
                                    <Label className="ml-2">{service}</Label>
                                </div>
                            ))}
                        </div>
                    )}
                />
                {errors.services && <p className="text-red-500 text-sm">{errors.services.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Pay Now'}
            </Button>
        </form>
    );
};

export default NewUserForm;

