import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

type FilterSelectProps = {
    name: string;
    options: { value: string; label: string }[];
    value: string;
    setValue: (value: string) => void;
}

function FilterSelect({ name, options, value, setValue }: FilterSelectProps) {
    return (
        <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel
                sx={{
                    backgroundColor: "#f4f4f4",
                    px: "8px",
                    mx: "-4px",
                }}
            >
                {name}
            </InputLabel>
            <Select
                value={value ?? ""}
                onChange={(e) =>
                    setValue(e.target.value)
                }
                displayEmpty
            >
                {options?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default FilterSelect