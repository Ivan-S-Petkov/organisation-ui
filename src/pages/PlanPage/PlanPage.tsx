import { useQuery } from "@tanstack/react-query";
import { fetchCurrentPlan } from "../../api/plans";
import { useUser } from "../../context/UserContext";
import { Typography, Chip, Stack, capitalize } from "@mui/material";
import Loader from "../../components/Loader";
import { ApiResponse } from '../../types/api';
import { Plan } from '../../types/models/plan';
import PlanSwitcher from './components/PlanSwitcher';

export default function PlanPage() {
    const { user } = useUser();

    const { data: plan, isLoading: loadingPlan, isError } = useQuery<ApiResponse<Plan>>({
        queryKey: ["currentPlan"],
        queryFn: () => fetchCurrentPlan().then(res => res.data),
    });

    const { name, limit, used } = plan?.data || { name: "Unknown", limit: 0, used: 0 };

    if (loadingPlan) return <Loader message="Loading plan..." />;

    if (isError) {
        return <Typography color="error">Failed to load plan details.</Typography>;
    }

    return (
        <Stack spacing={3} sx={{ p: 3 }}>
            <Typography variant="h5">Current Plan</Typography>
            <Chip label={`Name: ${capitalize(name)}`} />
            <Chip
                label={`Usage: ${used}/${limit}`}
                color={used >= limit ? "error" : "primary"}
            />

            {user?.role === "admin" && <PlanSwitcher name={name} />}
        </Stack>
    );
}