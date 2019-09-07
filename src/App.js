import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './SearchBar';
import Login from './Login';
import './App.css';

const SERVER_URL = 'http://localhost:8080/suggestions';

const KEY = 'userId';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userId: '',
      users: [],
      suggestions: [],
      showSuggestions: false
    };
  }

  async componentWillMount() {
    const res = await axios.get(`${SERVER_URL}/${this.state.userId}`);
    const userId = localStorage.getItem(KEY);
    this.setState({suggestions: res.data, userId: userId || ''});
  }

  changeUserId = (userId) => {
    localStorage.setItem(KEY, userId);
    this.setState({userId})
  };

  handleFocus = () => {
    this.setState({showSuggestions: true} )
  };

  clearSuggestion = async (suggestion) => {
    const updatedSuggestions = this.state.suggestions.filter(item => item.id !== suggestion.id);
    const data = {...suggestion, userId: this.state.userId};
    await axios.delete(SERVER_URL, {data});
    this.setState({suggestions: updatedSuggestions});
  };

  handleSearch = async (text) =>{
    const url = `https://api.github.com/search/users?q=${text}`;
    const res = await axios.get(url);
    const users = res.data.items.map(({login, url}) => ({login, url}));
    const body = {text, userId: this.state.userId};
    const response  = await axios.post(SERVER_URL, body);
    this.setState({
      users,
      suggestions: [...this.state.suggestions, response.data],
      showSuggestions: false
    });
  };

  render(){
    const { users, suggestions, showSuggestions, userId } = this.state;
    return userId ? (
      <div className="app-container">
        <h1>Search Github Users</h1>
        <SearchBar
          handleSubmit={this.handleSearch}
          handleFocus={this.handleFocus}
          suggestions={suggestions}
          showSuggestions={showSuggestions}
          clearSuggestion={this.clearSuggestion}
        />
        <UsersList users={users}/>
      </div>
    ) : (
      <Login changeUserId={this.changeUserId}/>
    )
  }
}

const UsersList = ({users}) => {
  const rows = users.map((user, index) => (<UserItem key={index} user={user} />));
  return (
    <div className="list-group">
      {rows.length > 0 && <h1>Results</h1>}
      {rows}
    </div>
  )
};

const UserItem = ({user}) =>  {
  return (
    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{user.login}</h5>
      </div>
      <small>{user.url}</small>
    </a>
  )
};

export default App;
