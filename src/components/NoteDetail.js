import React, { useEffect } from 'react'
import { Link } from "react-router-dom";

const NoteDetail = ({ appState, match, updateNote, deleteNote, handleUpdate, setInput }) => {

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${match.params.id}`)
    // fetch(`http://private-9aad-note10.apiary-mock.com/notes/${match.params.id}`)
      .then(res => res.json())
      .then(note => {
        setInput(note.title)
      })

  }, [])
    
  let note = appState.notes.find( note => {
    return note.id.toString() === match.params.id
  })

  return (
    <div>
        <div className="row">
          <input type="text" defaultValue={note ? note.title : ''} onChange={handleUpdate} className="form-control col-12" />
        </div>
        <div className="row mt-1">
          <Link to='/' onClick={ () => { updateNote(match.params.id) }} className="btn btn-primary col-auto mr-auto">{appState.lang[appState.selectedLang].update}</Link>
          <Link to='/' onClick={ () => { setInput('') }} className="btn btn-secondary col-auto mr-auto">{appState.lang[appState.selectedLang].back}</Link>
          <Link to='/' onClick={ () => { deleteNote(match.params.id) }} className="btn btn-danger col-auto">{appState.lang[appState.selectedLang].delete}</Link>
        </div>
    </div>
  )
}

export default NoteDetail
