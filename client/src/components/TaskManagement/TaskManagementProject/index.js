import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, CircularProgress, MenuItem, TextField } from "@mui/material";
import { get } from "lodash";
import React, { useReducer, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { useAddTaskMutation } from "../../../Api/AddTask.js";
import { useDeleteTaskMutation } from "../../../Api/DeleteTask";
import { useGetUsersQuery } from "../../../Api/GetAllUsers.js";
import { useGetTaskQuery } from "../../../Api/GetTaskLists";
import { useGetTechnologyQuery } from "../../../Api/GetTechnology.js";
import { useUpdateTaskMutation } from "../../../Api/UpdateTask.js";
import "../../../App.css";
import { handleError } from "../../../utils/handleError.js";
import "../../TaskManagement/tablec.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const TaskManagementProject = ({ searchQuery = "" }) => {
  const [openModal, setOpenModal] = useState(false);

  const { data, isLoading, refetch: getTableData } = useGetTaskQuery(searchQuery);
  const [addTask] = useAddTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const { data: getUserList } = useGetUsersQuery();
  const { data: techData } = useGetTechnologyQuery();
  console.log(getUserList, ">>>>>>>>>>>>>>>>>>>>>>>data");

  const [localState, setLocalState] = useReducer(
    (prevState, newState) => {
      return { ...prevState, ...newState };
    },
    {
      technology: "",
      task: "",
      intern: "",
      taskId: "",
      technologyId: "",
      internId: "",
    }
  );

  const { technology, task, taskId, intern, technologyId, internId } = localState;
  const handleTaskCreateModal = () => {
    resetState();
    setOpenModal(!openModal);
  };

  const onHandleChange = (e) => {
    console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", e.target);
    const { name, value } = e.target;
    setLocalState({ [name]: value });
  };

  const resetState = () => {
    setLocalState({ ...localState, technology: "", task: "", taskId: "" });
  };

  const handleClose = () => {
    setOpenModal(!openModal);
  };

  const handleSubmitTask = (e) => {
    const data = {
      technologyId: technologyId,
      task,
      userId: internId,
    };
    if (localState.taskId.length > 0) {
      updateTask(data)
        .unwrap()
        .then((res) => {
          console.log("res of updated data", res);
          toast.success("task updated successfully");
          handleClose();
          resetState();
          getTableData();
        })
        .catch(handleError);
    } else {
      addTask(data)
        .unwrap()
        .then((response) => {
          console.log("this is response>>", response);
          toast.success("task created successfully");
          handleClose();
          resetState();
          getTableData();
        })
        .catch((error) => handleError(error));
    }
  };

  const handleEditClick = (item) => {
    setOpenModal(!openModal);
    setLocalState({
      technology: item.technology,
      task: item.task,
      taskId: item._id,
    });
  };

  const handleModalClose = () => {
    setOpenModal(!openModal);
  };

  const handleDeleteTask = (item) => {
    const taskId = item._id;

    deleteTask(taskId)
      .unwrap()
      .then((res) => {
        console.log("respon delet>>>>>>>>>>>", res);
        toast.success("task Deleted Successfully");
        getTableData();
      })
      .catch(handleError);
  };

  if (isLoading) return <CircularProgress sx={{ color: "black" }} />;

  return (
    <div>
      <button
        className="d-flex mx-auto my-3"
        onClick={(e) => {
          resetState(); // Call the resetState function
          handleTaskCreateModal(e); // Call the handleTaskCreateModal function
        }}
      >
        Add new task
      </button>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <table style={{ width: "80%", border: "100px" }} key={1}>
          <tbody>
            <tr>
              <th>Task Created By</th>
              <th>Technology</th>
              <th>Task</th>
              <th>Task Given To</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
            {(data)?.tasks?.map((item, i) => (
              <tr key={i}>
                <td>{get(item, "teamLeadId.name", "")}</td>
                <td>{get(item, "technologyId.technology", "")}</td>
                <td>{get(item, "task", "")}</td>
                <td>{get(item, "userId.name", "")}</td>
                <td onClick={() => handleDeleteTask(item)}>
                  <DeleteIcon />
                </td>
                <td onClick={(e) => handleEditClick(item)}>
                  <EditIcon />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal isOpen={openModal} style={customStyles} contentLabel="Example Modal">
          <div style={{ padding: "20px" }}>
            <div style={{ marginBottom: "20px" }}>
              <TextField
                label="Technology"
                name="technology"
                value={technology}
                onChange={onHandleChange}
                fullWidth
                select
              >
                {techData?.technologies?.map((item, index) => {
                  console.log("item>>>>>>>>>", item._id);
                  return (
                    <MenuItem
                      key={index}
                      value={item.technology}
                      onClick={() => {
                        setLocalState({ ...localState, technologyId: item._id });
                      }}
                    >
                      {item.technology}
                    </MenuItem>
                  );
                })}
              </TextField>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <TextField label="Task" name="task" value={task} onChange={onHandleChange} fullWidth></TextField>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <TextField label="Intern" name="intern" value={intern} onChange={onHandleChange} fullWidth select>
                {getUserList?.user?.map((item, index) => {
                  console.log("item>>>>>>>>>", item);
                  return (
                    <MenuItem
                      key={index}
                      value={item.name}
                      onClick={() => {
                        setLocalState({ ...localState, internId: item._id });
                      }}
                    >
                      {item.name}
                    </MenuItem>
                  );
                })}
              </TextField>
            </div>
            <div style={{ textAlign: "right" }}>
              <Button variant="contained" onClick={handleSubmitTask} style={{ marginRight: "10px" }}>
                Submit Task
              </Button>
              <Button variant="contained" onClick={handleModalClose}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default TaskManagementProject;
