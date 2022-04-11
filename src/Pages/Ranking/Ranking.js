import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    // const { name, email, play } = this.state;
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <button
          type="button"
          onClick={ () => {
            const { history } = this.props;
            history.push('/');
          } }
          data-testid="btn-go-home"
        >
          Início
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Ranking;
