import {
    TextField,
    Button,
    Stack,
    Typography,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    FormHelperText,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createUser } from "../../api/users";
import { UserForm } from "../../types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function CreateUserPage() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<UserForm>({
        mode: 'onBlur',
        defaultValues: {
            role: 'user'
        }
    });

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            toast.success("User created!");
            queryClient.invalidateQueries({ queryKey: ["users"] });
            reset();
            navigate("/");
        },
        onError: () => toast.error("Failed to create user"),
    });

    const onSubmit = (data: UserForm) => mutate(data);

    return (
        <Stack spacing={3} sx={{ p: 3, maxWidth: 500, margin: "0 auto" }}>
            <Typography variant="h5">Create New User</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <TextField
                        label="Name"
                        {...register("name", {
                            required: "Name is required",
                            minLength: {
                                value: 2,
                                message: "Name must be at least 2 characters"
                            },
                            maxLength: {
                                value: 50,
                                message: "Name cannot exceed 50 characters"
                            },
                            pattern: {
                                value: /^[a-zA-Z\s]+$/,
                                message: "Name can only contain letters and spaces"
                            }
                        })}
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        disabled={isPending}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Please enter a valid email address"
                            }
                        })}
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        disabled={isPending}
                    />
                    <FormControl fullWidth variant="outlined">
                        <InputLabel
                            sx={{
                                backgroundColor: '#f4f4f4',
                                paddingX: '8px',
                                marginX: '-4px'
                            }}>
                            Role
                        </InputLabel>
                        <Select defaultValue="user"
                            {...register("role", {
                                required: "Please select a role"
                            })}
                            disabled={isPending}>
                            <MenuItem value="user">User</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                        {errors.role && (
                            <FormHelperText>{errors.role.message}</FormHelperText>
                        )}
                    </FormControl>

                    <Button type="submit" variant="contained" disabled={isPending || !isValid}>
                        {isPending ? "Creating..." : "Create User"}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate("/")}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>
                </Stack>
            </form>
        </Stack>
    );
}