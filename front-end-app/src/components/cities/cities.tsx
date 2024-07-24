"use client";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ModeToggle } from "@/components/ui/toggleDarkMode";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { RefreshCw } from "lucide-react";

type CitiesProps = {
    name: string;
    description: string;
    active: boolean;
}

const Cities = () => {
    const [citiesValues, setCitiesValues] = useState<CitiesProps[]>([]);

    const getCities = async () => {
        const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL_BE;
        const response = await fetch(`${domainURL}/cities`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setCitiesValues(data);
    }

    return (
        <div>
            <h1>Here, you will see all the information of the current Cities</h1>
            <ModeToggle />
            <Button variant="default" onClick={getCities} >
                <RefreshCw className="mr-2 h-4 w-4" /> Refresh
            </Button>
            <Table>
                <TableCaption>List of Cities</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Active</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {citiesValues?.map((citie, index) => (
                        <TableRow key={index} >
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{citie.name}</TableCell>
                            <TableCell>{citie.description}</TableCell>
                            <TableCell>
                                <Checkbox checked={citie.active} disabled />
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm">
                                        Edit
                                    </Button>
                                    <Button variant="destructive" size="sm">
                                        Delete
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    )
};

export default Cities;