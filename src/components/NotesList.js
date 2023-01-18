import React from "react";
import NotesItem from "./NotesItem.js";
import PropTypes from "prop-types";


function NotesList({notes, archived, onDelete, onArchived}){
    return (
        <div className="notes-list">
            {notes.map((note) => (
                <NotesItem key={note.id} id={note.id} archived={archived} onDelete={onDelete} onArchived={onArchived} {...note} />
            ))}
        </div>
    )
}

NotesList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    archived: PropTypes.bool,
    onDelete: PropTypes.func.isRequired,
    onArchived: PropTypes.func.isRequired
}

export default NotesList;

