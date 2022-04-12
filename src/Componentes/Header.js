import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends React.Component {
  render() {
    const { image, name, score } = this.props;
    return (
      <div className="header-container">
        <img
          src={ image }
          alt="profile"
          data-testid="header-profile-picture"
          width="50px"
        />
        <div className="player-info">
          <h4 data-testid="header-player-name">
            {`Nome: ${name}`}
          </h4>
          <h4>
            Placar:
            {' '}
            <span data-testid="header-score">{score}</span>
          </h4>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default Header;
