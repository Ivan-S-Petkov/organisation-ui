import { Box, Pagination } from "@mui/material";

type PaginationWrapperProps = {
    pages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
};

export default function PaginationWrapper({ pages, currentPage, onPageChange }: PaginationWrapperProps) {
    const handleChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        onPageChange(page);
    };

    return (
        <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
                count={pages}
                page={currentPage}
                onChange={handleChange}
                color="primary"
                size="medium"
                showFirstButton
                showLastButton
            />
        </Box>
    );
}