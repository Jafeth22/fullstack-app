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
import { Pencil, Plus, Trash2 } from "lucide-react";
import { UsersService } from "@services";
import CreateUpdateUser from "./createUpdateUser";

const Users: FC = () => {
  const [isUserDialogOpen, setIsUserDialogOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<UsersModel[]>([]);
  const [selectedUser, setSelectedUser] = useState<UsersModel>(null);

  const getAllUsers = useCallback(async () => {
    const userService = new UsersService();
    const getUsers = await userService.getAllUsers();
    setUsers(getUsers);
  }, []);

  const toggleUserDialog = useCallback(
    async (isOpen: boolean) => {
      setIsUserDialogOpen(isOpen);
      if (!isOpen) {
        await getAllUsers();
      }
    },
    [getAllUsers]
  );

  const createNewUser = useCallback(async () => {
    setSelectedUser(null);
    toggleUserDialog(true);
  }, [toggleUserDialog]);

  const updateUser = useCallback(
    async (currentUser: UsersModel) => {
      setSelectedUser(currentUser);
      toggleUserDialog(true);
    },
    [toggleUserDialog]
  );

  const deleteUser = useCallback(
    async (userId) => {
      const userService = new UsersService();
      await userService.delete(userId);
      const listUsers = users.filter((user) => user.id !== userId);
      setUsers(listUsers);
    },
    [users]
  );

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <div>
      <div className="flex justify-start justify-between items-center gap-5 mb-2">
        <h1>Here, you will see all the information of the current Users</h1>
        <Button onClick={createNewUser} variant="outline">
          <Plus className="mr-2 h-6 w-6" /> Add User
        </Button>
      </div>
      {isUserDialogOpen && (
        <CreateUpdateUser
          isOpen={isUserDialogOpen}
          toggleDialog={toggleUserDialog}
          updateUser={selectedUser}
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
            <TableHead>Actions</TableHead>
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
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => updateUser(user)}
                      variant="outline"
                      size="sm"
                    >
                      <Pencil className="mr-2 h-4 w-4" /> Update
                    </Button>
                    <Button
                      onClick={() => deleteUser(user.id)}
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
                colSpan={6}
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
