import { Box, Paper } from "@mui/material";
import React, { useState } from "react";
import TaskManagementProject from "./TaskManagementProject/index.js";
import TopBar from "./TopBar/index.js";

const TaskLists = () => {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  console.log("searchInput...........", searchInput);
  console.log("debouncedSearch...........", debouncedSearch);

  const debounce = (func, delay) => {
    let timeout;

    return function (...args) {
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleQueryChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debounce(getTaskData, 2000)(searchInput);
  };

  const getTaskData = (searchQuery) => {
    setDebouncedSearch(searchQuery);
  };

  return (
    <Paper
      display="block"
      justifyContent="flex-start"
      sx={{ borderRadius: 2, marginBottom: "6px" }}
    >
      <Box
        sx={{
          "& .MuiTabPanel-root": {
            p: 2,
            pt: 0,
            padding: "4px",
          },
        }}
      >
        <TopBar searchInput={searchInput} handleChange={handleQueryChange} />
      </Box>
      <TaskManagementProject searchQuery={debouncedSearch} />
    </Paper>
  );
};

export default TaskLists;

// return (
//     <div>
//       <button
//         className="d-flex mx-auto my-3"
//         onClick={(e) => {
//           resetState();
//           handleTaskCreateModal(e);
//         }}
//       >
//         Add new task
//       </button>

//       <div style={{ display: "flex", justifyContent: "center" }}>
//         <table style={{ width: "80%", border: "100px" }} key={1}>
//           <tbody>
//             <tr>
//               <th>Task Created By</th>
//               <th>Technology</th>
//               <th>Task</th>
//               <th>Task Given To</th>
//               <th>Delete</th>
//               <th>Edit</th>
//             </tr>
//             {data?.tasks?.map((item, i) => (
//               <tr key={i}>
//                 <td>{get(item, "teamLeadId.name", "")}</td>
//                 <td>{get(item, "technologyId.technology", "")}</td>
//                 <td>{get(item, "task", "")}</td>
//                 <td>{get(item, "userId.name", "")}</td>
//                 <td onClick={() => handleDeleteTask(item)}>
//                   <DeleteIcon />
//                 </td>
//                 <td onClick={(e) => handleEditClick(item)}>
//                   <EditIcon />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <Modal isOpen={openModal} style={customStyles} contentLabel="Example Modal">
//           <div style={{ padding: "20px" }}>
//             <div style={{ marginBottom: "20px" }}>
//               <TextField
//                 label="Technology"
//                 name="technology"
//                 value={technology}
//                 onChange={onHandleChange}
//                 fullWidth
//                 select
//               >
//                 {techData?.technologies?.map((item, index) => {
//                   console.log("item>>>>>>>>>", item._id);
//                   return (
//                     <MenuItem
//                       key={index}
//                       value={item.technology}
//                       onClick={() => {
//                         setLocalState({ ...localState, technologyId: item._id });
//                       }}
//                     >
//                       {item.technology}
//                     </MenuItem>
//                   );
//                 })}
//               </TextField>
//             </div>
//             <div style={{ marginBottom: "20px" }}>
//               <TextField label="Task" name="task" value={task} onChange={onHandleChange} fullWidth></TextField>
//             </div>
//             <div style={{ marginBottom: "20px" }}>
//               <TextField label="Intern" name="intern" value={intern} onChange={onHandleChange} fullWidth select>
//                 {getUserList?.user?.map((item, index) => {
//                   console.log("item>>>>>>>>>", item);
//                   return (
//                     <MenuItem
//                       key={index}
//                       value={item.name}
//                       onClick={() => {
//                         setLocalState({ ...localState, internId: item._id });
//                       }}
//                     >
//                       {item.name}
//                     </MenuItem>
//                   );
//                 })}
//               </TextField>
//             </div>
//             <div style={{ textAlign: "right" }}>
//               <Button variant="contained" onClick={handleSubmitTask} style={{ marginRight: "10px" }}>
//                 Submit Task
//               </Button>
//               <Button variant="contained" onClick={handleModalClose}>
//                 Close
//               </Button>
//             </div>
//           </div>
//         </Modal>
//       </div>
//     </div>
//   );
