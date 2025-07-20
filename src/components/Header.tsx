import { AppBar, Toolbar, Button, IconButton, Tooltip, Avatar, Typography, } from "@mui/material";
import PlanBadge from "./PlanBadge";
import { useUser } from "../context/UserContext";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Home } from "@mui/icons-material";

type HeaderProps = {
    onLoginToggle: () => void;
};

export default function Header({ onLoginToggle }: HeaderProps) {
    const { user, setUser } = useUser();

    return (
        <AppBar position="static" sx={{ backgroundColor: "#0075C9" }}>
            <Toolbar sx={{ justifyContent: "space-between", }}>
                <LeftSection>
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                        <HomeButton color="inherit" aria-label="home">
                            <Home />
                        </HomeButton>
                    </Link>
                    <PlanBadge />
                </LeftSection>
                <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
                    Organisation Name
                </Typography>
                <RightSection>
                    {user && (
                        <Tooltip title={user.name}>
                            <Avatar
                                sx={{
                                    backgroundColor: '#0066CC',
                                    width: 40,
                                    height: 40,
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                {user.name.charAt(0).toUpperCase()}
                            </Avatar>
                        </Tooltip>
                    )}
                    {user ?
                        <Button color="inherit" onClick={() => setUser(null)}> Logout</Button> :
                        <Button color="inherit" onClick={onLoginToggle}> Login</Button>
                    }
                </RightSection>
            </Toolbar>
        </AppBar>
    );
}

const LeftSection = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const HomeButton = styled(IconButton)`
    && {
        color: white;
        
        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
    }
`;

const RightSection = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;