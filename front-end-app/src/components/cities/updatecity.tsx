import { City } from "@/lib/models";
import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CityServices } from "@/services";

interface UpdateCityProps {
  cityData: City;
  isDialogOpen: boolean;
  toggleDialog: (isOpen: boolean) => Promise<void>;
}

const UpdateCity: FC<UpdateCityProps> = ({
  cityData,
  isDialogOpen,
  toggleDialog,
}) => {
  const [descriptionCity, setDescriptionCity] = useState<string>(
    cityData.description
  );
  const [activeCity, setActiveCity] = useState<boolean>(cityData.active);

  const handleDialogClose = async () => {
    await toggleDialog(false);
  };

  const handleDescriptionCity = (updDescriptionCity: any) => {
    setDescriptionCity(updDescriptionCity.target.value);
  };

  const handleActiveCity = (isActive: boolean) => {
    setActiveCity(isActive);
  };

  const updateCity = async () => {
    const cityService = new CityServices();
    const updateCityValues: City = {
      id: cityData.id,
      name: cityData.name,
      description: descriptionCity,
      active: activeCity,
    };
    await cityService.update(updateCityValues);
    handleDialogClose();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update city: {cityData.name}</DialogTitle>
          <DialogDescription>Update the values of the city</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              placeholder="Description of the city"
              className="col-span-3"
              value={descriptionCity}
              onChange={handleDescriptionCity}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="activeCity" className="text-right">
              Active
            </Label>
            <Checkbox
              id="activeCity"
              checked={activeCity}
              onCheckedChange={handleActiveCity}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="destructive"
            aria-label="Close"
            onClick={handleDialogClose}
          >
            Close
          </Button>
          <Button onClick={updateCity}>Update city</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCity;
