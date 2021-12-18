import React, { Component } from 'react';
import './App.css';

import ContactForm from './Components/ContactForm/ContactForm';
import ContactList from './Components/ContactList/ContactList';
import Filter from './Components/Filter/Filter';

import { v4 as uuidv4 } from 'uuid';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    value: 0,
    filter: '',
  };

  test = () => {
    for (let i = 0; i < 3; i += 1) {
      console.log(this.state.value);

      this.setState({ value: this.state.value + 1 });
    }
  };
  /*   test = () => {
    for (let i = 0; i < 3; i += 1) {
      console.log(this.state.value);

      this.setState(prevState => {
        console.log(prevState.value);

        return { value: prevState.value + 1 };
      });
    }
  }; */

  addContact = (name, number) => {
    if (this.state.contacts.find(contact => name === contact.name)) {
      alert(name + ' is already in contacts');
      return;
    }

    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, contact],
      };
    });
  };

  handleChangeFilter = event => {
    event.persist();
    this.setState(() => {
      return { filter: event.target.value };
    });
  };

  filteredContact = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contacts =>
      contacts.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  deleteContact = contactId => {
    console.log(contactId);
    this.setState(() => {
      return {
        contacts: this.state.contacts.filter(
          contact => contact.id !== contactId,
        ),
      };
    });
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />

        <h2>Contacts</h2>
        {this.state.contacts.length > 1 && (
          <Filter handleChangeFilter={this.test} filter={this.state.filter} />
        )}
        <ContactList
          contacts={this.filteredContact()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
