import React from "react";
import "./home.css";
import "../../static/css/general.css";

const Home = () => {
    return (
        <div className="home">
            <h1 className="text">Welcome to our app!</h1>
            <p className="text-p">
                You can work with users using 'User' page
            </p>
            <hr/>
            <p className="text-p">
                You can work with groups using 'Group'
                page
            </p>
        </div>
    )
}

export default Home;