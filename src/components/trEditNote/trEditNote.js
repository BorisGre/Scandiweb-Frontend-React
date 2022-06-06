import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo, faSave } from '@fortawesome/free-solid-svg-icons'
import categoryToIcon from '../../helpers/categoriesToIconsHelper';
import CategoriesSelector from '../categoriesSelector/categoriesSelector';

const TrEditNotesTable = ({events, note}) => {
    
    const [localNote, setToLocalNote] = useState(note);
    const {saveEdited, cancelEdit} = events

    const handleChange = (event, field) => {  
          setToLocalNote({...localNote, [field]: event.target.value}) 
    }

    //Change category icon into first cell of edited row when changing category by selector
    const onChangeHandler = event => setToLocalNote({...localNote, category: event.target.value, })

    return (
            <ul className="noteRow"> 
                <li name="noteIcon">
                    <FontAwesomeIcon icon={categoryToIcon(localNote.category)} size="2x" />
                </li>
                <li name="noteNameEditable"><input type="text" name="noteName" max-length="50" value={localNote.name} onChange={(e) => handleChange(e, 'name')}/></li>
                <li name="noteCategoryEditable"><CategoriesSelector defaultValue={localNote.category} onChangeHandler={onChangeHandler}/></li>
                <li name="noteContentEditable"><input type="text" name="noteContent" max-length="50" value={localNote.content} onChange={(e) => handleChange(e, 'content')}/></li>
                <li name="noteControlsEditable">
                    <ul className="controlButtonsWrap" >
                        <li name="archiveNoteControl" onClick={() => cancelEdit(note.id)}><i data-tooltip="Cancel Editing" aria-hidden="true"><FontAwesomeIcon icon={faUndo} size="lg" /></i></li>
                        <li name="removeNoteControl" onClick={() => saveEdited(localNote)}><i data-tooltip="Save Note" aria-hidden="true"><FontAwesomeIcon icon={faSave} size="lg" /></i></li>
                    </ul>
                </li>  
            </ul>)
}                        
export default TrEditNotesTable