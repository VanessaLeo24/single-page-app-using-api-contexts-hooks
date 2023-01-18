import React from "react";
import PropTypes from "prop-types";
import { FiPlus } from "react-icons/fi";

function AddButton({id}){
    return (
        <div className="homepage__action" id={id}><FiPlus className="action" /></div>
    )
}

AddButton.propTypes = {
    id: PropTypes.string
}

export default AddButton;