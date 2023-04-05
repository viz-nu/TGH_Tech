import React, { useEffect } from 'react'
import { TaskState } from '../Context/TaskProvider'

import axios from "axios"
import { Button, Card, CardBody, CardFooter, CardHeader, Heading, SimpleGrid, Text } from '@chakra-ui/react'
const TodoList = () => {
    const { tasks, setTasks } = TaskState()
    const getTasks=async()=>{
        try {
            
        } catch (error) {
            
        }
    }
    useEffect(() => {
     getTasks()
    }, [])
    
  return (
    <div>
          <SimpleGrid templateColumns='repeat(auto-fill, minmax(200px))'>
              <Card>
                  <CardHeader>
                      <Heading size='md'> name of Task</Heading>
                  </CardHeader>
                  <CardBody>
                      <Text>Priority number :5</Text>
                  </CardBody>
                  <CardFooter>
                      <Button>Completed</Button>
                      <Button>Cancelled</Button>
                      <Button>Delete</Button>
                  </CardFooter>
              </Card>
              <Card>
                  <CardHeader>
                      <Heading size='md'> Customer dashboard</Heading>
                  </CardHeader>
                  <CardBody>
                      <Text>View a summary of all your customers over the last month.</Text>
                  </CardBody>
                  <CardFooter>
                      <Button>View here</Button>
                  </CardFooter>
              </Card>
              <Card>
                  <CardHeader>
                      <Heading size='md'> Customer dashboard</Heading>
                  </CardHeader>
                  <CardBody>
                      <Text>View a summary of all your customers over the last month.</Text>
                  </CardBody>
                  <CardFooter>
                      <Button>View here</Button>
                  </CardFooter>
              </Card>
          </SimpleGrid>
    </div>
  )
}

export default TodoList
