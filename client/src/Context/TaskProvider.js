import React, { useContext, createContext, useState } from 'react';
const TaskContext = createContext();
const TaskProvider = ({ children }) => {
    const [user, setUser] = useState()

    const [allTasks, setAllTasks] = useState([])


    return (
        <TaskContext.Provider value={{ user, setUser, allTasks, setAllTasks }}>
            {children}
        </TaskContext.Provider>
    )
}
export const TaskState = () => useContext(TaskContext)

export default TaskProvider
