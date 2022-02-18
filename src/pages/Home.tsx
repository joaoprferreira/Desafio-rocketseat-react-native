import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks((prevState) => [...prevState, newTask])
  }

  function handleToggleTaskDone(id: number) {
  //TODO - toggle task done if exists
    const getAllTasks = tasks.map((task) => ({...task}))
    const foundItems = getAllTasks.find(item => item.id === id)
    
    if(!foundItems) return;

    foundItems.done = !foundItems.done

    setTasks(getAllTasks)
  }

  function handleRemoveTask(id: number) {
    const updateTask = tasks.filter((item) => (item.id !== id))
    setTasks(updateTask)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})