import { Chip, Stack, Typography } from '@mui/material';
import styled from 'styled-components';

function ErrorChip() {
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" sx={{ color: "#fff" }}>
                Plan:
            </Typography>
            <Error label="Error" />
        </Stack>
    )
}

export default ErrorChip

const Error = styled(Chip)`
    && {
        background-color: #f44336;
        color: white;
        font-weight: 600;
        
        .MuiChip-label {
            font-size: 0.75rem;
        }
    }
`;