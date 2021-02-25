import React, {Component, useState, useEffect} from "react";
import WithAPIService from "../../hoc";
import {Redirect} from "react-router";
import {connect} from "react-redux";
import {
    loadingStarted,
    loadingEnded,
    errorResolved,
    modalClick,
    errorOccurred
} from "../../actions/generalActions";
import {groupsLoaded} from "../../actions/groupActions";
import {userCreated, userUpdated} from "../../actions/userActions";
import * as Yup from "yup";
import {Formik, Form, Field, ErrorMessage} from "formik";
import './user.css';
import '../static/css/general.css';

class UserForm extends Component {
    state = {
        id: this.props.match.params.userId,
        initialValues: {
            username: '',
            group: ''
        },
        done: false
    }
    validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required!')
    });

    componentDidMount() {
        const {errorResolved, loadingEnded, APIService, groupsLoaded, errorOccurred} = this.props;
        errorResolved();
        APIService.getItems('group/')
            .then((data) => {
                groupsLoaded(data);
                loadingEnded();
            })
            .catch((error) => {
                errorOccurred({status: error.status, message: error.message})
            });
    }

    onSubmit = (fields) => {
        if (this.state.id) {
            this.edit(fields);
        } else {
            this.create(fields);
        }
        this.setState({
            ...this.state,
            done: true
        });
    }

    create = (data) => {
        const {
            APIService,
            modalClick,
            loadingStarted,
            loadingEnded,
            userCreated
        } = this.props;
        loadingStarted();
        APIService.postItem(`user/`, JSON.stringify(data))
            .then((data) => {
                userCreated(data);
                loadingEnded();
                modalClick("User created!");
            })
            .catch((error) => {
                modalClick(error.message);
            });
    }

    edit = (data) => {
        const {
            APIService,
            modalClick,
            loadingStarted,
            loadingEnded,
            userUpdated,
        } = this.props;
        loadingStarted();
        APIService.patchItem(`user/${this.state.id}/`, JSON.stringify(data))
            .then((data) => {
                userUpdated(data);
                loadingEnded();
                modalClick("User edited!");
            })
            .catch((error) => {
                loadingEnded();
                modalClick(error.message);
            })
    }

    render() {
        const {error, groups} = this.props;
        const {id, done, initialValues} = this.state;
        if (done) {
            return <Redirect to="/user/"/>;
        }
        const errorP = error.error ? <p className="error">{error.message}</p> : null;
        return (
            <div className="form">
                <div>
                    <h1 className="text">{id ? "Edit user" : "Add new user"}</h1>
                    {errorP}
                    <Formik initialValues={initialValues} validationSchema={this.validationSchema}
                            onSubmit={this.onSubmit}>
                        {({errors, touched, setFieldValue}) => {
                            const [userObj, setUserObj] = useState({});
                            useEffect(() => {
                                if (id) {
                                    const {APIService} = this.props;
                                    APIService.getItems(`user/${id}/`)
                                        .then((data) => {
                                                const fields = ['username'];
                                                fields.forEach(field => setFieldValue(field, data[field], false));
                                                setUserObj(data);
                                            }
                                        )
                                        .catch((e) => {
                                            const error = {
                                                error: true,
                                                status: e.status,
                                                shortMessage: e.message
                                            };
                                            this.setState({
                                                ...this.state,
                                                error: error,
                                                loading: false
                                            });
                                        });
                                }
                            }, []);
                            return (
                                <Form>
                                    <div>
                                        <Field type="text" placeholder="Username" name="username"
                                               className={(errors.username && touched.username) ? "input-field input-field-error" : "input-field"}/>
                                        <ErrorMessage name="username" component="div" className="error-message"/>
                                    </div>
                                    <div>
                                        <Field placeholder="Group" name="group" as="select"
                                               className={(errors.group && touched.group) ? "input-field input-field-error" : "input-field"}>
                                            <option value={""}>no group</option>
                                            {groups.map(group => {
                                                return <option key={group.id} value={group.id}>{group.name}</option>
                                            })}
                                        </Field>
                                        <ErrorMessage name="group" component="div" className="error-message"/>
                                    </div>
                                    <div>
                                        <button className="btn-submit" type="submit">Submit</button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        groups: state.group.groups,
        error: state.general.error,
    }
}

const mapDispatchToProps = {
    loadingStarted,
    loadingEnded,
    errorResolved,
    userCreated,
    modalClick,
    groupsLoaded,
    userUpdated,
    errorOccurred
};
export default WithAPIService()(connect(mapStateToProps, mapDispatchToProps)(UserForm));
