import { Button } from '@mui/material';
import styled from 'styled-components';
import { User } from '../../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assignLicense, unassignLicense } from '../../../api/license';
import toast from 'react-hot-toast';

type LicenseButtonProps = {
    user: User;
};

export default function LicenseButton({ user }: LicenseButtonProps) {
    const queryClient = useQueryClient();

    const toggleLicense = useMutation({
        mutationFn: user.hasLicense ? unassignLicense : assignLicense,
        onSuccess: () => {
            toast.success("License updated successfully!");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (err: any) => {
            toast.error(err.response.data.error || "Failed to update license");
        }
    });

    return (
        <ActionButtons>
            <LButton
                variant="outlined"
                size="small"
                onClick={() => toggleLicense.mutate(user.ID)}
                disabled={toggleLicense.isPending}
                $hasLicense={user.hasLicense}
            >
                {toggleLicense.isPending
                    ? "Updating..."
                    : user.hasLicense
                        ? "Unassign License"
                        : "Assign License"
                }
            </LButton>
        </ActionButtons>
    )
}

const ActionButtons = styled.div`
    display: flex;
    gap: 8px;
    
    @media (max-width: 768px) {
        width: 100%;
        justify-content: flex-end;
    }
`;

const LButton = styled(Button) <{ $hasLicense: boolean }>`
    && {
        border-color: ${props => props.$hasLicense ? '#FF5722' : '#4CAF50'};
        color: ${props => props.$hasLicense ? '#FF5722' : '#4CAF50'};
        
        &:hover {
            background-color: ${props => props.$hasLicense ? 'rgba(255, 87, 34, 0.04)' : 'rgba(76, 175, 80, 0.04)'};
            border-color: ${props => props.$hasLicense ? '#FF5722' : '#4CAF50'};
        }
        
        &:disabled {
            opacity: 0.5;
        }
    }
`;