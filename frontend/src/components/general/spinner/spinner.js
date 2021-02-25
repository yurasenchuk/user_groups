import React, {Component} from 'react';
import {connect} from "react-redux";
import "./spinner.css";

class Spinner extends Component {
    render() {
        const {loading} = this.props;
        return (
            <div className={loading ? "modal-spinner modal-display-spinner" : "modal-spinner"}>
                <div className="loader">loading...</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.general.loading
    }
};

export default connect(mapStateToProps)(Spinner);