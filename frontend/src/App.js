import React, {Component} from 'react';
import NavMenu from "./components/general/navigationPanel";
import {Route, Switch} from "react-router-dom";
import Footer from "./components/general/footer";
import UserList from "./components/user/userList";
import GroupList from "./components/group/groupList";
import "./App.css"
import Spinner from "./components/general/spinner";
import Modal from "./components/general/modal";
import Home from "./components/general/home";
import UserForm from "./components/user/userForm";
import GroupForm from "./components/group/groupForm";

export default class App extends Component {
  render() {
    return (
        <>
          <NavMenu/>
          <div className="main">
              <Spinner/>
              <Modal/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/user/" exact component={UserList}/>
                <Route path="/user/add/" exact component={UserForm}/>
                <Route path="/user/:userId/" exact component={UserForm}/>
                <Route path="/group/" exact component={GroupList}/>
                <Route path="/group/add/" exact component={GroupForm}/>
                <Route path="/group/:groupId/" exact component={GroupForm}/>
            </Switch>
          </div>
          <Footer/>
        </>
    );
  }
}