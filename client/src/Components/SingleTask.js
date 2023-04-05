import React from 'react'
import axios from 'axios'
import { Badge, Card, CardBody, CardFooter, CardHeader, CircularProgress, CircularProgressLabel, HStack, Heading, Text, useToast } from '@chakra-ui/react'
import { CheckIcon, CloseIcon, DeleteIcon, RepeatIcon, SmallAddIcon } from '@chakra-ui/icons'
const SingleTask = ({ Id, taskname, isCompleted, priority, isCancelled,getUser }) => {
    const toast = useToast()
    const handleDone = async (Id)=>{
        try {
            const { data } = await axios.post(`/api/task/completed`, { id: Id }, {
                headers: {
                    "token": localStorage.getItem("user-Token")
                }
            });
            toast({ title: `${data.message}`, status: "success", duration: 3000, isClosable: true, position: "bottom" });
            getUser()
        } catch (error) {
            console.log(error);
        }
    }
    const handleCancel = async (Id) => {
        try {
            const { data } = await axios.post(`/api/task/cancel`, { "id": Id }, {
                headers: {
                    "token": localStorage.getItem("user-Token")
                }
            });
            toast({ title: `${data.message}`, status: "success", duration: 3000, isClosable: true, position: "bottom" });
            getUser()
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete = async(Id) => {
        try {
            const { data } = await axios.post(`/api/task/delete`, { id:Id }, {
                headers: {
                    "token": localStorage.getItem("user-Token")
                }
            });
            toast({ title: `${data.message}`, status: "success", duration: 3000, isClosable: true, position: "bottom" });
            getUser()
        } catch (error) {
            console.log(error);
        }
    }
    return (
            <Card>
                <CardHeader>
                    {isCancelled ? <s>{taskname}</s> : <Heading size='md'> {taskname}</Heading>}
                </CardHeader>
                <CardBody>
                    <Text>Priority : 
                    <CircularProgress value={priority*11} color='red.400'>
                        <CircularProgressLabel> {priority} </CircularProgressLabel>
                        </CircularProgress></Text>
                    <Text>Status : {isCompleted ? <Badge colorScheme='green'>Success</Badge> : <Badge colorScheme='red'>incomplete</Badge>}</Text>
                </CardBody>
                <CardFooter>
                    <HStack spacing="150px">
                        {isCompleted ? <RepeatIcon color="yellow.500" onClick={() => handleDone(Id)} /> : <CheckIcon color="green.500" onClick={() => handleDone(Id)} />}
                        {isCancelled ? <SmallAddIcon color="green.500" onClick={() => handleCancel(Id)} /> : <CloseIcon color="red.500" onClick={() => handleCancel(Id)} />}
                        <DeleteIcon color="red.900" onClick={() => handleDelete(Id)} />
                    </HStack>
                </CardFooter>
            </Card>
    )
}

export default SingleTask
