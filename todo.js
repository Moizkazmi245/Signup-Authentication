import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { db } from "./firebaseconfig.js"


const task = document.querySelector('#task');
const description = document.querySelector('#description');
const addTodo = document.querySelector('#addTodo');
const container = document.querySelector('.container-todo');
getUserdData()

addTodo.addEventListener('click', UserTodo)


async function UserTodo() {
    try {
        const now = new Date();
        const docRef = await addDoc(collection(db, "users"), {
            task: task.value,
            description: description.value,
            createdAt: now.toISOString().split('T')[0],
            Time: now.toTimeString().split(' ')[0],
        });
        console.log("Document written with ID: ", docRef.id)
        getUserdData()
        task.value = ""
        description.value = ""
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

async function getUserdData() {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        let todos = [];
        querySnapshot.forEach((doc) => {
            todos.push(doc.data())
            console.log("Data==>", doc.data());
        });
        renderTodo(todos)

    } catch (error) {
        console.log(error);

    }
}

function renderTodo(todo){
    todo.sort((a,b) => a.task.localeCompare(b.task)
    )

    container.innerHTML = "";

    todo.forEach((todos) =>{
        container.innerHTML += `<div class="card-div">
            <h3>Task: ${todos.task}</h3>
            <p>Description: ${todos.description}</p>
            <p>Date: ${todos.createdAt}</p>
            <p>Time: ${todos.Time}</p>
        </div>`
    })
}