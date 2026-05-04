import { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [showBox, setShowBox] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  const [myUser, setMyUser] = useState({
    id: null,
    email: '',
    name: '',
    company: '',
    active: false,
    loginTime: '',
    role: '',
    phone: ''
  });

  useEffect(() => {
    loadUsers();
  }, []);

  function loadUsers() {
    fetch('http://localhost:8080/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }

  function handleInput(e) {
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setMyUser({ ...myUser, [e.target.name]: value });
  }

  function saveUser(e) {
    e.preventDefault();
    
    if (myUser.id == null) {
      fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(myUser)
      }).then(() => {
        setShowBox(false);
        loadUsers();
      });
    } else {
      fetch('http://localhost:8080/api/users/' + myUser.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(myUser)
      }).then(() => {
        setShowBox(false);
        loadUsers();
      });
    }
  }

  function deleteUser(id) {
    if (window.confirm("Do you want to delete this record?")) {
      fetch('http://localhost:8080/api/users/' + id, {
        method: 'DELETE'
      }).then(() => {
        loadUsers();
      });
    }
  }

  function clickEdit(user) {
    setMyUser(user);
    setShowBox(true);
  }

  function clickDetails(user) {
    setMyUser(user);
    setShowDetails(true);
  }

  function clickCreate() {
    setMyUser({ id: null, email: '', name: '', company: '', active: false, loginTime: 'Just now', role: '', phone: '' });
    setShowBox(true);
  }

  return (
    <div>
      <p>
        <span>CoreMvcEvaluation</span> | <a href="/">Home</a> | <a href="/">Users</a> | <a href="/">Employee Types</a>
      </p>

      <hr />

      <h2>User List</h2>
      <button onClick={clickCreate}>Create New</button>
      <br /><br />

      <table border="1">
        <thead>
          <tr>
            <th>Email Address</th>
            <th>Display Name</th>
            <th>Company Name</th>
            <th>User is Active</th>
            <th>Last Login</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.name}</td>
              <td>{u.company}</td>
              <td>
                <input type="checkbox" checked={u.active} readOnly />
              </td>
              <td>{u.loginTime}</td>
              <td>
                <button onClick={() => clickEdit(u)}>Edit</button> 
                <button onClick={() => clickDetails(u)}>Details</button> 
                <button onClick={() => deleteUser(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showBox && (
        <div style={{ marginTop: '20px', border: '1px solid black', padding: '10px', width: '300px' }}>
          <h3>{myUser.id ? "Edit User" : "Add User"}</h3>
          <form onSubmit={saveUser}>
            <p>Email: <input name="email" value={myUser.email} onChange={handleInput} required /></p>
            <p>Name: <input name="name" value={myUser.name} onChange={handleInput} required /></p>
            <p>Company: <input name="company" value={myUser.company} onChange={handleInput} required /></p>
            <p>Role: <input name="role" value={myUser.role} onChange={handleInput} /></p>
            <p>Phone: <input name="phone" value={myUser.phone} onChange={handleInput} /></p>
            <p><input type="checkbox" name="active" checked={myUser.active} onChange={handleInput} /> Active</p>
            
            <button type="submit">Save</button>
            <button type="button" onClick={() => setShowBox(false)}>Cancel</button>
          </form>
        </div>
      )}

      {showDetails && (
        <div style={{ marginTop: '20px', border: '1px solid black', padding: '10px', width: '300px' }}>
          <h3>View Details</h3>
          <p><b>ID:</b> {myUser.id}</p>
          <p><b>Email:</b> {myUser.email}</p>
          <p><b>Name:</b> {myUser.name}</p>
          <p><b>Company:</b> {myUser.company}</p>
          <p><b>Role:</b> {myUser.role}</p>
          <p><b>Phone:</b> {myUser.phone}</p>
          <p><b>Active:</b> {myUser.active ? "Yes" : "No"}</p>
          <p><b>Login Time:</b> {myUser.loginTime}</p>
          <button onClick={() => setShowDetails(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;
