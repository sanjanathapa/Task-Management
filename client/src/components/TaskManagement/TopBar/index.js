import noop from "lodash/noop";

import { Grid, Box, Button, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchBar from "../../SearchBar";

export const StyledBox = styled(Box)(() => ({
  margin: "auto",
  maxWidth: "inherit",
  width: 45,
  height: 45,
  cursor: "pointer",
}));

const TopBar = ({
  searchInput = "",
  showOptions = false,
  showCancelIcon = false,
  searchTableData = {},
  onClick = noop,
  handleKeyChange = noop,
  handleChange = noop,
  reset = noop,
}) => {

  return (
    <Grid
      container
      alignItems="center"
      sx={{
        mt: 1,
        mb: 1,
        pl: 3,
        pr: 3,
        "& .MuiOutlinedInput-input": {
          fontSize: 14,
        },
      }}
    >
      <Grid item md={3} xs={12}>
        <SearchBar
          records={searchTableData}
          searchInput={searchInput}
          showOptions={showOptions}
          showCancelIcon={showCancelIcon}
          onClick={onClick}
          handleKeyChange={handleKeyChange}
          handleChange={handleChange}
          reset={reset}
        />
      </Grid>
      <Grid item>
        <Button
                  size="medium"
                  variant="outlined"
                  sx={{marginLeft: "750px"}}
          startIcon={<AddIcon sx={{ width: 19 }} />}
          //   onClick={() => handleAddEditCaseStudyDialog()}
        >
          {"Add Task"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default TopBar;
