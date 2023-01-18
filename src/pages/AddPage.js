import React from "react";
import { addNote } from "../utils/api";
import NotesInput from "../components/NotesInput";
import { useNavigate } from "react-router-dom";
import { LocaleConsumer } from "../contexts/LocaleContext";


function AddPage(){
    const navigate = useNavigate();

    function onAddNoteHandler(note){
        addNote(note);
        navigate('/');
    }

    return (
        <LocaleConsumer>
            {
                ({ locale }) => {
                    return (
                        <section>
                            <h1>{locale === 'id' ? 'Tambah Note' : 'Add Notes'}</h1>
                            <NotesInput addNote={onAddNoteHandler} />
                        </section>
                    )
                }
            }
        </LocaleConsumer>
    )

}

export default AddPage;