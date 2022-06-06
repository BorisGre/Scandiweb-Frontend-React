import React, { useState, useContext } from 'react';
import { Context } from '../../components/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CategoriesSelector from '../../components/categoriesSelector/categoriesSelector';
import categoryToIcon from '../../helpers/categoriesToIconsHelper';
import { getCurrentDate } from '../../helpers/dateHelper.js';

const NewNoteAddPopUp = ({showHideHandler, PopUpShowed}) => {

    const PopUpCss = `sectionPopUp showPopUpSection ${PopUpShowed ?  '' : 'popupHidden'}` 

    const [newNote, setToNewNote] = useState({name: '', content: '', category: ''});
    const boundedActions = useContext(Context);

    const handleChange = (event, field) => setToNewNote({...newNote, [field]: event.target.value}) 
  
    const onSubmitHandler = (e) => {
      
      e.preventDefault()

      if(newNote.name.length < 3 && newNote.content < 1){
        alert('name or content are short')
        return void(0)
      }

      const dateCreated = getCurrentDate()
      const id = Math.floor(new Date().getTime()*Math.random(0,1))
      const archived = false
      const note = {...newNote, id, archived, dateCreated}
      
      showHideHandler(false) //hidePopUp
      boundedActions.addNew(note)//saveNewNote
      setToNewNote({name: '', content: '', category: ''})//clear State=>Form
    }

    const onClear = (e) => {
    
      e.preventDefault()
      setToNewNote({name: '', content: '', category: ''})  
    }

    const catIcon = categoryToIcon(newNote.category)
    return (
        <section className={PopUpCss}>
        <div className="noteAddPopUp"> 
        <button className="closeButton" onClick={() => showHideHandler(false)}>X</button>
            <form onSubmit={(e) => onSubmitHandler(e)} onReset={(e) => onClear(e)}>
              <fieldset>
                <span id="popUpAddIcon">
                    {catIcon === undefined ? '' : <FontAwesomeIcon icon={catIcon} size="2x" />}
                </span>
                <label htmlFor="newNoteName">Name: </label>
                    <input id="newNoteName" type="text" name="name" max-length="50" value={newNote.name} onChange={(e) => handleChange(e, 'name')}/>
                <label htmlFor="newNoteCategory">Category: </label>
                    <CategoriesSelector defaultValue={newNote.category}  id={'newNoteCategory'} onChangeHandler={handleChange}/>
                <label htmlFor="newNoteContent">Content: </label>
                    <textarea id="newNoteContent" name="content" rows="1" cols="40" value={newNote.content} onChange={(e) => handleChange(e, 'content')}></textarea>
              </fieldset>
              <div className="popUpControls"> 
                <button type="submit">Create</button> 
                <button type="reset">Clear</button> 
              </div>
            </form>
        </div>
      </section>
      )
    }
export default NewNoteAddPopUp 