import React from 'react';
import NotesMain from '../components/NotesMain.js';
import NotesList from '../components/NotesList.js';
import { useSearchParams } from 'react-router-dom';
import { getArchivedNotes, deleteNote, unarchiveNote } from '../utils/api.js';
import { LocaleConsumer } from '../contexts/LocaleContext.js';

function ArchivePage(){
    const [loading, setLoading] = React.useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [notes, setNotes] = React.useState([]);
    const [keyword, setKeyword] = React.useState(() => {
        return searchParams.get('keyword') || ''
    })

    React.useEffect(() => {
        getArchivedNotes().then(({ data }) => {
            setNotes(data);
            setLoading(false);
        });

        return () => {
            setLoading(true);
        }
    }, []);

    async function onDeleteHandler(id) {
        await deleteNote(id);

        const { data } = await getArchivedNotes();
            setNotes(data);
        
      }


    async function onUnarchivedHandler(id) {
        await unarchiveNote(id);

        const { data } = await getArchivedNotes();
        setNotes(data);
      }

    function onKeywordChangeHandler(keyword){
        setKeyword(keyword);

        setSearchParams({keyword});

    }

    const filterNotes = notes.filter((note) => note.title.toLowerCase().includes(keyword.toLowerCase())); 
    const archivedNotes = filterNotes.filter((note) => note.archived);
    
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
                            <h2>{locale === 'id' ? 'Catatan Arsip' : 'Archived Notes'}</h2>
                            {archivedNotes.length > 0 ? 
                            <NotesList notes={archivedNotes} archived={notes.archived} onDelete={onDeleteHandler} onArchived={onUnarchivedHandler}  /> 
                            : <div className='notes-list-empty'>
                                <p>{locale === 'id' ? 'Tidak ada catatan' : 'No notes found'}</p>
                              </div>} 
                    
                            </div>
                        
                    
                        )
                    }
                }

            </LocaleConsumer>
        )
    }

export default ArchivePage;