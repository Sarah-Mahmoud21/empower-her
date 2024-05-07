import React, { useState, useEffect } from "react";
import axios from "axios";
import ManagerHeader from "../Header/ManagerHeader";
import "../Manager/Manager.css";

function Manager() {
  const [members, setMembers] = useState([]);
  const [interns, setInterns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [showMem, setShowMem] = useState(false);
  const [showInt, setShowInt] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [showprogress, setshowProgress] = useState(false);
  const [progress, setProgress] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/Member")
      .then((response) => {
        setMembers(response.data.members);
      })
      .catch((error) => {
        console.error("Error fetching membership data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/Internship")
      .then((response) => {
        setInterns(response.data.interns);
      })
      .catch((error) => {
        console.error("Error fetching intern data:", error);
      });
  }, []);

  const viewMembers = () => {
    setShowInt(false);
    setShowMem(!showMem);
  };

  const viewInterns = () => {
    setShowMem(false);
    setShowInt(!showInt);
    setSelectedMember(null); // Clear selected member when switching to interns view
  };

  const assignTask = (Id) => {
    setSelectedMember(Id);
    setShowForm(!showForm);
  };
  // Inside your Manager component
  const deleteIntern = async (internId) => {
    try {
      await axios.delete(`http://localhost:4000/Internship/${internId}`);
      // After successful deletion, update the state to reflect the changes
      setInterns(interns.filter((intern) => intern._id !== internId));
    } catch (error) {
      console.error("Error deleting intern:", error);
    }
  };

  const handleAssignMember = async (internId) => {
    try {
      await axios.put(`http://localhost:4000/Internship/${internId}`, {
        employeeId: employeeId,
      });
      // Update the interns state with the updatedInterns
      // You might need to fetch the interns again from the backend after the update
    } catch (error) {
      console.error("Error assigning employee to intern:", error);
    }
  };
  const getEmployeeFullName = (employeeId) => {
    const employee = members.find((member) => member._id === employeeId);
    return employee ? employee.fullName : "Unknown";
  };

  const handleSubmitTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/tasks", {
        memberId: selectedMember,
        description: taskDescription,
        deadline: taskDeadline,
      });
      setTasks([...tasks, response.data.task]);
      setTaskDescription("");
      setTaskDeadline("");
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };
  const checkProgress = async (memberId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/tasks/${memberId}`
      );
      const tasksWithProgress = response.data.tasks;

      // Update the state to include the tasks with progress values
      setTasks(tasksWithProgress);
      setshowProgress(!showprogress);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <>
      <ManagerHeader />
      <div className="Manager">
        <button onClick={viewMembers}>View Our Members</button>
        <button onClick={viewInterns}>View Our Interns</button>
        {showMem ? (
          <div>
            {members.map((member) => (
              <div className="card" key={member._id}>
                <h1>{member.fullName}</h1>
                <p>Project description: {member.projectSummary}</p>
                <p>Email: {member.email}</p>
                <p>Address: {member.address}</p>
                <button onClick={() => assignTask(member._id)}>
                  Assign Task
                </button>
                <button onClick={() => checkProgress(member._id)}>
                  Check Progress
                </button>
                {showprogress ? (
                  <>
                    {tasks.map((task) => (
                      <div key={task._id}>
                        <p>Task: {task.description}</p>
                        {task.progress && <p>Progress: {task.progress}</p>}{" "}
                        {/* Display progress if available */}
                      </div>
                    ))}
                  </>
                ) : (
                  <></>
                )}

                {showForm ? (
                  <div>
                    <form onSubmit={handleSubmitTask}>
                      <label>
                        Description:
                        <br />
                        <input
                          type="text"
                          value={taskDescription}
                          onChange={(e) => setTaskDescription(e.target.value)}
                        />
                      </label>
                      <br />
                      <label>
                        Deadline:
                        <br />
                        <input
                          type="date"
                          value={taskDeadline}
                          onChange={(e) => setTaskDeadline(e.target.value)}
                        />
                      </label>
                      <br />
                      <button type="submit">Submit</button>
                    </form>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}

        {showInt ? (
          <div>
            {interns.map((intern) => (
              <div className="card" key={intern._id}>
                <h1>{intern.fullName}</h1>
                <p>
                  Email: {intern.email}
                  {intern.emailAddress}
                </p>
                <p>Address: {intern.address}</p>

                {intern.employeeId ? (
                  <p>
                    Currently connected with:{" "}
                    {getEmployeeFullName(intern.employeeId)}
                  </p>
                ) : (
                  <></>
                )}

                <select
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}>
                  <option value="">Select Member</option>
                  {members.map((member) => (
                    <option key={member._id} value={member._id}>
                      {member.fullName}
                    </option>
                  ))}
                </select>
                <br />
                <button onClick={() => handleAssignMember(intern._id)}>
                  Connect with an employee
                </button>
                <button onClick={() => deleteIntern(intern._id)}>
                  Delete Intern
                </button>
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Manager;
