'use client';

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from "react";
import { CityServices } from "@/services";
import { City } from "@/lib/models";

const CreateCity = () => {
    const [cityName, setCityName] = useState<string>('');
    const [descriptionCity, setDescriptionCity] = useState<string>('');
    const [activeCity, setActiveCity] = useState<boolean>(true);
    const [isDialogOpen, setIDialogOpen] = useState<boolean>();

    const handleCityName = (newCityName: any) => {
        setCityName(newCityName.target.value);
    }

    const handleDescriptionCity = (newDescriptionCity: any) => {
        setDescriptionCity(newDescriptionCity.target.value);
    }

    const handleActiveCity = (isActive: boolean) => {
        setActiveCity(isActive);
    }

    const openDialog = () => setIDialogOpen(true);

    const closeDialog = () => setIDialogOpen(false);

    const saveCity = async () => {
        const cityService = new CityServices();
        const newCity: City = {
            name: cityName,
            description: descriptionCity,
            active: activeCity
        }
        await cityService.save(newCity);

        closeDialog();
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIDialogOpen}>
            <DialogTrigger asChild>
                <Button onClick={openDialog} variant="outline">Add City</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add new city</DialogTitle>
                    <DialogDescription>
                        Create a new City
                    </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            placeholder="City name"
                            className="col-span-3"
                            value={cityName}
                            onChange={handleCityName}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Description
                        </Label>
                        <Input
                            id="username"
                            placeholder="Description of the city"
                            className="col-span-3"
                            value={descriptionCity}
                            onChange={handleDescriptionCity}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Active
                        </Label>
                        <Checkbox checked={activeCity} onCheckedChange={handleActiveCity} />
                    </div>
                </form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={closeDialog} variant="destructive" aria-label="Close">
                            Close
                        </Button>
                    </DialogClose>
                    <Button onClick={saveCity}>Add city</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateCity;