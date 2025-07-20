import { CircularProgress, Box, Typography } from "@mui/material";
import styled from "styled-components";

type Props = {
    message?: string;
    size?: number;
    color?: string;
};

export default function Loader({ message, size = 40, color = "#ffffff" }: Props) {
    return (
        <LoaderContainer >
            <CircularProgress size={size} sx={{
                color: color,
            }} />
            {message && <Typography variant="body2" sx={{ marginTop: "0.5rem" }}>
                {message}
            </Typography>
            }
        </LoaderContainer>
    );
}

const LoaderContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;