import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { db } from "./firebaseconfig.js"


const task = document.querySelector('#task');
const description = document.querySelector('#description');
const addTodo = document.querySelector('#addTodo');


addTodo.addEventListener('click', UserTodo)


async function UserTodo() {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            task: task.value,
            description: description.value,
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    task.value = ""
    description.value = ""
}