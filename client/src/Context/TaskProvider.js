import React, { useContext, createContext, useState } from 'react';
const TaskContext = createContext();
const TaskProvider = ({ children }) => {
    const [user, setUser] = useState()

    const [tasks, setTasks] = useState([])


    return (
        <TaskContext.Provider value={{ user, setUser, tasks, setTasks }}>
            {children}
        </TaskContext.Provider>
    )
}
export const TaskState = () => useContext(TaskContext)

export default TaskProvider
