import React from 'react';
import PropTypes from 'prop-types';
import './rankingStyle.css';

class Ranking extends React.Component {
  render() {
    // const { name, email, play } = this.state;
    return (
      <div className="Ranking">
        <h2 data-testid="ranking-title">Ranking</h2>
        <button
          type="button"
          onClick={ () => {
            const { history } = this.props;
            history.push('/');
          } }
          data-testid="btn-go-home"
          className="buttonInicio"
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
