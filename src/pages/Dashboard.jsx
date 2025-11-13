import './dashboard.css';
import Navbar from '../components/Navbar'

const Dashboard = () => {
  return (
    <main className="OuterCon">
    <div className="navbar">
        <Navbar/>
     </div>

     <div className="projTasksCon">
        <div className="searchBarCon">
          <input type="search" placeholder='search' className="searchInp"/>
          <img src="./icons/searchbar.png" alt="searchbar icon" style={{width: '1.6rem', height: "1.6rem", position: 'absolute', left: '73rem'}}/>
        </div>

        <div>

          <div className="container">
          <h1>Projects</h1>

          <div className="filCon">
          <label>Filter</label>
          <select className="select">
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="To Do">To Do</option>
            {/* <option value=""></option> */}
          </select>
          </div>
          </div>

          <div>
            <h2>projects</h2>
          </div>

        </div>

      </div>   
    </main>
    
  )
}

export default Dashboard