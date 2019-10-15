import React from 'react'

const AddNote = ({ appState, postNote, handleUpdate}) => {

  return (
    <div>
      <form action="" onSubmit={ postNote } >
        <div className="row">
          <input type="text" name="" id="" placeholder={appState.lang[appState.selectedLang].writeNote} value={appState.input} onChange={handleUpdate} className="form-control col-12" />
          <input type="submit" value={appState.lang[appState.selectedLang].addNote} className="btn btn-primary col-12 mt-1" />
        </div>
      </form>
    </div>
  )
}

export default AddNote
