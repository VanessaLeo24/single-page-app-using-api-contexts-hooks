import React from 'react';
import NotesMain from '../components/NotesMain.js';
import NotesList from '../components/NotesList.js';
import AddButton from '../components/AddButton.js';
import { Link } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import { getActiveNotes, deleteNote, archiveNote } from '../utils/api.js';
import { LocaleConsumer } from '../contexts/LocaleContext.js';


function HomePage(){
    const [loading, setLoading] = React.useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [notes, setNotes] = React.useState([]);
    const [keyword, setKeyword] = React.useState(() => {
        return searchParams.get('keyword') || ''
    }) 

    React.useEffect(() => {
        getActiveNotes().then(({ data }) => {
            setNotes(data);
            setLoading(false);

        });

        return () => {
            setLoading(true);
        }
    }, []);

    async function onDeleteHandler(id) {
        await deleteNote(id);

        const { data } = await getActiveNotes();
        setNotes(data);
    }
        
    async function onArchivedHandler(id){
        await archiveNote(id);

        const { data } = await getActiveNotes();
            setNotes(data);
    }
        
        
    function onKeywordChangeHandler(keyword){
        setKeyword(keyword);
        setSearchParams({keyword});
        
    }

    const filterNotes = notes.filter((note) => note.title.toLowerCase().includes(keyword.toLowerCase())); 
    const activeNotes = filterNotes.filter((note) => !note.archived);
                  
    return (
        <LocaleConsumer>
            {
                ({ locale }) => {
                    if (loading) {
                        return (
                          <div className="loading-element">
                            <p>Loading ....</p>
                          </div>
                        );
                    }

                    return (
                        <div>
                            <NotesMain keyword={keyword} keywordChange={onKeywordChangeHandler} />
                            <h2>{locale === 'id' ? 'Catatan Aktif' : 'Active Notes'}</h2>
                                
                            {activeNotes.length > 0 ? 
                            <NotesList notes={activeNotes} archived={notes.archived} onDelete={onDeleteHandler} onArchived={onArchivedHandler} /> : 
                            <div className='notes-list-empty'>
                                <p>{locale === 'id' ? 'Tidak ada catatan' : 'No notes found'}</p>
                            </div>}
                                 
                            <Link to="/notes"><AddButton/></Link>
                        </div>
                    )
                }
            }
        </LocaleConsumer>
                
    )
}
            
export default HomePage;