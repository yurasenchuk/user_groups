import React from "react";
import APIServiceContext from "../servicesContext";

const WithAPIService = () => (Wrapped) => {
    return (props) => {
        return (
            <APIServiceContext.Consumer>
                {
                    (APIService) => {
                        return <Wrapped {...props} APIService={APIService}/>
                    }
                }
            </APIServiceContext.Consumer>
        )
    }
};

export default WithAPIService;