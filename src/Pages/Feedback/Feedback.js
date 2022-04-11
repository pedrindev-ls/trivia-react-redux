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

  messages = () => {
    const { assertions } = this.props;
    const minAnswers = 3;
    if (assertions < minAnswers) {
      return 'Could be better...';
    }
    return 'Well Done!';
  }

  render() {
    const { image, redirect } = this.state;
    const { userName, score } = this.props;
    return (
      <>
        <Header image={ image } name={ userName } score={ score } />
        <p data-testid="feedback-text">{this.messages()}</p>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => {
            const { history } = this.props;
            history.push('/ranking');
          } }
        >
          Ranking
        </button>
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

Feedback.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

const mapStateToProps = (store) => ({
  userName: store.player.name,
  userEmail: store.player.gravatarEmail,
  assertions: store.player.assertions,
  score: store.player.score,
});

export default connect(mapStateToProps, null)(Feedback);
