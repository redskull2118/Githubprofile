import {useState,useEffect} from "react"
import './App.css';
export default function  Homepage(){
    const[data1,setdata]=useState(null);
    const[user,setuser]= useState('');
   
    const handelinput=(e)=>
    {
        setuser(e.target.value);
    }  
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch(`https://api.github.com/users/${user}`);
          if (response.ok) {
            const data = await response.json();
            setdata(data);
          } else {
            console.error('Error fetching user info');
          }
        } catch (error) {
          console.error('Error fetching user info', error);
        }
      };

    return(
        <>
    <section className="contact section">
    <div class="curve"></div>
    <div class="curveleft"></div>
     <div className="App home">
     <h2 className="section-title"> User Github Public Information</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={user}
            onChange={handelinput}
          />
          <button type="submit">Search</button>
        </form>
      </div>
         {data1 && (
        <div className="card">
          <img src={data1.avatar_url} alt="Avatar" className="avatar" />
          <div className="innercard">
          <h2>{data1.login}</h2>
          {data1.name && <p>Name: {data1.name}</p>}
          <p>Public Repos: {data1.public_repos}</p>
          <p>Public Gists: {data1.public_gists}</p>
          <p>Profile Created At: {new Date(data1.created_at).toLocaleDateString('en-US')}</p>
        </div>
        </div>
      )}
      </div>
      </section>
        </>
    )
}