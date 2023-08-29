// const [showAddTask, setShowAddTask] = useState(false)
// const [tasks, setTasks] = useState([])

// useEffect(() => {
//     const getTasks = async () => {
//         const tasksFromServer = await fetchTasks()
//         setTasks(tasksFromServer)
//     }

//     getTasks()
// }, [])

// // Fetch Tasks
// const fetchTasks = async () => {
//     const res = await fetch('http://localhost:5000/tasks')
//     const data = await res.json()

//     return data
// }

// // Fetch Task
// const fetchTask = async (id) => {
//     const res = await fetch(`http://localhost:5000/tasks/${id}`)
//     const data = await res.json()

//     return data
// }

// // Add Task
// const addTask = async (task) => {
//     const res = await fetch('http://localhost:5000/tasks', {
//         method: 'POST',
//         headers: {
//             'Content-type': 'application/json',
//         },
//         body: JSON.stringify(task),
//     })

//     const data = await res.json()

//     setTasks([...tasks, data])

//     // const id = Math.floor(Math.random() * 10000) + 1
//     // const newTask = { id, ...task }
//     // setTasks([...tasks, newTask])
// }

// // Delete Task
// const deleteTask = async (id) => {
//     const res = await fetch(`http://localhost:5000/tasks/${id}`, {
//         method: 'DELETE',
//     })
//     //We should control the response status to decide if we will change the state or not.
//     res.status === 200
//         ? setTasks(tasks.filter((task) => task.id !== id))
//         : alert('Error Deleting This Task')
// }

// // Toggle Reminder
// const toggleReminder = async (id) => {
//     const taskToToggle = await fetchTask(id)
//     const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

//     const res = await fetch(`http://localhost:5000/tasks/${id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-type': 'application/json',
//         },
//         body: JSON.stringify(updTask),
//     })

//     const data = await res.json()

//     setTasks(
//         tasks.map((task) =>
//             task.id === id ? { ...task, reminder: data.reminder } : task
//         )
//     )
// }

import { redirect } from "react-router-dom"
import { IS_ADMIN, IS_HOD, IS_SECRETARY, user } from "../utils/constants";

export const apiURL = "http://localhost:3333";

// User LOGIN
export const loginUser = async (credentials) => {
    const res = await fetch(`${apiURL}/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(credentials),
    })

    const data = await res.json()

    if (res.status === 200) {
        localStorage.setItem('token', data.token);
        localStorage.setItem("user", data.user);
        localStorage.setItem('loggedIn', true);
    } else {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data

    // setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('loggedIn');


    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
}


export async function requireAuth(request) {

    const pathname = new URL(request.url).pathname
    const isLoggedIn = localStorage.getItem("loggedIn")

    if (!isLoggedIn) {
        throw redirect(`/login?message=Desole! Vous devez vous connectez d'abord.&redirectTo=${pathname}`)
    } else return true
}

export async function requireAuthorization(request, rule) {
    let USER_ROLE = ""
    const pathname = new URL(request.url).pathname

    if (user.role.isAdmin) {
        USER_ROLE = IS_ADMIN
    } else {
        if (user.role.isHOD) {
            USER_ROLE = IS_HOD
        } else {
            USER_ROLE = IS_SECRETARY
        }
    }

    const isAuthorized = USER_ROLE == rule

    if (!isAuthorized) {
        throw redirect(`&redirectTo=${pathname}`)
    } else return true
}

