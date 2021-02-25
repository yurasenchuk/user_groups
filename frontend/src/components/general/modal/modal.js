import React, {Component} from "react";
import {connect} from "react-redux";
import {modalBackClick} from "../../../actions/generalActions";
import "../../static/css/general.css";

class Modal extends Component {
    render() {
        const {modal, modalBackClick} = this.props;
        return (
            <div className={modal.modal ? "modal modal-display" : "modal"}>
                <div className="modal-content">
                    <span className="close" onClick={() => {
                        modalBackClick();
                    }}>&times;</span>
                    <div>
                        <p className="text">{modal.message}</p>
                    </div>
                    <div>
                        <button className="btn-submit" onClick={() => {
                            modalBackClick();
                        }}>Ok
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        modal: state.general.modal
    }
}

const mapDispatchToProps = {
    modalBackClick
}
export default connect(mapStateToProps, mapDispatchToProps)(Modal);