import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./navigationPanel.css";

class NavMenu extends Component {
    render() {
        return (
            <header>
                <nav className="nav">
                    <div className="nav-menu">
                        <Link to={"/user/"} className="nav-button">User</Link>
                        <Link to={"/group/"} className="nav-button">Group</Link>
                    </div>
                </nav>
            </header>
        )
    }
}

export default NavMenu;