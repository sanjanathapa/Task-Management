import { useState, useReducer, ChangeEvent } from "react";
import Modal from "react-modal";
import { useAddTaskMutation } from "../Api/AddTask.js";
import { toast } from "react-toastify";
import { handleError } from "../utils/handleError.js";
import { useGetTaskQuery } from "../Api/GetTaskLists.js";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDeleteTaskMutation } from "../Api/DeleteTask.js";
import { useUpdateTaskMutation } from "../Api/UpdateTask.js";
import "../components/tablec.css";
import "../App.css";
import { get } from "lodash";
import { CircularProgress } from "@mui/material";

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

  const { data, isLoading, refetch: getTableData } = useGetTaskQuery({});
  const [addTask] = useAddTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const [localState, setLocalState] = useReducer(
    (prevState: StateType, newState: ActionType) => {
      return { ...prevState, ...newState };
    },
    {
      technology: "",
      task: "",
      taskId: "",
    },
  );

  const { technology, task, taskId } = localState;

  const handleTaskCreateModal = () => {
    // if (localStorage.getItem("token")) {
    //   setOpenModal(!openModal);
    // } else {
    //   toast.error("Unauthorized");
    // }
    resetState();
    setOpenModal(!openModal);
  };

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalState({ [name]: value });
  };

  const resetState = () => {
    setLocalState({ ...localState, technology: "", task: "", taskId: "" });
  };

  const handleClose = () => {
    setOpenModal(!openModal);
  };

  const handleSubmitTask = () => {
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

  const handleEditClick = (item: any) => {
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

  const handleDeleteTask = (item: any) => {
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

  if (isLoading) return <CircularProgress sx={{ color: "black" }} />;
  return (
    <div>
      <button
        className="d-flex mx-auto my-3"
        onClick={() => {
          resetState();
          handleTaskCreateModal();
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
            {data?.tasks?.map((item: any, i: number) => (
              <tr key={i}>
                <td>{get(item, "teamLeadId.name", "")}</td>
                <td>{get(item, "technologyId.technology", "")}</td>
                <td>{get(item, "task", "")}</td>
                <td>{get(item, "userId.name", "")}</td>
                <td onClick={() => handleDeleteTask(item)}>
                  <DeleteIcon />
                </td>
                <td onClick={() => handleEditClick(item)}>
                  <EditIcon />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal
          isOpen={openModal}
          // onAfterOpen={afterOpenModal}
          // onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div style={{ padding: "20px" }}>
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="technologyInput">Technology Name:</label>
              <input
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
              <button
                style={{ marginRight: "10px", padding: "8px 16px" }}
                onClick={handleSubmitTask}
              >
                Submit Task
              </button>
              <button
                style={{ padding: "8px 16px" }}
                onClick={handleModalClose}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default TaskLists;

export interface StateType {
  technology: string;
  task: string;
  taskId: string;
}

export type ActionType = Partial<StateType>;
