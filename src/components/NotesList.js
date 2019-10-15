import React, { Fragment } from 'react'
import { Link } from "react-router-dom";

const NotesList = ({ appState, deleteNote }) => {

  return (
    <Fragment>
      { 
        appState.notes.length !== 0 ? appState.notes.map( (note) => {
          
          return <li key={note.id} className="row position-relative mt-1 border rounded">
                    <Link to={`/notedetail/${note.id}`} className="col-12 py-2" id={note.id} >
                      {note.title}
                    </Link>
                    <button onClick={ () => deleteNote(note.id.toString()) } className="btn btn-danger position-absolute to-right py-2">{appState.lang[appState.selectedLang].delete}</button>
                  </li>
        })
      : <p>{appState.lang[appState.selectedLang].noNotes}</p>   
      }
    </Fragment>
  )

}

export default NotesList
