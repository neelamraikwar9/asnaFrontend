import './navbar.css';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <main>
      <div>
        <nav className='navCon'>

        <div className="logoCon">
        <NavLink href="/dashboard" className="workasana">Workasana</NavLink>
        </div>

        <ul className= "listStyl">

        <li className='navItem'>
        <img src="./icons/dashboard.png" alt="Dashboard Icon" style={{height: '1.8rem', width: '1.8rem'}}/>
        <NavLink to="/dashboard" className="navText dashboardColor" >Dashboard</NavLink>
        </li>

          <li className='navItem'>
          <img src="./icons/proj.png" alt="Dashboard Icon" style={{height: '1.8rem', width: '1.8rem'}}/>
          <NavLink to="/project" className="navText">Project</NavLink>
          </li>

          <li className='navItem'>
          <img src="./icons/team.png" alt="Dashboard Icon" style={{height: '1.8rem', width: '1.8rem'}}/>
          <NavLink to="/team" className="navText">Team</NavLink>
          </li>
          
          <li className='navItem'>
          <img src="./icons/report.png" alt="Dashboard Icon" style={{height: '1.8rem', width: '1.8rem'}}/>
          <NavLink to="/reports" className="navText">Reports</NavLink>
          </li>

          <li className='navItem'>
          <img src="./icons/setting.png" alt="Dashboard Icon" style={{height: '1.8rem', width: '1.8rem',  backgroundColor: 'black'}}/>
          <NavLink to="/setting" className="navText">Setting</NavLink>
          </li>
        </ul>
        </nav>
        
      </div>
    </main>
  )
}

export default Navbar