import React from "react";
import DeleteButton from "./DeleteButton.js";
import ArchivedButton from "./ArchivedButton.js";
import PropTypes from "prop-types";

function NotesItemAction({id, archived, onDelete, onArchived}){
    return (
        <>
            <DeleteButton id={id} onDelete={onDelete} />
            <ArchivedButton id={id} archived={archived} onArchived={onArchived} />
        </>
    )
}

NotesItemAction.propTypes = {
    id: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onArchived: PropTypes.func.isRequired
}

export default NotesItemAction;
