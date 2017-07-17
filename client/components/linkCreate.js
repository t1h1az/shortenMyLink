import React, { Component } from 'react';

class LinkCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { error: ''};
  }

  handelSubmit(event) {
    event.preventDefault(); //prevent refreshing the page after the http request
    console.log(this.refs.link.value);

    Meteor.call('links.insert', this.refs.link.value, (error) => {
      if (error) {
        this.setState({error: 'Enter a valid URL'});
        console.log(error);
      } else {
        this.setState({error: ''});
        this.refs.link.value = '';
      }
    });
  }
  // refs system is part of React
  // ref points to an tag element
  // here we put ref to input
  // input element can be accessed from everywhere by this.refs.*
  render() {
    return (
      <form onSubmit={this.handelSubmit.bind(this)}>
        <div className="form-group">
          <label className="alert alert-success">Enter link below</label>
          <input ref="link" className="form-control" />
          <div className="text-danger">{this.state.error}</div>
          <button className="btn btn-primary"> Create link </button>
        </div>
      </form>
    );
  }
}

export default LinkCreate;
