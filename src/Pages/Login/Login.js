import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin, thunkToken } from '../../Redux/actions/index';
import './loginStyle.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      play: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value },
      () => this.verificaForm());
  }

  verificaForm = () => {
    const { email, name } = this.state;
    const regex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    const emailTest = regex.test(email);
    if ((name.length !== 0) && emailTest) {
      this.setState({ play: false });
    } else {
      this.setState({ play: true });
    }
  }

  handleClick = () => {
    const { history, userSubmit, token } = this.props;
    const { email, name } = this.state;
    userSubmit(email, name);
    token();
    history.push('/game');
  };

  render() {
    const { name, email, play } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form className="formulario">
          <label
            htmlFor="name"
          >
            <input
              type="text"
              name="name"
              value={ name }
              placeholder="Name:"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <label
            htmlFor="email"
          >
            <input
              type="email"
              name="email"
              value={ email }
              placeholder="Email:"
              required="Enter your e-mail"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ play }
            onClick={ this.handleClick }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  userSubmit: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  token: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userSubmit: (email, name) => dispatch(userLogin(email, name)),
  token: () => dispatch(thunkToken()),
});

export default connect(null, mapDispatchToProps)(Login);
