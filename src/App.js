import {BrowserRouter,
    Routes,
    Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Header from "./components/header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])

    useEffect(() => {
    const getTasks = async () => {
        const taskFromServer = await fetchTasks()
        setTasks((taskFromServer))
    }
        getTasks()
    }, [])

    //fetch tasks
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()
        return(data)
    }


    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()
        return(data)
    }



    //Add
    const addTask = async (task) => {
        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        const data = await res.json()

        setTasks([...tasks, data])

       /* const id = Math.floor(Math.random() * 1000) + 1
        const newTask = {id, ...task }
        setTasks([...tasks, newTask])*/
    }
    //Delete Task
    const deleteTask = async (id) => {
        //Call Delete
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE',
        })
        //reload to do without task
        setTasks(tasks.filter((task) => task.id !==id))
    }

    //Toggle Reminder
    const toggleReminder = async (id) => {
    console.log(id)
        const taskToToggle = await fetchTask(id)
        const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updTask)
            })
        const data = await res.json()
        setTasks(tasks.map((task) => task.id === id
    ? {...task, reminder: !task.reminder} : task))
    }

  return (
      <BrowserRouter>
    <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)}
                showAddTask={showAddTask}
                title = "Task To Do"/>
        {showAddTask && <AddTask
            onAdd={addTask}/>}
        {tasks.length > 0 ?
            <Tasks tasks={tasks} onToggle =
                {toggleReminder} onDelete={deleteTask}/>
            : 'No Tasks Available'}
        <Routes>
        <Route path ='/about' component={About}/>
        </Routes>
        <Footer />
        </div>
        </BrowserRouter>
  )
}

export default App;
