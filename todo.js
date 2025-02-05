// import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc  } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
// import { db } from "./firebaseconfig.js"


// const task = document.querySelector('#task');
// const description = document.querySelector('#description');
// const addTodo = document.querySelector('#addTodo');
// const container = document.querySelector('.container-todo');
// getUserdData()

// addTodo.addEventListener('click', UserTodo)

// const uid = user.uid;
// console.log(uid);


// async function UserTodo() {
//     try {
//         const now = new Date();
//         const docRef = await addDoc(collection(db, "users"), {
//             task: task.value,
//             description: description.value,
//             createdAt: now.toISOString().split('T')[0],
//             Time: now.toTimeString().split(' ')[0],
//             uid: auth.currentUser.uid,
//         });
//         console.log("Document written with ID: ", docRef.id)
//         getUserdData()
//         task.value = ""
//         description.value = ""
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// }
// let todos = [];

// async function getUserdData() {
//     try {
//         const now = new Date();
//         const querySnapshot = await getDocs(collection(db, "users"));
//         querySnapshot.forEach((doc) => {
//             todos.push({ ...doc.data(), DocId: doc.id })
//             console.log("Data==>", doc.data(), "DocID==>", doc.id);
//         });
//         // renderTodo(todos)
//         todos.push({
//             docId : doc.id,
            
//         })

//     } catch (error) {
//         console.log(error);

//     }
// }

// function renderTodo(todo) {
//     todo.sort((a, b) => a.task.localeCompare(b.task)
//     )

//     container.innerHTML = "";

//     todo.forEach((todos) => {
//         container.innerHTML += `<div class="card-div">
//     <h3>Task: ${todos.task}</h3>
//     <p>Description: ${todos.description}</p>
//     <p>Date: ${todos.createdAt}</p>
//     <p>Time: ${todos.Time}</p>
//     <div class="btn-flex">
//     <button class="delete-btn">Delete</button>
//     <button class="edit-btn">Edit</button>
//     </div>
//     </div>`
//     })

//     const deleteBtn = document.querySelectorAll('.delete-btn');
//     const editBtn = document.querySelectorAll('.edit-btn');
    
    
//     deleteBtn.forEach((item, index) => {
//         item.addEventListener('click', async function () {
//             const confirmDelete = confirm("Are you confirm to delete this")
//             if(confirmDelete){
//             await deleteDoc(doc(db, "users", todos[index].DocId));
//             todos.splice(index, 1)
//             renderTodo(todos)
//             alert("Deleted Successfully")
//             }
    
//         })
//     })

//     editBtn.forEach((item, index) => {
//     item.addEventListener('click', async function () {
//         const updatedValue = prompt("Enter updated task value:", todos[index].task);
        
//         if (updatedValue) {
//             const docRef = doc(db, "users", todos[index].DocId);
//             await updateDoc(docRef, {
//                 task: updatedValue
//             });

//             alert("Updated successfully");
//             renderTodo(todos)
//         }else {
//             alert("No changes made")
//         }
//     });
// });
// }