import React from "react";
import PropTypes from "prop-types";
import { BiUndo } from "react-icons/bi";
import { BiArchiveIn } from "react-icons/bi";

function ArchivedButton({id, archived, onArchived}){
       return <button className="arcbutton" onClick={() => onArchived(id)}>{archived === true ? <BiUndo /> : <BiArchiveIn />}</button>
}

ArchivedButton.propTypes = {
    id: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
    onArchived: PropTypes.func.isRequired
}

export default ArchivedButton;