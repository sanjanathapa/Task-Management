import React, { useState, useReducer, useEffect, useCallback } from "react";
import { TextField, Select, MenuItem, Button } from "@mui/material";
import Modal from "react-modal";
import { useAddTaskMutation } from "../Api/AddTask";
import { ToastContainer, toast } from "react-toastify";
import { handleError } from "../utils/handleError";
import { useLazyGetTaskQuery } from "../Api/GetTaskLists";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDeleteTaskMutation } from "../Api/DeleteTask";
import { useUpdateTaskMutation } from "../Api/UpdateTask.js";
import "../components/tablec.css";
import "../App.css";
import { get } from "lodash";

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

const TaskLists = () => {
  const [openModal, setOpenModal] = useState(false);

  const [addTask] = useAddTaskMutation();
  const [getTaskLists] = useLazyGetTaskQuery();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const [localState, setLocalState] = useReducer(
    (prevState, newState) => {
      return { ...prevState, ...newState };
    },
    {
      technology: "",
      task: "",
      tableRowData: [],
      taskId: "",
    }
  );

  const { technology, task, tableRowData, taskId } = localState;

  const getTableData = useCallback(() => {
    getTaskLists()
      .unwrap()
      .then((res) => {
        console.log(res, "response of  getTasklist");

        // setLocalState((prevState) => ({
        //   ...prevState,
        //   tableRowData: res.tasks,
        // }));
        setLocalState({ tableRowData: res.tasks });
      })
      .catch((error) => {
        handleError(error);
      });
  }, [getTaskLists]);

  useEffect(() => {
    getTableData();
  }, [getTableData]);

  console.log(tableRowData, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  const handleTaskCreateModal = () => {
    // if (localStorage.getItem("token")) {
    //   setOpenModal(!openModal);
    // } else {
    //   toast.error("Unauthorized");
    // }
    resetState();
    setOpenModal(!openModal);
  };

  const onHandleChange = (e) => {
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
      technology,
      task,
      id: taskId,
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
    console.log("id>>>>>>", item);
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
    console.log("dsnjanfnfdskfkdfjdkfjdkjflkddfd", item);
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

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table style={{ width: "80%", border: "100px" }}>
          <tbody>
            <tr>
              <th>Task Created By</th>
              <th>Technology</th>
              <th>Task</th>
              <th>Task Given To</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
            {tableRowData.map((item) => (
              <tr key={item.id}>
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
        <button
          onClick={(e) => {
            resetState();
            handleTaskCreateModal(e);
          }}
        >
          Add new task
        </button>
        <Modal
  isOpen={openModal}
  style={customStyles}
  contentLabel="Example Modal"
>
  <div style={{ padding: "20px" }}>
    <div style={{ marginBottom: "20px" }}>
      {/* <Select
        label="Technology"
        value={technology}
        onChange={onHandleChange}
        fullWidth
      >
        <MenuItem value="Technology 1">Technology 1</MenuItem>
        <MenuItem value="Technology 2">Technology 2</MenuItem>
        <MenuItem value="Technology 3">Technology 3</MenuItem>
      </Select> */}
                <TextField
        label="Technology"
        value={task}
        onChange={onHandleChange}
        fullWidth
        select
      >
        <MenuItem value="Task 1">Task 1</MenuItem>
        <MenuItem value="Task 2">Task 2</MenuItem>
        <MenuItem value="Task 3">Task 3</MenuItem>
      </TextField>
    </div>
    <div style={{ marginBottom: "20px" }}>
      <TextField
        label="Task"
        value={task}
        onChange={onHandleChange}
                fullWidth
                select
      />
    </div>
    <div style={{ textAlign: "right" }}>
      <Button
        variant="contained"
        onClick={handleSubmitTask}
        style={{ marginRight: "10px" }}
      >
        Submit Task
      </Button>
      <Button variant="contained" onClick={handleModalClose}>
        Close
      </Button>
    </div>
  </div>
</Modal>

        {/* <Modal
          isOpen={openModal}
          // onAfterOpen={afterOpenModal}
          // onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div style={{ padding: "20px" }}>
            <div style={{ marginBottom: "20px" }}>
              {/* <label htmlFor="technologyInput">Technology Name:</label> */}
              {/* <input
                type="text"
                id="technologyInput"
                name="technology"
                value={technology}
                required
                onChange={onHandleChange}
                placeholder="Enter technology name"
                style={{
                  width: "100%",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              /> */}
              {/* <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={technology}
                label="Technology"
                onChange={onHandleChange}
              ></Select>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="taskInput">Task:</label>
              <input
                type="text"
                id="taskInput"
                name="task"
                value={task}
                required
                onChange={onHandleChange}
                placeholder="Enter task"
                style={{
                  width: "100%",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="taskInput">Task:</label>
              <input
                type="text"
                id="taskInput"
                name="task"
                value={task}
                required
                onChange={onHandleChange}
                placeholder="Enter task"
                style={{
                  width: "100%",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="taskInput">Task:</label>
              <input
                type="text"
                id="taskInput"
                name="task"
                value={task}
                required
                onChange={onHandleChange}
                placeholder="Enter task"
                style={{
                  width: "100%",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ textAlign: "right" }}>
              <button style={{ marginRight: "10px", padding: "8px 16px" }} onClick={handleSubmitTask}>
                Submit Task
              </button>
              <button style={{ padding: "8px 16px" }} onClick={handleModalClose}>
                Close
              </button>
            </div>
          </div>
        </Modal> */} 

        <ToastContainer></ToastContainer>
      </div>
    </div>
  );
};

export default TaskLists;
