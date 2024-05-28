
import { useEffect, useState } from "react"
import { TodoProvider } from "./contexts/TodoContext.js"
import TodoForm from "./components/TodoForm.jsx"
import TodoItem from "./components/TodoItem.jsx"
import React from "react";
import tour from "./shepherdjs.jsx";

tour.addStep({
  id: 'example-step',
  title: 'TODO APP',
  text: 'This is a simple TODO application which lets u add TODOS, edit and delete them when completed.',
  attachTo: {
    element: '.y',
    on: 'bottom',
  },
  arrow: false,
  classes: 'example-step-extra-class',
  buttons: [
    {
      text: 'Exit >',
      action: () => {
        tour.cancel();
      },
    },
    {
      text: 'Next >',
      action: () => {
        tour.next();
      },
    },
    
  ],
});

tour.start();

tour.addStep({
  id: 'example-step',
  title: 'Add Todo Button',
  text: 'This Button will add a TODO to the Dashboard. Now Try to add a Todo!',
  attachTo: {
    element: '#x',
    on: 'bottom',
  },
  arrow: true,
  classes: 'example-step-extra-class',
  buttons: [
    {
      text: '< Back',
      action: () => {
        tour.back();
      },
    },
    {
      text: 'Next >',
      action: () => {
        tour.next();
      },
    },
  ],
});

tour.addStep({
  id: 'example-step',
  title: 'Edit TODO Button',
  text: 'This Button will edit the TODO.',
  attachTo: {
    element: '#j',
    on: 'left',
  },
  arrow: true,
  classes: 'example-step-extra-class',
  buttons: [
    {
      text: '< Back',
      action: () => {
        tour.back();
      },
    },
    {
      text: 'Next >',
      action: () => {
        tour.next();
      },
    },
  ],
});

tour.addStep({
  id: 'example-step',
  title: 'Delete TODO Button',
  text: 'This Button will Delete the TODO.',
  attachTo: {
    element: '#k',
    on: 'bottom',
  },
  arrow: true,
  classes: 'example-step-extra-class',
  buttons: [
    {
      text: '< Back',
      action: () => {
        tour.back();
      },
    },
    {
      text: 'Next >',
      action: () => {
        tour.next();
      },
    },
  ],
});

tour.addStep({
  id: 'example-step',
  title: 'CheckBox Button',
  text: 'This Button will Check the TODO.',
  attachTo: {
    element: '#m',
    on: 'bottom',
  },
  arrow: true,
  classes: 'example-step-extra-class',
  buttons: [
    {
      text: '< Back',
      action: () => {
        tour.back();
      },
    },
    {
      text: 'Finish >',
      action: () => {
        tour.next();
      },
    },
  ],
});




function App() {
  
  
  const [todos, setTodos] = useState(["Dummy"]) ///Because yaha se values store hongi na..
  const addTodo= (todo)=>{
    setTodos((prev)=> [{id: Date.now(), ...todo}, ...prev])  //This line will spread the existing todo and assign a unique id to every todo and add the new todo to the existing list if any...agar hum setTodos(todo) aise likhte to vo sare todos ko overwrite kr deta.
  }

  const updateTodo=(id, todo)=>{setTodos((prev)=> prev.map((prevTodo)=> (prevTodo.id=== id ? todo : prevTodo)))};
  //sbse pehle prev todos ka access liya then uspe loop lagaya then jo prevTodo ko update krna tha uski id se passed id ko compare kiya then agar match kr gya to overwrite kr diya aur nahi mila to chor diya

  const deleteTodo=(id)=>{setTodos((prev)=> prev.filter((todo)=> todo.id !== id))} //It works on true toh jo jo id...passed id se match nahi hogii vo aati jayegi aur jo ho gyii usee hata dega

  const toggleComplete=(id)=>{setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id===id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))}

    
  useEffect(()=>{
    const todos= JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length >0){
      setTodos(todos)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))  //iska mtlb local storage me daal diya todos
  },[todos])

  return (
    <TodoProvider value={{todos, deleteTodo, addTodo, updateTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2 y" >Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=>(
                          <div key={todo.id} className="w-full">
                            <TodoItem todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
                </div>
            
    </TodoProvider>
  )
}

export default App
