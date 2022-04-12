import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BsGearFill } from 'react-icons/bs';
import {
  actionChangeCategory, actionChangeDifficulty, actionChangeType,
} from '../../Redux/actions';
import { apiGetCategories } from '../../Services/api';
import './settingsStyle.css';

class Settings extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      categories: [],
    };
  }

  async componentDidMount() {
    const categories = (await apiGetCategories()).trivia_categories;
    this.setState({ categories, loading: false });
  }

  handleSettings = ({ target }) => {
    const { name, value } = target;
    const { [name]: changeSettings } = this.props;
    changeSettings(value);
  }

  renderCategories() {
    const { categories } = this.state;
    const { category } = this.props;
    return (
      <label htmlFor="selectCategory">
        Categoria
        <select
          name="changeCategory"
          value={ category }
          id="selectCategory"
          onChange={ this.handleSettings }
        >
          <option key="" value="">Any Category</option>
          {
            categories.map(({ id, name }) => (
              <option key={ id } value={ id }>{name}</option>
            ))
          }
        </select>
      </label>
    );
  }

  renderDifficulties() {
    const { difficulty } = this.props;
    return (
      <label htmlFor="selectDifficulty">
        Dificuldade
        <select
          name="changeDifficulty"
          value={ difficulty }
          id="selectDifficulty"
          onChange={ this.handleSettings }
        >
          <option value="">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
    );
  }

  renderTypes() {
    const { questionType } = this.props;
    return (
      <label htmlFor="selectType">
        Tipo
        <select
          name="changeType"
          value={ questionType }
          id="selectType"
          onChange={ this.handleSettings }
        >
          <option value="">Any Type</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True / False</option>
        </select>
      </label>
    );
  }

  renderForm() {
    return (
      <form>
        {this.renderCategories()}
        {this.renderDifficulties()}
        {this.renderTypes()}
      </form>
    );
  }

  renderHomeButton = () => (
    <div>
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
  )

  render() {
    const { loading } = this.state;
    return (
      <main className="Settings">
        <div className="settings-container">
          <h1 data-testid="settings-title"> Configurações </h1>
          {(loading) ? <BsGearFill className="loading" /> : this.renderForm()}
          {this.renderHomeButton()}
        </div>
      </main>
    );
  }
}

Settings.propTypes = {
  changeCategory: PropTypes.func.isRequired,
  changeDifficulty: PropTypes.func.isRequired,
  changeType: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  questionType: PropTypes.string.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

const mapStateToProps = (store) => ({
  category: store.settings.category,
  difficulty: store.settings.difficulty,
  questionType: store.settings.questionType,
});

const mapDispatchToProps = (dispatch) => ({
  changeCategory: (category) => dispatch(actionChangeCategory(category)),
  changeDifficulty: (difficulty) => dispatch(actionChangeDifficulty(difficulty)),
  changeType: (type) => dispatch(actionChangeType(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
