
import React, { useState, useEffect } from 'react'
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { VStack } from "@chakra-ui/layout";
import { useToast } from '@chakra-ui/react';
import axios from "axios"
import { useNavigate } from "react-router-dom"
const Register = () => {
    const navigate = useNavigate()
    const toast = useToast()
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [picLoading, setPicLoading] = useState(false);

    const submitHandler = async (e) => {
        setPicLoading(true);
        if (!name || !email || !password || !confirmpassword) {
            toast({ title: "Please Fill all the Feilds", status: "warning", duration: 3000, isClosable: true, position: "bottom", });
            setPicLoading(false);
            return;
        }
        if (password !== confirmpassword) {
            toast({ title: "Passwords Do Not Match", status: "warning", duration: 3000, isClosable: true, position: "bottom", });
            setPicLoading(false);
            return;
        }

        try {

            const { data } = await axios.post("/api/user/register", { name: name, email: email, password: password });
            toast({ title: "Registration Successful", status: "success", duration: 3000, isClosable: true, position: "bottom" });
            localStorage.setItem("user-Token", data.token);
            navigate("/tasks", { replace: true })
            setPicLoading(false);

        } catch (error) {
            toast({ title: "Error Occured!", description: error.response.data.message, status: "error", duration: 3000, isClosable: true, position: "bottom", });
            setPicLoading(false);
        }

    }

    useEffect(() => {
        if (localStorage.getItem("user-Token")) navigate("/tasks", { replace: true })
        // eslint-disable-next-line
    }, [])


    return (

        <VStack spacing="5px">
            <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input placeholder='enter your full name' onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input type="email" placeholder="Enter Your Email Address" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input type={show ? "text" : "password"} placeholder='enter your Passord' onChange={(e) => setPassword(e.target.value)} />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                    <Input type={show ? "text" : "password"} placeholder='enter your Passord' onChange={(e) => setConfirmpassword(e.target.value)} />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button colorScheme="blue" width="100%" style={{ marginTop: 15 }} onClick={submitHandler} isLoading={picLoading}> Sign Up</Button>
        </VStack>

    )
}

export default Register
