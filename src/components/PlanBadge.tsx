import { capitalize, Chip, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentPlan } from "../api/plans";
import Loader from "./Loader";
import styled from "styled-components";
import { ApiResponse } from "../types/api";
import { Plan } from "../types/models/plan";
import { Link } from "react-router-dom";
import ErrorChip from "./ErrorChip";

export default function PlanBadge() {
    const { data: planData, isLoading, isError } = useQuery<ApiResponse<Plan>>({
        queryKey: ["currentPlan"],
        queryFn: () => fetchCurrentPlan().then(res => res.data),
    });

    if (isLoading) {
        return <Loader size={20} />;
    }

    if (isError) {
        return <ErrorChip />;
    }

    const { name } = planData?.data || { name: "Unknown" };

    return (
        <Link to="/plan" style={{ textDecoration: "none" }}>
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2" sx={{ color: "#fff" }}>
                    Plan:
                </Typography>
                <StyledChip label={`${capitalize(name)}`} />
            </Stack>
        </Link>
    );
}

const StyledChip = styled(Chip)`
    && {
        background-color: #0066CC;
        color: white;
        font-weight: 600;
        
        .MuiChip-label {
            font-size: 0.75rem;
        }
    }
`;