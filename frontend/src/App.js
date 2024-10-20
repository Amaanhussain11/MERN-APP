import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users').then(
      res => res.json()

    ).then(
      result => {
        if(result && Array.isArray(result.data)){
          setUsers(result.data);
        }
        else{
          console.log("Its not an array");
          console.log(result)
          setUsers([]);
        }
      }
    ).catch(err =>{
      console.log("Error fetching users",err);
      setUsers([]);
    })
  }, []);
  return (
    <>
      <div>
        <h1>User List</h1>
        <ul>
          {
            users.map(user => (
              <li key={user._id}>{user.name} - {user.email} - {user.age}</li>
            ))
          }
        </ul>
      </div>
    </>
  );
}

export default App;
