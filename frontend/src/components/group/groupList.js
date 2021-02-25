import React, {Component} from "react";
import {connect} from "react-redux";
import WithAPIService from "../../hoc";
import {groupsLoaded, groupDeleted, groupUpdated} from "../../actions/groupActions";
import {
    errorOccurred,
    errorResolved,
    loadingStarted,
    loadingEnded,
    modalClick
} from "../../actions/generalActions";
import Error from "../general/error";
import "../static/css/general.css";
import "./group.css";
import {Link} from "react-router-dom";

class GroupList extends Component {
    componentDidMount() {
        const {APIService, groupsLoaded, loadingStarted, errorResolved, loadingEnded, errorOccurred} = this.props;
        errorResolved();
        loadingStarted();
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
        const {APIService, groupDeleted, modalClick} = this.props;
        APIService.deleteItem(`group/${id}/`)
            .then(() => {
                groupDeleted(id);
                modalClick('Group deleted!');
            })
            .catch((error) => {
                modalClick(error.message);
            })
    }


    render() {
        const {error, groups} = this.props;
        if (error.error) {
            return <Error status={error.status} message={error.message}/>
        }
        return (
            <>
                <div className="container">
                    <table className="table">
                        <thead className="main-row">
                        <tr>
                            <th className="group-table-th">Name</th>
                            <th className="group-table-th description">Description</th>
                            <th className="group-table-th">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            groups.map(group => {
                                return (
                                    <tr key={group.id} className="row">
                                        <td className="group-table-td">{group.name}</td>
                                        <td className="group-table-td description">{group.description}</td>
                                        <td className="group-table-td">
                                            <Link to={`/group/${group.id}/`} className="table-button">Edit</Link>
                                            <button className="table-button" onClick={() => {
                                                this.delete(group.id)
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
                <Link to={'/group/add/'} className="add-btn">Add</Link>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        groups: state.group.groups,
        error: state.general.error
    }
};

const mapDispatchToProps = {
    groupsLoaded,
    errorOccurred,
    errorResolved,
    loadingEnded,
    loadingStarted,
    groupUpdated,
    groupDeleted,
    modalClick
};

export default WithAPIService()(connect(mapStateToProps, mapDispatchToProps)(GroupList));