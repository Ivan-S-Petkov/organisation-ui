import { Dialog, DialogTitle, DialogContent, TextField, Button, Stack, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import Loader from "./Loader";
import { login } from "../api/auth";

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function LoginModal({ open, onClose }: Props) {
    const [email, setEmail] = useState("");
    const { setUser } = useUser();

    const loginMutation = useMutation({
        mutationKey: ["login"],
        mutationFn: login,
        onSuccess: (response) => {
            setUser(response.data);
            toast.success(`Welcome, ${response.data.name}!`);
            onClose();
            setEmail("");
        },
        onError: () => {
            toast.error("Login failed. Email not found.");
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) {
            toast.error("Email is required");
            return;
        }
        loginMutation.mutate(email);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Login with Email</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            required
                            autoFocus
                            disabled={loginMutation.isPending}
                        />
                        <Button variant="contained" type="submit"
                            disabled={loginMutation.isPending}
                            startIcon={loginMutation.isPending ? <Loader size={20} /> : null}
                        >
                            Log In
                        </Button>
                    </Stack>
                </form>
            </DialogContent>
        </Dialog>
    );
}