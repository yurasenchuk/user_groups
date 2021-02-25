import React, {Component, useEffect, useState} from "react";
import WithAPIService from "../../hoc";
import {connect} from "react-redux";
import {
    loadingStarted,
    loadingEnded,
    errorOccurred,
    errorResolved,
    modalClick
} from "../../actions/generalActions";
import {groupCreated, groupUpdated} from "../../actions/groupActions";
import * as Yup from "yup";
import {Formik, Form, Field, ErrorMessage} from "formik";
import './group.css';
import '../static/css/general.css';
import {Redirect} from "react-router";

class GroupForm extends Component {
    state = {
        id: this.props.match.params.groupId,
        initialValues: {
            name: '',
            description: ''
        },
        done: false
    }
    validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required!'),
        description: Yup.string()
            .required('Description is required!')
    });

    componentDidMount() {
        const {errorResolved, loadingEnded} = this.props;
        errorResolved();
        loadingEnded();
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
            groupCreated,
            errorOccurred
        } = this.props;
        loadingStarted();
        APIService.postItem(`group/`, JSON.stringify(data))
            .then((data) => {
                groupCreated(data);
                loadingEnded();
                modalClick("Group created!");
            })
            .catch((e) => {
                errorOccurred({message: e.message, status: e.status});
            });
    }

    edit = (data) => {
        const {APIService, loadingEnded, groupUpdated, modalClick} = this.props;
        APIService.patchItem(`group/${this.state.id}/`, JSON.stringify(data))
            .then((data) => {
                groupUpdated(data);
                loadingEnded();
                modalClick("Group edited!");
            })
            .catch((error) => {
                loadingEnded();
                modalClick(error.message);
            })
    }

    render() {
        const {error} = this.props;
        const {id, done, initialValues} = this.state;
        if (done) {
            return <Redirect to="/group/"/>;
        }
        const errorP = error.error ? <p className="error">{error.message}</p> : null;
        return (
            <div className="form">
                <div>
                    <h1 className="text">{id ? "Edit group" : "Add new group"}</h1>
                    {errorP}
                    <Formik initialValues={initialValues} validationSchema={this.validationSchema}
                            onSubmit={this.onSubmit}>
                        {({errors, touched, setFieldValue}) => {
                            const [groupObj, setGroupObj] = useState({});
                            useEffect(() => {
                                if (id) {
                                    const {APIService} = this.props;
                                    APIService.getItems(`group/${id}/`)
                                        .then((data) => {
                                                const fields = ['name', 'description'];
                                                fields.forEach(field => setFieldValue(field, data[field], false));
                                                setGroupObj(data);
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
                                        <Field type="text" placeholder="Name" name="name"
                                               className={(errors.name && touched.name) ? "input-field input-field-error" : "input-field"}/>
                                        <ErrorMessage name="name" component="div" className=""/>
                                    </div>
                                    <div>
                                        <Field type="text" placeholder="Description" name="description"
                                               className={(errors.description && touched.description) ? "input-field input-field-error" : "input-field"}/>
                                        <ErrorMessage name="description" component="div" className=""/>
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
        error: state.general.error
    }
}

const mapDispatchToProps = {
    loadingStarted,
    loadingEnded,
    errorOccurred,
    errorResolved,
    groupCreated,
    modalClick,
    groupUpdated
};
export default WithAPIService()(connect(mapStateToProps, mapDispatchToProps)(GroupForm));
