import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Notification.css';
import "../Header/Header";
import Header from '../Header/Header';

function Notification() {
  const { memberId, isMember } = useParams(); // Access isMember directly here
  const isMemberBool = isMember === "true"; 
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newProgress, setNewProgress] = useState('');
  const [taskIdToUpdate, setTaskIdToUpdate] = useState(null);
  
console.log(isMember);
console.log(memberId);
console.log(isMemberBool);
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/tasks/${memberId}`);
      console.log('Tasks response:', response.data); // Log the response data

      // Check if the response was successful and contains tasks
      if (response.data.success && Array.isArray(response.data.tasks)) {
        setTasks(response.data.tasks);
      } else {
        console.error('Error: Tasks data not found in the response');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [memberId]);

  const isDeadlineDate = (date) => {
    return tasks.some(task => {
      const taskDate = new Date(task.deadline);
      return taskDate.toDateString() === date.toDateString();
    });
  };

  const tileContent = ({ date }) => {
    if (isDeadlineDate(date)) {
      return <div className="deadline-marker"></div>;
    }
    return null;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(taskIdToUpdate);
      const response = await axios.put(`http://localhost:4000/tasks/${taskIdToUpdate}`, {
        progress: newProgress
      });
      console.log('Progress updated successfully:', response.data);
      fetchTasks();
      setNewProgress('');
      setTaskIdToUpdate(null); // Reset taskIdToUpdate after form submission
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  return (
    <div>
      <Header/>
      <h1>Notifications</h1>
      <hr />
      {isMemberBool ?
      <>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <h2>Tasks Calendar</h2>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileContent={tileContent}
          />
          <div>
            <h3>Tasks for {selectedDate.toDateString()}</h3>
            <ul>
              {tasks
                .filter(task => {
                  const taskDate = new Date(task.deadline);
                  return taskDate.toDateString() === selectedDate.toDateString();
                })
                .map(task => (
                  <li key={task._id}>
                    Task Description: {task.description} <br/>
                    Accomplished work percentage: {task.progress}<br/>
                    {taskIdToUpdate === task._id ? (
                      <form onSubmit={handleFormSubmit}>
                        <label>
                          New Progress:
                          <input 
                            type="text" 
                            value={newProgress} 
                            onChange={(event) => setNewProgress(event.target.value)} 
                            required 
                          />
                        </label>
                        <button type="submit">Update</button>
                      </form>
                    ) : (
                      <button onClick={() => setTaskIdToUpdate(task._id)}>Update progress</button>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      </>
    :(<></>)}
      
    </div>
  );
}

export default Notification;
