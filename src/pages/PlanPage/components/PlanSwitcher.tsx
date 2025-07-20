import { Select, MenuItem, Button, Stack, capitalize } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { switchPlan } from "../../../api/plans";
import toast from "react-hot-toast";
import { PLANS } from "../../../constants";

type PlanSwitcherProps = {
    name: string;
};

export default function PlanSwitcher({ name }: PlanSwitcherProps) {
    const queryClient = useQueryClient();

    const { mutate: changePlan, isPending: switching } = useMutation({
        mutationFn: switchPlan,
        onSuccess: () => {
            toast.success("Plan switched!");
            queryClient.invalidateQueries({ queryKey: ["currentPlan"] });
        },
        onError: (err: any) => toast.error(err.response.data.error || "Failed to switch plan"),
    });

    const [selectedPlan, setSelectedPlan] = useState<string>(name);

    return (
        <Stack spacing={2} direction="row" alignItems="center">
            <Select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                size="small"
            >
                {Object.values(PLANS).map((p: string) => (
                    <MenuItem key={p} value={p}>
                        {capitalize(p)}
                    </MenuItem>
                ))}
            </Select>
            <Button
                variant="contained"
                disabled={switching || selectedPlan === name}
                onClick={() => selectedPlan && changePlan(selectedPlan)}
            >
                Change Plan
            </Button>
        </Stack>
    );
}