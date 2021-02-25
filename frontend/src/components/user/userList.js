import React, {Component} from "react";
import {connect} from "react-redux";
import WithAPIService from "../../hoc";
import {usersLoaded, userUpdated, userDeleted} from "../../actions/userActions";
import {groupsLoaded} from "../../actions/groupActions";
import {
    errorOccurred,
    errorResolved,
    loadingStarted,
    loadingEnded,
    modalClick
} from "../../actions/generalActions";
import Error from "../general/error";
import "../static/css/general.css";
import "./user.css";
import {Link} from "react-router-dom";

class UserList extends Component {
    componentDidMount() {
        const {
            APIService,
            groupsLoaded,
            usersLoaded,
            loadingStarted,
            errorResolved,
            loadingEnded,
            errorOccurred
        } = this.props;
        errorResolved();
        loadingStarted();
        APIService.getItems('user/')
            .then((data) => {
                usersLoaded(data);
            })
            .catch((error) => {
                errorOccurred({status: error.status, message: error.message})
            });
        APIService.getItems('group/')
            .then((data) => {
                groupsLoaded(data);
                loadingEnded();
            })
            .catch((error) => {
                errorOccurred({status: error.status, message: error.message})
            });
    }

    delete = (id) => {
        const {APIService, userDeleted, modalClick} = this.props;
        APIService.deleteItem(`user/${id}/`)
            .then(() => {
                userDeleted(id);
                modalClick("User deleted!");
            })
            .catch((error) => {
                modalClick(error.message);
            })
    }

    render() {
        const {error, users} = this.props;
        if (error.error) {
            return <Error status={error.status} message={error.message}/>
        }
        return (
            <>
                <div className="container">
                    <table className="table">
                        <thead className="main-row">
                        <tr>
                            <th className="user-table-th">Username</th>
                            <th className="user-table-th">Created</th>
                            <th className="user-table-th">Group</th>
                            <th className="user-table-th">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            users.map(user => {
                                return (
                                    <tr key={user.id} className="row">
                                        <td className="user-table-td">{user.username}</td>
                                        <td className="user-table-td">{user.created.replace('T', ' ').replace(/\.\d{6}Z/, '')}</td>
                                        <td className="user-table-td">{user.group}</td>
                                        <td className="user-table-td">
                                            <Link to={`/user/${user.id}`} className="table-button">Edit</Link>
                                            <button className="table-button" onClick={() => {
                                                this.delete(user.id)
                                            }}>Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <Link to={"/user/add/"} className="add-btn">Add</Link>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.user.users,
        groups: state.group.groups,
        error: state.general.error
    }
};

const mapDispatchToProps = {
    usersLoaded,
    errorOccurred,
    errorResolved,
    loadingEnded,
    loadingStarted,
    groupsLoaded,
    userDeleted,
    userUpdated,
    modalClick
};

export default WithAPIService()(connect(mapStateToProps, mapDispatchToProps)(UserList));