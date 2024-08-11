"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ModeToggle } from "@/components/ui/toggleDarkMode";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";
import CreateCity from "./createCity";
import { City } from "@/lib/models";
import { CityServices } from "@/services";
import UpdateCity from "./updatecity";

const Cities = () => {
  const [citiesValues, setCitiesValues] = useState<City[]>([]);
  const [isUpdateCityDialogOpen, setIsUpdateCityDialogOpen] =
    useState<boolean>(false);
  const [isCreateCityDialogOpen, setIsCreateCityDialogOpen] =
    useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<City>(null);
  const cityService = new CityServices();

  const getCities = async () => {
    const allCities = await cityService.getAllCities();
    setCitiesValues(allCities);
  };

  const handleDelete = async (cityId: string) => {
    await cityService.delete(cityId);
    await getCities();
  };

  const toggleCreateDialog = async (openClose: boolean) => {
    setIsCreateCityDialogOpen(openClose);
    if (!openClose) {
      await getCities();
    }
  };

  const toggleUpdateDialog = async (openClose: boolean) => {
    setIsUpdateCityDialogOpen(openClose);
    if (!openClose) {
      await getCities();
    }
  };

  const handleUpdate = async (city: City) => {
    setSelectedCity(city);
    await toggleUpdateDialog(true);
  };

  return (
    <div>
      <h1>Here, you will see all the information of the current Cities</h1>
      <div className="flex justify-start gap-5">
        <ModeToggle />
        <Button variant="default" onClick={getCities}>
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh
        </Button>
        <Button onClick={() => toggleCreateDialog(true)} variant="outline">
          <Plus className="mr-2 h-6 w-6" /> Add City
        </Button>
      </div>
      {isCreateCityDialogOpen && (
        <CreateCity
          isDialogOpen={isCreateCityDialogOpen}
          toggleDialog={toggleCreateDialog}
        />
      )}
      {isUpdateCityDialogOpen && (
        <UpdateCity
          cityData={selectedCity}
          isDialogOpen={isUpdateCityDialogOpen}
          toggleDialog={toggleUpdateDialog}
        />
      )}
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
          {citiesValues.length > 0 ? (
            citiesValues.map((city, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{city.name}</TableCell>
                <TableCell>{city.description}</TableCell>
                <TableCell>
                  <Checkbox checked={city.active} disabled />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => handleUpdate(city)}
                      variant="outline"
                      size="sm"
                    >
                      <Pencil className="mr-2 h-4 w-4" /> Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(city.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8 text-muted-foreground"
              >
                No cities to display
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Cities;
