import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ModeToggle } from "@/components/ui/toggleDarkMode";

const Cities = () => (
    <div>
        <h1>Here, you will see all the information of the current Cities</h1>
        <ModeToggle />
        <Table>
            <TableCaption>List the Cities</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Active</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">1</TableCell>
                    <TableCell>Neily</TableCell>
                    <TableCell>My city</TableCell>
                    <TableCell className="text-right">Yes</TableCell>
                </TableRow>
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total Cities</TableCell>
                    <TableCell className="text-right">1</TableCell>
                </TableRow>
            </TableFooter>
        </Table>

    </div>
);

export default Cities;