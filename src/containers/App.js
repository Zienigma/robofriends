import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

class App extends Component {
    constructor() {
      super()
      this.state = {
        robots: [],
        searchfield: ''
      }
    }

    componentDidMount() {
      fetch('https://jsonplaceholder.typicode.com/users')//fetch is a window object that comes with most browsers
      .then(response => response.json())
      .then(users => this.setState({ robots: users}));
    }

//NOTES: refactored to ^
    // componentDidMount() {
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //     .then(response => {
    //         return response.json();
    //     })
    //     .then(users => {
    //         this.setState({ robots: users})
    //     });
    // }

    onSearchChange = (event) => {
      this.setState({ searchfield: event.target.value })
    }
    
    render() {
      const { robots, searchfield } = this.state; 
      const filteredRobots = robots.filter(robots =>{
        return robots.name.toLowerCase().includes(searchfield.toLowerCase());
      }) //NOTES refactor to ternary..
      return !robots.length ?
        <h1>Loading</h1> :
          (
            <div className='tc'>
              <h1 className="f1">RoboFriends</h1>
              <SearchBox searchChange={this.onSearchChange}/>
              <Scroll>
                  <CardList robots={filteredRobots}/>
              </Scroll>
            </div>
        );
    }
}


export default App;