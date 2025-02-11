import React from 'react';
import { User, Building2, CreditCard, Minus, Plus, Users } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ExistingUserForm = ({ checkExistingUser, agencyDetails, additionalLicenses, setAdditionalLicenses, onSubmit, isLoading }) => {
    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="existingEmail">Email</Label>
                <Input
                    type="email"
                    id="existingEmail"
                    placeholder="Enter your email"
                    onBlur={(e) => checkExistingUser(e.target.value)}
                />
            </div>
            {agencyDetails && (
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Building2 className="h-5 w-5 text-primary" />
                                <span className="font-bold">Agency Name:</span>
                                <span>{agencyDetails.agencyName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <User className="h-5 w-5 text-primary" />
                                <span className="font-bold">Owner Name:</span>
                                <span>{agencyDetails.ownerName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CreditCard className="h-5 w-5 text-primary" />
                                <span className="font-bold">Active Plan:</span>
                                <span>{agencyDetails.hasActivePlan ? 'Yes' : 'No'}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Users className="h-5 w-5 text-primary" />
                                <span className="font-bold">Additional Licenses:</span>
                                <Button
                                    onClick={() => setAdditionalLicenses(prev => Math.max(0, prev - 1))}
                                    aria-label="Decrease additional licenses"
                                    variant="outline"
                                    size="icon"
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="mx-2">{additionalLicenses}</span>
                                <Button
                                    onClick={() => setAdditionalLicenses(prev => prev + 1)}
                                    aria-label="Increase additional licenses"
                                    variant="outline"
                                    size="icon"
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
            <Button onClick={onSubmit} className="w-full" disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Pay Now'}
            </Button>
        </div>
    );
};

export default ExistingUserForm;
