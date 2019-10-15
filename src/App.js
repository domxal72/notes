import React, {Component} from 'react';
import NotesList from './components/NotesList';
import AddNote from './components/AddNote';
import NoteDetail from './components/NoteDetail';
import './App.scss';

import uuid from 'uuid/v4';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lang: {
        langList: {
          cz: 'cz', 
          en: 'en',
        }, 
        cz: { 
          writeNote: 'Napište poznámku...',
          addNote: 'Přidat poznámku',
          update: 'Upravit',
          delete: 'Smazat',
          notes: 'Poznámky',
          noNotes: 'Nemáte žádné poznámky',
          notesList: 'Seznam poznámek:',
          back: 'Zpět',
        },
        en: { 
          writeNote: 'Write a note...',
          addNote: 'Add note',
          update: 'Update',
          delete: 'Delete',
          notes: 'Notes',
          noNotes: 'You have no notes',
          notesList: 'Notes list:',
          back: 'Back',
        },
      },
      selectedLang: 'en',
      input: '',
      notes: [],
    }
  }

  switchLang = (e) => {
    this.setState({selectedLang: e.target.value})
  }

  setInput = (input) => {
    this.setState({input: input})
  }

  handleUpdate = (e) => {
    this.setState({input: e.target.value})
  }
  
  componentDidMount(){
    // fetch('https://jsonplaceholder.typicode.com/posts')
    fetch('http://private-9aad-note10.apiary-mock.com/notes')
      .then(res => res.json())
      .then(notes => {
        this.setState({notes})
      })
  }

  postNote = async (e) => {
    e.preventDefault();

    try {
      // let res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    let res = await fetch('http://private-9aad-note10.apiary-mock.com/notes', {
        method: 'POST',
        body: JSON.stringify({
          title: this.state.input,
          id:  uuid()
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      let data = await res.json();

    } catch (error) {
      console.log(error);
    }

    // /* Case of adding data immidiately from server response */
    // let data = await res.json();
    // if ( this.state.input !== '' ) {
    //   this.setState({ notes: [ ...this.state.notes, {id: data.id, title: data.title } ] })
    // }
    
    if ( this.state.input !== '' ) {
      this.setState({ notes: [ ...this.state.notes, {id: uuid(), title: this.state.input } ], input: '' })
    }
  }

  deleteNote = async (id) => {
    /* //  SERVER delete  // */
    // let res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    let res = await fetch(`http://private-9aad-note10.apiary-mock.com/notes/${id}`, {
        method: 'DELETE',
    })
    
    /* //  BROWSER delete  // */
    let newNotes = this.state.notes.filter( (note) => (
      note.id.toString() !== id
    ))

    this.setState({notes: newNotes})
  }

  updateNote = async (id) => {

    /* //  SERVER update  // */
    try {
      // let res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    let res = await fetch(`http://private-9aad-note10.apiary-mock.com/notes/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: this.state.input,
          id: id
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      let data = await res.json()

    } catch (err) {
      console.log(err);
    }
    
     /* //  BROWSER update  // */
    let updatedArr = this.state.notes.map(note => {
    // let updatedArr = await this.state.notes.map(note => {
      if ( note.id.toString() === id ) {
        note.title = this.state.input
        return note
      } else {
        return note
      }
    });
    this.setState({notes: updatedArr, input: ''})
  }

  render(){

    let { lang, selectedLang } = this.state

    return (
      <Router>
        <div className="App container">
          <header className="row my-4 justify-content-between">
            <div>
              <h2>
                <Link to='/'>{lang[selectedLang].notes}</Link>
              </h2>
            </div>
            <div>
              <input name="en" type="button" className="btn btn-secondary mr-2" value={lang.langList.en} onClick={this.switchLang} />
              <input name="cz" type="button" className="btn btn-secondary" value={lang.langList.cz} onClick={this.switchLang} />
            </div>
          </header>

          <Switch>
            <Route exact path="/">
              <AddNote appState={this.state} postNote={this.postNote} handleUpdate={this.handleUpdate}  />
              <div className="mt-3">
                <h3 className="text-center">{lang[selectedLang].notesList}</h3>
                <ul class="list-group">
                  <NotesList appState={this.state} deleteNote={this.deleteNote}/>
                </ul>
              </div>
            </Route>
            <Route path="/notedetail/:id" render={(props) => ( <NoteDetail deleteNote={this.deleteNote} updateNote={this.updateNote} handleUpdate={this.handleUpdate} setInput={this.setInput} {...props} appState={this.state} /> )} >
            </Route>
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
