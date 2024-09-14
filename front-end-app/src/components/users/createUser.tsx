"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { City, Users } from "@models";
import {
  Button,
  Combobox,
  DatePiker,
  Input,
  Label,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@ui";
import { CityServices, UsersService } from "@services";
import { format } from "date-fns";

interface CreateUserProps {
  isOpen: boolean;
  toggleDialog: (isOpen: boolean) => void;
}

const CreateUser: FC<CreateUserProps> = ({ isOpen, toggleDialog }) => {
  const [user, setUser] = useState<Users>();
  const [birthDate, setBirthDate] = useState<Date>();
  const [cities, setCities] = useState<City[]>([]);
  const [comboboxValues, setComboboxValues] = useState([]);
  const [selectedCity, setSelectedCity] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const createNewUser = useCallback(async () => {
    const userService = new UsersService();
    const currentCity = cities.find(({ id }) => `${id}` === selectedCity);
    const newUserValues = new Users({
      username: user?.username,
      name: user?.name,
      lastName: user?.lastName,
      birthDate: format(birthDate, 'yyyy-MM-dd'),
      cityId: Number(currentCity.id),
    });
    userService.save(newUserValues);
  }, [
    birthDate,
    cities,
    selectedCity,
    user?.lastName,
    user?.name,
    user?.username,
  ]);

  const createInputValue = (
    htmlName: string,
    labelName: string,
    valueInput: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  ) => (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={htmlName} className="text-right">
        {labelName}
      </Label>
      <Input
        type="text"
        name={htmlName}
        placeholder={labelName}
        value={valueInput || ""}
        className="col-span-3"
        onChange={onChange}
      />
    </div>
  );

  const getCities = useCallback(async () => {
    const cityService = new CityServices();
    const allCities = await cityService.getAllCities();
    const activeCities = allCities.filter((city) => city.active);
    const cbValues = activeCities.map(({ id, name }) => ({
      value: `${id}`,
      label: name,
    }));
    setComboboxValues(cbValues);
    setCities(allCities);
  }, []);

  useEffect(() => {
    getCities();
  }, [getCities]);

  return (
    <Sheet open={isOpen} onOpenChange={toggleDialog}>
      <SheetContent className="w-1/2">
        <SheetHeader>
          <SheetTitle>{`Let's create a new users!!!`}</SheetTitle>
          <SheetDescription>
            Here, you are going to enter the values for the new users!!!
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {createInputValue(
            "username",
            "Username",
            user?.username,
            handleChange
          )}
          {createInputValue("name", "Name", user?.name, handleChange)}
          {createInputValue(
            "lastName",
            "Last name",
            user?.lastName,
            handleChange
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <DatePiker
              labelInput="Birth date"
              nameHtml="birthDate"
              date={birthDate}
              setDate={setBirthDate}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="city" className="text-right">
              City
            </Label>
            <Combobox
              listValues={comboboxValues}
              selectedValue={setSelectedCity}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose>
            <Button type="submit" onClick={createNewUser}>
              Create user
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CreateUser;
