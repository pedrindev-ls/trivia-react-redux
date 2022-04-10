import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import md5 from 'crypto-js/md5';
import Header from '../../Componentes/Header';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      image: '',
      redirect: false,
    };
  }

  componentDidMount() {
    const { userEmail } = this.props;
    const emailToUse = md5(userEmail).toString();
    const URL = `https://www.gravatar.com/avatar/${emailToUse}`;
    this.setState({ image: URL });
  }

  handleClick = () => {
    this.setState({ redirect: true });
  }

  render() {
    const { image, redirect } = this.state;
    const { userName, score, assertions } = this.props;
    return (
      <>
        <Header image={ image } name={ userName } score={ score } />
        <h4>
          Respostas corretas:
          {' '}
          <span data-testid="feedback-total-question">{assertions}</span>
        </h4>
        <h4>
          Pontuação total:
          {' '}
          <span data-testid="feedback-total-score">{score}</span>
        </h4>
        <p data-testid="feedback-text">Feedback</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Play Again
        </button>
        {redirect && <Redirect to="/" />}
      </>
    );
  }
}

const mapStateToProps = (store) => ({
  userName: store.player.name,
  userEmail: store.player.gravatarEmail,
  score: store.player.score,
  assertions: store.player.assertions,
});

Feedback.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
