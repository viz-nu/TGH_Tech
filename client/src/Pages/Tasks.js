import React from 'react'
import { useNavigate } from "react-router-dom"
import InputFeild from '../Components/InputFeild'
import TodoList from '../Components/TodoList'
import { Container, Box, Text, Tabs, TabList, Tab, TabPanels, TabPanel, Button } from "@chakra-ui/react"

const Tasks = () => {
    const navigate = useNavigate()
    return (


        <Container maxW="3xl" centerContent>
            <Box d="flex" alignContent={"center"} p={3} bg={"white"} w="auto" m="40px 0 15px 0" borderRadius="30" borderWidth="1px">
                <Text fontSize="4xl" fontFamily="mono">To-Do</Text>
            </Box>
            <br />
            <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
                <Button colorScheme="blue" width="100%" style={{ marginTop: 15 }} onClick={() => { localStorage.removeItem("user-Token"); navigate("/", { replace: true }); }}> Logout</Button>
            </Box>
            <InputFeild />
            <TodoList />
        </Container>

    )
}

export default Tasks
