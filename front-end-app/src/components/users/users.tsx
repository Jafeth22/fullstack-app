"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { Button, Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@ui";
import { Users as UsersModel } from "@models";
import { Plus, RefreshCw } from "lucide-react";
import { UsersService } from "@services";

const Users: FC = () => {
    const [users, setUsers] = useState<UsersModel[]>([]);

    const getAllUsers = useCallback(async () => {
        const userService = new UsersService();
        const getUsers = await userService.getAllUsers();
        setUsers(getUsers);
    }, []);

    const createNewUser = useCallback(async () => {
        console.log(['createNewUser']);
    }, []);

    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);

    return (
        <div>
            <h1>Here, you will see all the information of the current Users</h1>
            <Button onClick={() => createNewUser()} variant="outline">
                <Plus className="mr-2 h-6 w-6" /> Add User
            </Button>
            <Button variant="default" onClick={() => getAllUsers()}>
                <RefreshCw className="mr-2 h-4 w-4" /> Refresh
            </Button>
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
                    {users.length > 0 ? users.map((user, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.lastName}</TableCell>
                            <TableCell>{user.city.name}</TableCell>
                        </TableRow>
                    )) :
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                className="text-center py-8 text-muted-foreground"
                            >
                                No users to display
                            </TableCell>
                        </TableRow>}
                </TableBody>
            </Table>
        </div>
    )
}

export default Users;