import styled from "styled-components";
import { User } from "../../../types/models/user";
import { useUser } from "../../../context/UserContext";
import {
    Card,
    CardContent,
    Typography,
    Chip,
    Avatar,
    Box
} from "@mui/material";
import { Person, AdminPanelSettings, Check, Close } from "@mui/icons-material";
import LicenseButton from "../../../components/LicenseButton";

type UserCardProps = {
    user: User;
};

export default function UserCard({ user }: UserCardProps) {
    const { user: currentUser } = useUser();

    return (
        <StyledCard>
            <CardContent>
                <UserInfo>
                    <UserDetails>
                        <Avatar sx={{ bgcolor: user.hasLicense ? '#4CAF50' : '#FF9800', mr: 2 }}>
                            {user.role === 'admin' ? <AdminPanelSettings /> : <Person />}
                        </Avatar>
                        <Box>
                            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                                {user.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {user.email}
                            </Typography>
                        </Box>
                    </UserDetails>
                    <BadgeContainer>
                        <RoleChip
                            label={user.role}
                            size="small"
                            color={user.role === 'admin' ? 'primary' : 'default'}
                        />
                        <LicenseChip
                            label={user.hasLicense ? "Licensed" : "Unlicensed"}
                            size="small"
                            $hasLicense={user.hasLicense}
                            icon={user.hasLicense ? <Check /> : <Close />}
                        />
                    </BadgeContainer>

                    {currentUser?.role === 'admin' && <LicenseButton user={user} />}
                </UserInfo>
            </CardContent>
        </StyledCard>
    );
}

const StyledCard = styled(Card)`
    && {
        transition: all 0.2s ease-in-out;
        border-left: 4px solid transparent;
        margin-bottom: 16px;
        
        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 102, 204, 0.15);
            border-left-color: #0066CC;
        }
    }
`;

const UserInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }
`;

const UserDetails = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
`;

const BadgeContainer = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    
    @media (max-width: 768px) {
        width: 100%;
        justify-content: flex-start;
    }
`;

const RoleChip = styled(Chip)`
    && {
        font-weight: 600;
        text-transform: capitalize;
    }
`;

const LicenseChip = styled(Chip) <{ $hasLicense: boolean }>`
    && {
        background-color: ${props => props.$hasLicense ? '#E8F5E9' : '#FFF3E0'};
        color: ${props => props.$hasLicense ? '#2E7D32' : '#E65100'};
        font-weight: 500;
        
        .MuiChip-icon {
            color: inherit;
        }
    }
`;