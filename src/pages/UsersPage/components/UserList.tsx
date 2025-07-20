import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../../api/users";
import { ApiPaginatedResponse } from "../../../types/api";
import { User } from "../../../types/models/user";
import { useUser } from "../../../context/UserContext";
import { Stack } from "@mui/material";
import { useMemo } from "react";
import styled from "styled-components";
import UserCard from "./UserCard";
import Loader from "../../../components/Loader";

type UserListProps = {
    page?: number;
    perPage?: number;
    role?: string;
    hasLicense?: string;
    search?: string;
    setTotalPages?: (pages: number) => void;
};

export default function UserList({ page = 1, perPage = 10, role = '', hasLicense = '', search = '', setTotalPages }: UserListProps) {
    const { user } = useUser();

    const { data: userData, isLoading, isError } = useQuery<ApiPaginatedResponse<User>>({
        queryKey: ["users", page, perPage, role, search, hasLicense, user?.ID],
        queryFn: () => fetchUsers(page, perPage, search, role, hasLicense).then(res => res.data),
    });

    const userCards = useMemo(() => {
        return userData?.data.map((user: User) => (
            <UserCard key={user.ID} user={user} />
        ));
    }, [userData?.data]);

    if (isLoading) return <Loader size={60} message="Loading users..." color="#0066CC" />;
    if (isError) return <Message>Error loading users 😢</Message>;

    if (setTotalPages && userData?.pages) {
        setTotalPages(userData.pages);
    }

    if (!userData?.data || userData.data.length === 0) {
        return <Message>No users found.</Message>;
    }

    return (
        <Stack>
            {userCards}
        </Stack>
    );
}

const Message = styled.p`
    text-align: center;
    color: #888;
`;
