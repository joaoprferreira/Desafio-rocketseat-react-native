import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTasksArgs = {
  taskId: number;
  TaskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    
    const titlesOfTask = tasks.map(item => item.title)
    const resultsFind = titlesOfTask.find(task => task === newTask.title)
    
    switch (resultsFind) {
      case newTaskTitle:
        return Alert.alert(
          'Task já cadastrada',
          'Você não pode cadastrar uma task com o mesmo nome',
          [
            {
              text: 'Ok',
              onPress: () => {}
            },
            
          ]
          )
        }

    setTasks((prevState) => [...prevState, newTask])
  }

  function handleEditTask({taskId,TaskNewTitle}: EditTasksArgs) {
    const getAllTasksToEdit = tasks.map(task => ({...task}))
    const getTaskActual = getAllTasksToEdit.find(task => taskId === task.id)

    if(!getTaskActual){return};

    getTaskActual.title = TaskNewTitle;
  }

  function handleToggleTaskDone(id: number) {
    const getAllTasks = tasks.map((task) => ({ ...task }))
    const foundItems = getAllTasks.find(item => item.id === id)

    if (!foundItems) return;

    foundItems.done = !foundItems.done

    setTasks(getAllTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remove esse item?',
      [
        {
          text: 'Não',
          onPress: () => {return}
        },
        {
          text: 'Sim',
          onPress: () => {removeTask()}
        }
      ]
      )

    const removeTask = () => {
      setTasks(tasks.filter((item) => (item.id !== id)))
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
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