import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionChangeCategory } from '../../Redux/actions';
import { apiGetCategories } from '../../Services/api';

class Settings extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
    };
  }

  async componentDidMount() {
    const categories = (await apiGetCategories()).trivia_categories;
    this.setState({ categories });
  }

  handleCategories = ({ target }) => {
    const { changeCategory } = this.props;
    const { value } = target;
    changeCategory(value);
  }

  renderCategories() {
    const { categories } = this.state;
    const { category } = this.props;
    return (
      <label htmlFor="selectCategory">
        {'Categoria: '}
        <select
          name="category"
          value={ category }
          id="selectCategory"
          onChange={ this.handleCategories }
        >
          <option key="0" value="">Any Category</option>
          {
            categories.map(({ id, name }) => (
              <option key={ id } value={ id }>{name}</option>
            ))
          }
        </select>
      </label>
    );
  }

  renderInnitButton = () => (
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
    return (
      <main className="Settings">
        <h1 data-testid="settings-title"> Configurações </h1>
        {this.renderCategories()}
        {this.renderInnitButton()}
      </main>
    );
  }
}

Settings.propTypes = {
  changeCategory: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

const mapStateToProps = (store) => ({
  category: store.settings.category,
});

const mapDispatchToProps = (dispatch) => ({
  changeCategory: (category) => dispatch(actionChangeCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
