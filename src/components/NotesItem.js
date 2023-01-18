import React from "react";
import NotesItemAction from "./NotesItemAction.js";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { showFormattedDate } from "../utils/index.js";

function NotesItem({id, title, createdAt, body, onDelete, archived, onArchived}){
    return (
        <div className="note-item">
            <h1 className="note-item__title"><Link to={`/notes/${id}`}>{title}</Link></h1>
            <p className="note-item__createdAt">{showFormattedDate(createdAt)}</p>
            <p className="note-item__body">{body}</p>
            <NotesItemAction id={id} onDelete={onDelete} archived={archived} onArchived={onArchived} />
        </div>
    )
}

NotesItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    archived: PropTypes.bool.isRequired,
    onArchived: PropTypes.func.isRequired
}

export default NotesItem;