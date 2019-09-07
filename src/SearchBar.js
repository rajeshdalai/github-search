import React from 'react';

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }


  handleSubmit = (event) => {
    event.preventDefault();
    const text = event.target.text.value;
    this.setState({text});
    this.props.handleSubmit(text);
  };

  handleFocus = (event) => {
    this.props.handleFocus();
  };

  handleChange = (event) => {
    event.preventDefault();
    const text = event.target.value;
    this.setState({text});
  };

  handleSelect = (suggestion) => () => {
    this.setState({text: suggestion.text});
    this.props.handleSubmit(suggestion.text);
  };

  clearSuggestion = (suggestion) => () => {
    this.props.clearSuggestion(suggestion);
  };

  render() {
    const { suggestions, showSuggestions } = this.props;
    return (
      <div className="search-container">
        <form onSubmit={this.handleSubmit}>
          <input
            autoComplete={'off'}
            name="text"
            className="form-control"
            type="text"
            placeholder="Type search query and press ENTER"
            onFocus={this.handleFocus}
            value={this.state.text}
            onChange={this.handleChange}
          />
        </form>
        {
          suggestions.length > 0 && showSuggestions &&
          <ul className="list-group">
            {
              suggestions.map((suggestion) => (
                  <li key={suggestion.id} className="list-group-item borderLess clearfix">
                    <div className="justify-content-between">
                      <a onClick={this.handleSelect(suggestion)}>{suggestion.text}</a>
                      <button type="button" className="close" onClick={this.clearSuggestion(suggestion)}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  </li>
                )
              )
            }
          </ul>
        }
      </div>
    );
  }
}

export default SearchBar;
