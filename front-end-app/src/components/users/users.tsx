"use client";

import { FC, useCallback, useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui";
import { Users as UsersModel } from "@models";
import { Plus } from "lucide-react";
import { UsersService } from "@services";
import CreateUser from "./createUser";

const Users: FC = () => {
  const [isUserDialogOpen, setIsUserDialogOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<UsersModel[]>([]);

  const toggleUserDialog = async (isOpen: boolean) => {
    setIsUserDialogOpen(isOpen);
  };

  const getAllUsers = useCallback(async () => {
    const userService = new UsersService();
    const getUsers = await userService.getAllUsers();
    setUsers(getUsers);
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <div>
      <div className="flex justify-start justify-between items-center gap-5 mb-2">
        <h1>Here, you will see all the information of the current Users</h1>
        <Button onClick={() => toggleUserDialog(true)} variant="outline">
          <Plus className="mr-2 h-6 w-6" /> Add User
        </Button>
      </div>
      {isUserDialogOpen && (
        <CreateUser
          isOpen={isUserDialogOpen}
          toggleDialog={setIsUserDialogOpen}
        />
      )}
      <Table>
        <TableCaption>List of Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Last name</TableHead>
            <TableHead>City</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.city.name}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8 text-muted-foreground"
              >
                No users to display
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;
