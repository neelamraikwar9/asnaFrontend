import "./team.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useTaskForm } from '../Context/TaskFormContext';


const Team = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [teamForm, setTeamForm] = useState(false);
  const [members, setMembers] = useState([]);

  async function fetchTeam() {
    try {
      const res = await axios.get("https://asna-backend.vercel.app/teams");
      console.log(res.data, "cheifijdf");
      setTeams(res.data);
      setLoading(false);
      console.log(res.data, "checking memd");
      console.log(Array.isArray(teams)); // should be true;

      const resMember = await axios.get("https://asna-backend.vercel.app/users");
      console.log(resMember.data);
      setMembers(resMember.data);
      setLoading(false);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    fetchTeam();
  }, []);

  const [temForm, setTemForm] = useState({
    name : "",
    member: "",
    description: ""
  });



  function handleTeamOnChange(e){
    const {name, value} = e.target;
    setTemForm((prev)=> ({...prev, [name] : value}));
    console.log(temForm, "chekTeamForm");
  }


  // const handleTeamSubmit = async(e) => {
  //   e.preventDefault();

  //   console.log(temForm, "Detail is adding");

  //   try{
  //     const res = await axios.post("https://asna-backend.vercel.app/teams", JSON.stringify(teamForm), {
  //       headers: {"Content-Type" : "application/json"};
  //     });
  //     // console.log(res.data, "Details added successfully");
  //     toast.success("Team Added successfully.");

  //     setTemForm({
  //        name : "",
  //        member: "",
  //        description: ""
  //     });

  //   } catch(error){
  //     console.log("Error message: ", error.message)

  //     if (error.response) {
  //       console.error("Server error:", error.response.data);
  //       console.error("Status:", error.response.status);
  //       alert(` Error: ${error.response.data.message || "Failed to add Team"}`);
  //     } else if (error.request) {
  //       console.error("Network error:", error.request);
  //       alert("Network error: Please check your internet connection.");
  //     } else {
  //       console.error("Error:", error.message);
  //       alert(` Error: ${error.message}`);
  //     }
  //   }
  // }



  const handleTeamSubmit = async(e) => {
  e.preventDefault();
  console.log(teamForm, "Detail is adding");

  try {
    const res = await axios.post(
      "https://asna-backend.vercel.app/teams",
      JSON.stringify(teamForm),
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    toast.success("Team Added successfully.");
    setTemForm({
      name: "",
      member: "",
      description: ""
    });
  } catch(error) {
    console.log("Error message: ", error.message);

    // if (error.response) {
    //   console.error("Server error:", error.response.data);
    //   console.error("Status:", error.response.status);
    //   alert(` Error: ${error.response.data.message || "Failed to add Team"}`);
    // } else if (error.request) {
    //   console.error("Network error:", error.request);
    //   alert("Network error: Please check your internet connection.");
    // } else {
    //   console.error("Error:", error.message);
    //   alert(` Error: ${error.message}`);
    // }
  }
}


  return (
    <main className="OuterCon">
      <div className="navbar">
        <Navbar />
      </div>

      <div className="projTasksCon">
        <div className="con">
          <h1>Teams</h1>
          <button className="teamBtn" onClick={() => setTeamForm(true)}>
            + New Team
          </button>
          {teamForm && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>Create New Team</h2>
                <form className="taskForm" onSubmit={handleTeamSubmit}>
                  <div className="field">
                    <label>Team Name</label>
                    <br />
                    <input
                      type="text"
                      placeholder="Enter Team Name"
                      className="userInpfield"
                      name="name"
                      value={temForm?.name}
                      onChange={handleTeamOnChange}
                    />
                  </div>

                  <div className="field">
                    <label>Select Team Member </label>
                    <select className="userInpfield" placeholder="Select Team Member" name="member" value={temForm.member} onChange={handleTeamOnChange}>
                    {members.map((member) => <option key={member._id} value={member._id}>{member.name}</option>)}
                    </select>
                  </div>

                  <div className="field">
                    <label>Description(Optional)</label>
                    <br/>
                    <input type="text" className="userInpfield" placeholder="Write Description..." name="description" value={temForm.description} onChange={handleTeamOnChange}/>
                  </div>

                  {/* <div className="field">
                    <label>Add Members</label>
                    <input type='text'
                      className="inpField"
                      placeholder="Member Name"
                      name="member1"
                      value={temForm.member1}
                      onChange={handleTeamOnChange}

                    />
                    <br/>

                    <input type='text'
                      className="inpField"
                      placeholder="Member Name"
                      name="member2"
                      value={temForm.member2}
                      onChange={handleTeamOnChange}
                    />
                    <br/>

                    <input type='text'
                      className="inpField"
                      placeholder="Member Name"
                      name="member3"
                      value={temForm.member3}
                      onChange={handleTeamOnChange}
                    /> 
                    
                  </div> */}

                    

                  <div className="projFormBtns leftSide">
                    <button
                      className="cBtn cancelBtn"
                      onClick={() => setTeamForm(false)}
                    >
                      Cancel
                    </button>
                    <button className="cBtn creatBtn" type="submit">
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
        <div className="cardCon">
          {loading && <p>Teams are Loading...</p>}
          {teams.slice(2).map((team) => (
            <div key={team._id} className="teamCard">
              <p>
                <strong>{team.name}</strong>
              </p>
              <div key={team._id} className="userProf">
                {team.member.map((mem) => (
                  <p key={mem._id} className="prof">
                    {mem.name.charAt(0).toUpperCase()}
                  </p>
                ))}
              </div>

              <p>
                <strong>Team Members:</strong>{" "}
                {team.member.map((mem) => mem.name).join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Team;
