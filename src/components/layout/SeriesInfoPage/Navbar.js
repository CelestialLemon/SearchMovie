import React from 'react'

const Navbar = ({tempFunction}) => {

    const function2 = (target) =>
    {
        tempFunction(target);
    }
    return (
        <div>
           <nav className="navbar navbar-expand-lg navbar-dark bg-dark blacknavbar">
            
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                <li className="nav-item active item">
                    <a className="nav-link"  onClick={() => {function2('seasons')}}>Seasons</a>
                </li>
                <li className="nav-item item">
                    <a className="nav-link" onClick={() => {function2('cast')}}>Cast</a>
                </li>
                <li className="nav-item item">
                    <a className="nav-link" onClick={() => {function2('progress')}}>My Progress</a>
                </li>
                
                </ul>
            </div>
            </nav> 
        </div>
    )
}

export default Navbar
