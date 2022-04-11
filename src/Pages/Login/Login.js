import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BsGearFill } from 'react-icons/bs';
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

  handleClick = async () => {
    const { history, userSubmit, getToken, token } = this.props;
    const { email, name } = this.state;
    userSubmit(email, name);
    if (!token) await getToken();
    history.push('/game');
  };

  renderSettingsButton() {
    const { history } = this.props;
    return (
      <button
        type="button"
        className="settingsButton"
        data-testid="btn-settings"
        onClick={ () => { history.push('/settings'); } }
      >
        <BsGearFill />
      </button>
    );
  }

  render() {
    const { name, email, play } = this.state;
    return (
      <div className="login-body">
        <div className="Login">
          <div className="title">
            <h1>
              Login
            </h1>
          </div>
          <form className="formulario">
            <label
              htmlFor="name"
            >
              <input
                type="text"
                name="name"
                value={ name }
                placeholder=" Name:"
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
                placeholder=" Email:"
                required="Enter your e-mail"
                data-testid="input-gravatar-email"
                onChange={ this.handleChange }
              />
            </label>
            <div className="botoes">
              <button
                type="button"
                data-testid="btn-play"
                disabled={ play }
                onClick={ this.handleClick }
              >
                Play
              </button>
              {this.renderSettingsButton()}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  userSubmit: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  getToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (store) => ({
  token: store.token,
});

const mapDispatchToProps = (dispatch) => ({
  userSubmit: (email, name) => dispatch(userLogin(email, name)),
  getToken: () => dispatch(thunkToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
