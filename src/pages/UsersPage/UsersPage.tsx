import {
    Stack,
    Button,
    Typography,
    TextField
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import UserList from "./components/UserList";
import PaginationWrapper from "./components/PaginationWrapper";
import FilterSelect from "./components/FilterSelect";

const hasLicenseOptions = [
    { value: '', label: 'All' },
    { value: 'true', label: 'Licensed' },
    { value: 'false', label: 'Unlicensed' }
];

const roleOptions = [
    { value: '', label: 'All' },
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' }
];

export default function UsersPage() {
    const { user } = useUser();
    const [filterRole, setFilterRole] = useState<string>('');
    const [filterHasLicense, setFilterHasLicense] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>();

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            if (searchTerm !== debouncedSearchTerm) {
                setPage(1);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, debouncedSearchTerm]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <Stack spacing={3} p={{ xs: 1, md: 4 }} sx={{ flexGrow: 1 }}>
            <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent={{ xs: "flex-start", md: "space-between" }}
                alignItems={{ xs: "center", md: "center" }}
                spacing={2}>
                <Stack direction="row" gap={2} alignItems="space-arround" width="100%" justifyContent="space-between">
                    <Typography variant="h5">Users</Typography>
                    {user?.role === 'admin' && <Button
                        color="primary"
                        variant="contained"
                        startIcon={<AddIcon />}
                        component={Link}
                        to="/admin/user/create"
                        sx={{
                            '& .MuiButton-startIcon': {
                                margin: 0,
                            }
                        }} />}
                </Stack>
                <Stack direction={{ xs: "column", md: "row" }} gap={2} alignItems="center">
                    <TextField
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        size="small"
                        sx={{ width: 200 }}
                    />
                    <Stack direction="row" gap={2}>
                        <FilterSelect name="License" options={hasLicenseOptions} value={filterHasLicense} setValue={setFilterHasLicense} />
                        <FilterSelect name="Role" options={roleOptions} value={filterRole} setValue={setFilterRole} />
                    </Stack>
                </Stack>
            </Stack>
            <UserList
                page={page}
                setTotalPages={setTotalPages}
                role={filterRole}
                hasLicense={filterHasLicense}
                search={debouncedSearchTerm}
            />
            {totalPages && totalPages > 1 &&
                <PaginationWrapper
                    pages={totalPages}
                    currentPage={page}
                    onPageChange={handlePageChange} />}
        </Stack>
    );
}