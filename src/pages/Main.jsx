import React, { useEffect, useState } from "react";
import SearchDatabase from "../components/SearchDatabase";
import Usertable from "../components/Usertable";

function App() {
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    try{
    const res = await fetch(`https://dummyjson.com/users`);
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    const json = await res.json();
    setUsers(json.users)
    }
    catch(e){
      console.error(e)
      throw new Error(`Ошибка: ${e}`)
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{margin:`20px`}}>
      <h1>Тестовое задание JS</h1>
      <div>
        <SearchDatabase setUsers={setUsers} fetchUsers={fetchUsers}/>
        <Usertable userTable={users} />
      </div>
    </div>
  );
}

export default App;
