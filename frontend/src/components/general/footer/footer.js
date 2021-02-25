import React from "react";
import "./footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-left">
                <p>Developed by Yurii Senchuk ©</p>
            </div>
            <div className="footer-right">
                <div>
                    <time dateTime="2021">2021</time>
                </div>
                <div>
                    <address>Lviv, Ukraine</address>
                </div>
            </div>
        </footer>
    )
};

export default Footer;