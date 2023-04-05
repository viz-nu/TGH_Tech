import React from 'react'
import { TaskState } from '../Context/TaskProvider'
import SingleTask from "./SingleTask"
import { SimpleGrid } from '@chakra-ui/react'
const TodoList = ({ getUser }) => {
    const { allTasks } = TaskState()

    return (
        <SimpleGrid templateColumns='repeat(auto-fill, minmax(200px))'>
            {allTasks.map((ele, index) => <SingleTask key={index} Id={ele._id} taskname={ele.taskname} isCompleted={ele.isCompleted} priority={ele.priority} isCancelled={ele.isCancelled} getUser={getUser} />)}
        </SimpleGrid>
    )
}

export default TodoList
