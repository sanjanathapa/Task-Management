import noop from "lodash/noop";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";

const SearchBar = ({
  records = {},
  searchInput = "",
  showOptions = false,
  showCancelIcon = false,
  onClick = noop,
  handleKeyChange = noop,
  handleChange = noop,
  reset = noop,
  onClickOutside = noop,
}) => {
  return (
    <>
      <TextField
        value={searchInput}
        name="search"
        fullWidth
        size="small"
        sx={{
          backgroundColor: "background.white",
          "& .MuiOutlinedInput-input": {
            fontSize: 14,
          },
        }}
        placeholder={"search...."}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key !== "Enter") {
            return;
          }
          handleKeyChange();
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                fontSize="small"
                name="searchIcon"
                onClick={handleChange}
                data-val={searchInput}
                sx={{
                  cursor: "pointer",
                }}
              />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {showCancelIcon && <CancelIcon fontSize="small" sx={{ cursor: "pointer" }} onClick={handleChange} />}
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default SearchBar;
