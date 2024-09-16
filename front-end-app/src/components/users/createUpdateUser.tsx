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
  toggleDialog: (isOpen: boolean) => Promise<void>;
  updateUser?: Users;
}

const CreateUpdateUser: FC<CreateUserProps> = ({
  isOpen,
  toggleDialog,
  updateUser = null,
}) => {
  const [user, setUser] = useState<Users>(updateUser);
  const [birthDate, setBirthDate] = useState<Date>(
    updateUser ? updateUser.birthDate : null
  );
  const [cities, setCities] = useState<City[]>([]);
  const [comboboxValues, setComboboxValues] = useState([]);
  const [selectedCity, setSelectedCity] = useState<string>(
    updateUser ? `${updateUser.city.id}` : null
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const createUser = useCallback(async () => {
    const userService = new UsersService();
    const currentCity = cities.find(({ id }) => `${id}` === selectedCity);
    console.log(["birthDate", birthDate, format(birthDate, "yyyy-MM-dd")]);
    if (updateUser) {
      const userValues = new Users({
        id: user?.id,
        username: user?.username,
        name: user?.name,
        lastName: user?.lastName,
        birthDate: format(birthDate, "yyyy-MM-dd"),
        cityId: Number(currentCity.id),
      });
      await userService.update(userValues);
    } else {
      const userValues = new Users({
        username: user?.username,
        name: user?.name,
        lastName: user?.lastName,
        birthDate: format(birthDate, "yyyy-MM-dd"),
        cityId: Number(currentCity.id),
      });
      await userService.save(userValues);
    }

    await toggleDialog(false);
  }, [
    birthDate,
    cities,
    selectedCity,
    toggleDialog,
    updateUser,
    user?.id,
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
              setSelectedCity={setSelectedCity}
              defaultValue={selectedCity}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose>
            <Button type="submit" onClick={createUser}>
              {updateUser ? "Update user" : "Create user"}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CreateUpdateUser;
