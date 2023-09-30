
import { useEffect,useState } from "react";
import Axios from "axios"

function App() {
  const [id,setId] = useState("");
  const [name,setName] = useState("")
  
  const [users,setUsers] = useState([]);
  const [updated,setUpdated]  = useState({id:"",name:""})


  useEffect(()=>{
    loadData()
  },[]);
   
    //GET USER FROM API

  const loadData = async ()=>{
    const response = await Axios.get("http://localhost:3002/users")
    console.log(response.data)
    setUsers(response.data)
  }
 
  //ADD USER

  const addUser = (e)=>{
    e.preventDefault()
     Axios.post("http://localhost:3002/users",{id,name})
     .then(()=>{
      setId("");setName("");
     }).catch((err)=>{
      console.log(err)
     })


     setTimeout(()=>{
      loadData();
     },500)
  }


  //DELETE USER

  const deleteUser = (id)=>{
    Axios.delete(`http://localhost:3002/users/${id}`)

    setTimeout(()=>{
      loadData();
    },200)
  }


  //UPDATE USER


  const updateUser = ()=>{
    Axios.put(`http://localhost:3002/users/${updated.id}`,{id:updated.id,name:updated.name})
    .then((response)=>{
      console.log(response);
     
     
    })
    .catch((err)=>{
      console.log(err)
    })


    setTimeout(()=>{
      loadData()
    },200)
  }


  


  



  



  return (
    <div className="App">

      <h1>CRUD APP USING JSON-SERVER</h1>
      <input type="number" placeholder="ENTER ID..." value={id} onChange={e=>setId(e.target.value)}/>
      <input type="text" placeholder="ENTER NAME..." value={name} onChange={e=>setName(e.target.value)}/>
      <button onClick={addUser}>ADD USER</button>
     
       {users.map((e=>(
        <div key={e.id}>

          {e.id}  {e.name} <button onClick={()=>deleteUser(e.id)}>DELETE</button>
        </div>
       )))}
         

         <input type="number" placeholder="ENTER UPDATE ID" onChange={e=>setUpdated({...updated,id:e.target.value})}/>
         <input type="text" placeholder="ENTER UPDATE NAME" onChange={e=>setUpdated({...updated,name:e.target.value})}/>
         <button onClick={updateUser}>UPDATE USER</button>
       
    </div>
  );
}

export default App;
