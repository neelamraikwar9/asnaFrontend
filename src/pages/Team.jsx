import './team.css';
import Navbar from '../components/Navbar';
import axios from 'axios';
import {useState, useEffect} from 'react';



const Team = () => {
  const [teams, setTeams] = useState([]);
  
  async function fetchTeam(){
    try{
    const res = await axios.get("https://asna-backend.vercel.app/teams");
    console.log(res.data, "cheifijdf")
    setTeams(res.data);
    console.log(res.data, "checking memd")
    console.log(Array.isArray(teams)); // should be true

    } catch(error){
      throw error;
    }
  }

  useEffect(() => {
    fetchTeam();
  }, []);
  
  return (
    <main className="OuterCon">
    <div className="navbar">
        <Navbar/>
     </div>

      <div className="projTasksCon">
      <div className="con">
        <h1>Teams</h1>
        <button className='btn teamBtn'>+ New Team</button>
      </div>
        <div className="cardCon">
        {teams.slice(2).map((team) => 
          <div key={team._id} className="teamCard">
            <p><strong>{team.name}</strong></p>
            <div key={team._id} className="userProf">{team.member.map((mem) => (
              <p key={mem._id} className="prof">{mem.name.charAt(0).toUpperCase()}</p>
            ))}</div>

            <p><strong>Team Members:</strong> {team.member.map((mem) => mem.name).join(", ")}</p>
          </div>
        )}
        </div>
      </div>
     </main>
  )
}

export default Team;