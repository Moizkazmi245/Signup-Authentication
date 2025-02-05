import { onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth } from "./firebaseconfig.js";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, where  } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { db } from "./firebaseconfig.js"




const logOut_btn = document.querySelector('#logOut_btn');

 onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("user is logged in");
    const uid = user.uid;
    console.log(uid);
    
    getUserdData()

  } else {
    console.log("user is not logged in");
    window.location = "./login.html"


  }
});



const task = document.querySelector('#task');
const description = document.querySelector('#description');
const addTodo = document.querySelector('#addTodo');
const container = document.querySelector('.container-todo');

addTodo.addEventListener('click', UserTodo)


let todos = [];

async function UserTodo() {
    try {
        const now = new Date();
        const docRef = await addDoc(collection(db, "users"), {
            task: task.value,
            description: description.value,
            createdAt: now.toISOString().split('T')[0],
            Time: now.toTimeString().split(' ')[0],
            uid: auth.currentUser.uid,
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
      const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            todos.push({ ...doc.data(), DocId: doc.id, uid: auth.currentUser.uid })
            console.log("Data==>", doc.data(), "DocID==>", doc.id);
        });
        console.log(todos);
        
        renderTodo(todos)
        // todos.push({
        // ...doc.data(),
        //   docId : doc.id,
          
          
        // })

    } catch (error) {
        console.log(error);

    }
}

function renderTodo(todo) {
    todo.sort((a, b) => a.task.localeCompare(b.task)
    )

    container.innerHTML = "";

    todo.forEach((todos) => {
        container.innerHTML += `<div class="card-div">
    <h3>Task: ${todos.task}</h3>
    <p>Description: ${todos.description}</p>
    <p>Date: ${todos.createdAt}</p>
    <p>Time: ${todos.Time}</p>
    <div class="btn-flex">
    <button class="delete-btn">Delete</button>
    <button class="edit-btn">Edit</button>
    </div>
    </div>`
    })

    const deleteBtn = document.querySelectorAll('.delete-btn');
    const editBtn = document.querySelectorAll('.edit-btn');
    
    
    deleteBtn.forEach((item, index) => {
        item.addEventListener('click', async function () {
            const confirmDelete = confirm("Are you confirm to delete this")
            if(confirmDelete){
            await deleteDoc(doc(db, "users", todos[index].DocId));
            todos.splice(index, 1)
            renderTodo(todos)
            alert("Deleted Successfully")
            }
    
        })
    })

    editBtn.forEach((item, index) => {
    item.addEventListener('click', async function () {
        const updatedValue = prompt("Enter updated task value:", todos[index].task);
        
        if (updatedValue) {
            const docRef = doc(db, "users", todos[index].DocId);
            await updateDoc(docRef, {
                task: updatedValue
            });

            alert("Updated successfully");
            todos[index].task = updatedValue;
            renderTodo(todos)
        }else {
            alert("No changes made")
        }
    });
});
}





logOut_btn.addEventListener('click', logOutUser)

function logOutUser(){
  signOut(auth).then(() => {
    window.location = './login.html'
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
    alert(error)
  });
}