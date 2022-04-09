import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
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
    const { userName } = this.props;
    return (
      <>
        <Header image={ image } name={ userName } />
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClick() }
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
});

Feedback.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
