import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { image, name, score } = this.props;
    return (
      <div className="header-container">
        <img src={ image } alt="profile" data-testid="header-profile-picture" />
        <h4 data-testid="header-player-name">
          {`Nome: ${name}`}
        </h4>
        <h4>
          Placar:
          {' '}
          <span data-testid="header-score">{score}</span>
        </h4>
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
