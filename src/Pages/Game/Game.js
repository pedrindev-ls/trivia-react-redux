import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Header from '../../Componentes/Header';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: '',
    };
  }

  componentDidMount() {
    const { userEmail } = this.props;
    const emailToUse = md5(userEmail).toString();
    const URL = `https://www.gravatar.com/avatar/${emailToUse}`;
    this.setState({ image: URL });
  }

  render() {
    const { image } = this.state;
    const { userName } = this.props;
    return (
      <div>
        <Header image={ image } name={ userName } />
      </div>
    );
  }
}

Game.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

const mapStateToProps = (store) => ({
  userName: store.playerReducer.name,
  userEmail: store.playerReducer.gravatarEmail,
});

export default connect(mapStateToProps, null)(Game);
