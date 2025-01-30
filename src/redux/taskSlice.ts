import {createSlice,PayloadAction} from "@reduxjs/toolkit";
import { title } from "process";
import { act } from "react";

interface Task {
    id : number;
    tittle : string;
    completed : boolean;

}

interface TaskState{
  tasks :Task[];
}

const initialState : TaskState ={tasks:[]}

const taskSlice = createSlice({
    name : 'tasks',
    initialState,
    reducers : {
      setTasks(state,action : PayloadAction<Task[]>){
        state.tasks = action.payload;
      },
      addTask(state,action:PayloadAction<string>){
        state.tasks.push({
            id:Date.now(),
            tittle:action.payload,
            completed : false
        });
      },
      toggleTask(state,action : PayloadAction<number>) {
        const task = state.tasks.find((t)=>t.id ===action.payload)
        if(task) task.completed = !task.completed;
      },
      deleteTask(state,action : PayloadAction<number>){
        state.tasks = state.tasks.filter((t)=>t.id !==action.payload)
      }

    }
})

export const {setTasks,toggleTask,addTask,deleteTask} = taskSlice.actions;
export default taskSlice.reducer;