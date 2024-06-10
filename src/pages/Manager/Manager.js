import React, { useState, useEffect } from "react";
import axios from "axios";
import ManagerHeader from "../Header/ManagerHeader";
import "../Manager/Manager.css";
import { Link } from "react-router-dom";

function Manager() {
  const [members, setMembers] = useState([]);
  const [interns, setInterns] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [sales, setSales] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [products, setProducts] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [showMem, setShowMem] = useState(false);
  const [showInt, setShowInt] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showCustomers, setShowCustomers] = useState(false);
  const [showSales, setShowSales] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [showprogress, setshowProgress] = useState(false);

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
  useEffect(() => {
    axios
      .get("http://localhost:4000/Customers")
      .then((response) => {
        setCustomers(response.data.customers);
      })
      .catch((error) => {
        console.error("Error fetching intern data:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:4000/Sales")
      .then((response) => {
        setSales(response.data.sales);
      })
      .catch((error) => {
        console.error("Error fetching intern data:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:4000/Products")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  const viewMembers = () => {
    setShowInt(false);
    setShowCustomers(false);
    setShowSales(false);
    setShowMem(!showMem);
  };

  const viewInterns = () => {
    setShowMem(false);
    setShowCustomers(false);
    setShowSales(false);
    setShowInt(!showInt);
    setSelectedMember(null); // Clear selected member when switching to interns view
  };
  const viewCustomers =() =>{
    setShowInt(false);
    setShowMem(false);
    setShowSales(false);
    setShowCustomers(!showCustomers);
  }
  const viewSales =() =>{
    setShowInt(false);
    setShowMem(false);
    setShowCustomers(false);
    setShowSales(!showSales);
  }

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
      const response = await axios.get(`http://localhost:4000/tasks/${memberId}`);
      const tasksWithProgress = response.data.tasks;
  
      setTasks(tasksWithProgress);
      setshowProgress(!showprogress);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setTasks([]);
        setshowProgress(!showprogress);
      } else {
        console.error("Error fetching tasks:", error);
      }
    }
  };
  const getProductName = (productId) => {
    const product = products.find((product) => product._id === productId);
    return product ? product.productName : "Unknown Product";
  };
  const getProductOwner = (productId) => {
    const product = products.find((product) => product._id === productId);
    const memId = product.memberId;
    const member = members.find((member) => member._id === memId);
    return member ? member.fullName : "Unknown";

  };
  const getProductPrice = (productId) => {
    const product = products.find((product) => product._id === productId);
    return product ? product.price : "Unknown Product";
  };
  

  return (
    <>
      <ManagerHeader />
      <div className="Manager">
        <button onClick={viewMembers}>View Our Members</button>
        <button onClick={viewInterns}>View Our Interns</button>
        <button onClick={viewCustomers}>Check Recent Orders </button>
        <button onClick={viewSales}>Check Sales</button>

        

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
                  {console.log("Tasks length:", tasks.length)}
                    {tasks.length > 0 ? (
                      tasks.map((task) => (
                        <div key={task._id}>
                          <p>Task: {task.description}</p>
                          <p>Status: {task.status}</p>
                          {task.progress && <p>Progress: {task.progress}</p>}
                        </div>
                      ))
                    ) : (
                      <p>no tasks available</p>
                    )}
                  </>
                ) : (
                  <>
                  </>
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
        {showCustomers? (
          <div>
            {customers.map((customer)=> (
              <div className="card" key={customer._id}>
                <h1>Order :</h1>
                <p>{customer.country}{customer.Country} {customer.city}{customer.City} {customer.street}{customer.Street}</p>
                <p>Product: {getProductName(customer.productId)}</p>
                <p> Purchused Quantity {customer.quantity}</p>
                <p>Total Price :{customer.totalAmount}{customer.TotalAmount}</p>
                <p>Phone :{customer.mobileNumber}</p>
                <p> Purchuse Date{customer.date}</p>
                </div>

            ))}
          </div>
        ):(
        <></>
        )}
        {showSales?(
          <div>
          {sales.map((sale)=> (
            <div className="card" key={sale._id}>
            <p>Product: {getProductName(sale.productId)}</p>
            <p> Sold Qunatity : {sale.quantity}</p>
            <p> Product Price : {getProductPrice(sale.productId)}</p>
            <p> Product Owner :{getProductOwner(sale.productId)}</p>
              </div>

          ))}
        </div>
          ):(
          <>
        </>)}
      </div>
    </>
  );
}

export default Manager;
