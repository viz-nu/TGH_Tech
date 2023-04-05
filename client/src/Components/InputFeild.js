import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { HStack } from "@chakra-ui/layout";
import { useToast } from '@chakra-ui/react';
import { useState } from "react";
import axios from "axios"
const InputFeild = () => {
    const [taskName, setTaskName] = useState("");
    const [taskPriority, setTaskPriority] = useState(1);
    const toast = useToast()
    const submitHandler = async (e) => {
        try {
            e.preventDefault()
            if (!taskName || !taskPriority) return toast({ title: "Please Fill all the Feilds", status: "warning", duration: 3000, isClosable: true, position: "bottom", });
            if (!(taskPriority < 10) || !(taskPriority > 0)) return toast({ title: "Please specify number [1-9]", status: "warning", duration: 3000, isClosable: true, position: "bottom", });
            console.log({ taskname: taskName, priority: +taskPriority, isCompleted: false, isCancelled: false });
            const { data } = await axios.post(`/api/task/add`, { taskname: taskName, priority: taskPriority, isCompleted: false, isCancelled: false }, {
                headers: {
                    "token": localStorage.getItem("user-Token")
                }
            });
            toast({ title: `${data.message}`, status: "success", duration: 3000, isClosable: true, position: "bottom" });
        } catch (error) {
            console.log(error);
        }
    }
    return (

        <HStack spacing="10px">
            <FormControl isRequired>
                <Input type="text" placeholder='Enter a task' onChange={(e) => setTaskName(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
                <Input type='number' placeholder='Enter Priority number [1-9]' onChange={(e) => setTaskPriority(e.target.value)} />
            </FormControl>
            <Button type='submit' colorScheme="blue" style={{ borderRadius: "50%" }} onClick={submitHandler} >GO</Button>
        </HStack>

    )
}

export default InputFeild
