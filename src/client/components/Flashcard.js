import React from 'react';
import { Link, browserHistory } from 'react-router';
import $ from 'jquery';
import fetch from 'isomorphic-fetch';

class Flashcard extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in flashcard', props);

  };

  handleSubmit (event) {
    event.preventDefault();
    var formData = {
      question: this.refs.question.value,
      answer: this.refs.answer.value,
    }
    // this.props.postCard(this.refs.question.value, this.refs.answer.value, deck.Id, this.props.user._id)
    // console.log('THIS IS FORM DATA', formData, this.props.postCard);
  }

  render() {
    return (
      <div className="container">
        <h1 className="center">Flashcards</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="question" />
          <input type="text" ref="answer" />
          <input type="submit" value="post new card"/>
        </form>
      </div>
    );
  }
}

export default Flashcard;

// onSubmit={this.handleSubmit.bind(this)}




