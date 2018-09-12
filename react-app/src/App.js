import React, { Component } from 'react';
import './App.css';
import NavBar from './ui/NavBar/NavBar'
import Footer from './ui/Footer/Footer'
import MainBlock from './ui/MainBlock/MainBlock'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      componentNameToUpdate: JSON.parse(localStorage.getItem('SelectedComponent')) || null,
    }
  }

  updateMainBlock = (component) => {
    localStorage.setItem('SelectedComponent', JSON.stringify(component))
    this.setState({ componentNameToUpdate: component })
  }

  render() {
    return (
      <div className="App">
        <NavBar updateMainBlock={this.updateMainBlock} />
        <MainBlock content={this.state.componentNameToUpdate} updateMainBlock={this.updateMainBlock} />
        <Footer />
      </div>
    );
  }
}

export default App;
