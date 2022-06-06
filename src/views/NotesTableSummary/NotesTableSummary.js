import React from 'react';
import {useSelector} from 'react-redux';
import NoRecords from '../../components/noRecords/noRecords';
import ThNotesTableSummary from '../../components/thNoteSummary/thNoteSummary';
import TrNotesTableSummary from '../../components/trNoteSummary/trNoteSummary';

//Summary Table item component
const NotesTableSummary = () => {
    //Make aggregated Array of objects
    const usedNotesCategories = [];
    const notesAll = useSelector(state => state.notes.notes)
    notesAll.forEach(note => usedNotesCategories.includes(note.category) 
                                ? "" 
                                : usedNotesCategories.push(note.category))

    const notesMapArray = usedNotesCategories.map(cat => ( 
        { "category": cat,
          "active": notesAll.filter(note => (note.category === cat && !note.archived)).length,
          "archived": notesAll.filter(note => (note.category === cat && note.archived)).length,
        }))

    return (
        <section className="summaryTable">
         <ThNotesTableSummary />
            <div className="tableBody">
                {notesMapArray.length ? notesMapArray.map(item => <TrNotesTableSummary key={item.category} item={item}/>)
                                      : <NoRecords />
                }
            </div>
        </section>   
    );
}

export default NotesTableSummary;