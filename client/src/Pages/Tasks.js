import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import InputFeild from '../Components/InputFeild'
import TodoList from '../Components/TodoList'
import { Container, Box, Text, Button} from "@chakra-ui/react"
import axios from 'axios'
import { TaskState } from '../Context/TaskProvider'
import spinner from "../spiner.gif"
const Tasks = () => {
    const navigate = useNavigate()
    const { setUser, setAllTasks } = TaskState()
    const [Loading, setLoading] = useState(false)
    const getUser = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get("/api/user/auth", {
                headers: {
                    "token": localStorage.getItem("user-Token")
                }
            })
             setUser({
                name: data.name,
                email: data.email,
                _id: data._id
            })
             setAllTasks(data.tasks.sort((a, b) => b.priority - a.priority))
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
            if (error.response.data.message === 'Unauthorised or Token Expired'){
                localStorage.removeItem("user-Token"); 
                navigate("/", { replace: true });
            }
        }
    }
    useEffect(() => {
        getUser()
        // eslint-disable-next-line
    }, [])
    return (
        <Container maxW="3xl" centerContent>
            <Box d="flex" alignContent={"center"} p={3} bg={"white"} w="auto" m="40px 0 15px 0" borderRadius="30" borderWidth="1px">
                <Text fontSize="4xl" fontFamily="mono">To-Do</Text>
            </Box>
            <br />
             <Box bg="white" w="70%" p={4}>
                <Button colorScheme="blue" width="100%" style={{ marginTop: 15 }} onClick={() => { localStorage.removeItem("user-Token"); navigate("/", { replace: true }); }}> Logout</Button>
            </Box>
            <br />
            <InputFeild getUser={getUser} />
            <br />
            {Loading ? <img src={spinner} alt="animated gif" /> : <TodoList getUser={getUser} />}
        </Container>
    )
}

export default Tasks


