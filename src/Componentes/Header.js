import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { image, name } = this.props;
    return (
      <div className="header-container">
        <img src={ image } alt="profile" data-testid="header-profile-picture" />
        <h4 data-testid="header-player-name">
          {' '}
          Nome:
          {' '}
          { name }
        </h4>
        <h4 data-testid="header-score">Placar: 0</h4>
      </div>
    );
  }
}

Header.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Header;