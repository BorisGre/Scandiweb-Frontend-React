import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'

const ThNotesTable = ({events: {notesArchiveActiveToggle, removeAllShowingNotes}, showArchiveFlag}) => {

    const headClasses = `tableHead ${showArchiveFlag ? 'archiveRecordsShow' : ''}`

    const tooltipArchiveToggle = showArchiveFlag ? 'Show active notes' 
                                                   : 'Show archived notes'

    const tooltipRemoveAllNotes = showArchiveFlag ? 'Remove all archived' 
                                                    : 'Remove all active'                                                   

    return (
        <ul className={headClasses}>
            <li name="notesTHeadName">Name</li>
                <li name="notesTHeadCreated">Created</li>
                <li name="notesTHeadCategory">Category</li>
                <li name="notesTHeadContent">Content</li>
                <li name="notesTHeadDates">Dates</li>
        <li name="notesTHeadControls">
            <ul name="headerNoteControls">
                <li name="archiveToggle" onClick={notesArchiveActiveToggle}>
                    <i data-tooltip={tooltipArchiveToggle} aria-hidden="true">
                        <FontAwesomeIcon icon={showArchiveFlag ? faUpload : faArchive} size="lg" />
                    </i>
                </li>
                <li name="removeAllNotes" onClick={removeAllShowingNotes}>
                    <i data-tooltip={tooltipRemoveAllNotes} aria-hidden="true">
                        <FontAwesomeIcon icon={faTrash} size="lg" />
                    </i>
                </li>
            </ul>
        </li>
    </ul>)
};

export default ThNotesTable