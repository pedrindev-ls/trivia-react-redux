import React from 'react';
import { decode } from 'html-entities';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { apiGetQuestions } from '../../Services/api';
import { saveScore, thunkToken } from '../../Redux/actions/index';
import Header from '../../Componentes/Header';
import './gameStyle.css';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      currentQuestion: 0,
      image: '',
      questionAnswered: false,
      timer: 30,
      answers: [],
      score: 0,
      questionDifficulties: {
        easy: 1, medium: 2, hard: 3,
      },
    };
  }

  async componentDidMount() {
    const { userEmail, getToken, token } = this.props;
    await this.getQuestions(token || await getToken());
    const emailToUse = md5(userEmail).toString();
    const URL = `https://www.gravatar.com/avatar/${emailToUse}`;
    this.setState({ image: URL });
    this.getAnswers();
    this.activateInterval();
  }

  componentWillUnmount() {
    clearInterval(this.intervalTimerID);
  }

  activateInterval = () => {
    const interval = 1000;
    this.intervalTimerID = setInterval(() => {
      const { timer } = this.state;
      this.setState({ timer: timer - 1 });
      if (timer - 1 === 0) {
        this.setState({ questionAnswered: true });
        clearInterval(this.intervalTimerID);
      }
    }, interval);
  }

  getQuestions = async (token) => {
    const questions = await apiGetQuestions(token);
    const responseCodeError = 3;
    if (questions.response_code === responseCodeError) {
      const { getToken } = this.props;
      const receivedQuestions = await apiGetQuestions(await getToken());
      this.setState({ questions: receivedQuestions.results });
    } else {
      this.setState({ questions: questions.results });
    }
    // apiGetQuestions(token)
    //   .then(async (questions) => {
    //     const responseCodeError = 3;
    //     if (questions.response_code === responseCodeError) {
    //       const { getToken } = this.props;
    //       const receivedQuestions = await apiGetQuestions(await getToken());
    //       this.setState({ questions: receivedQuestions.results });
    //     } else {
    //       this.setState({ questions: questions.results });
    //     }
    //   })
    //   .catch((error) => { console.log(error); });
  }

  getAnswers = () => {
    const { questions, currentQuestion } = this.state;
    const question = questions[currentQuestion];
    const incorrectAnswers = question.incorrect_answers;
    const correctAnswer = question.correct_answer;
    const answers = [correctAnswer, ...incorrectAnswers];
    answers.sort(() => {
      const subtract = 0.5;
      return Math.random() - subtract;
    });
    this.setState({ answers });
  }

  renderQuestion = () => {
    const { questions, currentQuestion } = this.state;
    if (currentQuestion < questions.length) {
      const question = questions[currentQuestion];
      return (
        <section>
          <h2 data-testid="question-category">{decode(question.category)}</h2>
          <p data-testid="question-text">{decode(question.question)}</p>
        </section>
      );
    }
  }

  addPoints = () => {
    const { questions, currentQuestion, timer, questionDifficulties, score } = this.state;
    const { updateScore } = this.props;
    let { difficulty } = questions[currentQuestion];
    difficulty = questionDifficulties[difficulty];
    const ten = 10;
    const points = ten + (timer * difficulty);
    const newScore = score + points;
    this.setState({ score: newScore });
    updateScore(newScore);
  }

  generateAnswersButton = () => {
    const { questionAnswered, questions, currentQuestion, answers } = this.state;
    const question = questions[currentQuestion];
    const correctAnswer = question.correct_answer;
    return answers.map((answer, index) => {
      const isCorrectAnswer = answer === correctAnswer;
      let answerCSSClass = '';
      if (questionAnswered) {
        answerCSSClass = isCorrectAnswer ? 'correctAnswer' : 'wrongAnswer';
      }
      return (
        <button
          type="button"
          data-testid={ isCorrectAnswer ? 'correct-answer' : `wrong-answer-${index}` }
          key={ index }
          className={ `answerButton ${answerCSSClass}` }
          onClick={ () => {
            clearInterval(this.intervalTimerID);
            this.setState({ questionAnswered: true });
            if (isCorrectAnswer) this.addPoints();
          } }
          disabled={ questionAnswered }
        >
          {decode(answer)}
        </button>
      );
    });
    // const answers = question.incorrect_answers
    //   .map((incorrectAnswer, index) => ((
    //     <button
    //       type="button"
    //       data-testid={ `wrong-answer-${index}` }
    //       key={ index }
    //       className={ questionAnswered ? 'answerButton wrongAnswer' : 'answerButton' }
    //       onClick={ () => { this.setState({ questionAnswered: true }); } }
    //     >
    //       {decode(incorrectAnswer)}
    //     </button>
    //   )));

    // answers.push((
    //   <button
    //     type="button"
    //     data-testid="correct-answer"
    //     key={ answers.length }
    //     className={ questionAnswered ? 'answerButton correctAnswer' : 'answerButton' }
    //     onClick={ () => { this.setState({ questionAnswered: true }); } }
    //   >
    //     {decode(question.correct_answer)}
    //   </button>
    // ));

    // answers.sort(() => {
    //   const subtract = 0.5;
    //   return Math.random() - subtract;
    // });

    // this.setState({ answers });
  }

  renderAnswers = () => {
    const { questions, currentQuestion } = this.state;
    if (currentQuestion < questions.length) {
      return (
        <section data-testid="answer-options">
          {
            this.generateAnswersButton()
          }
        </section>
      );
    }
  }

  goToNextQuestion = () => {
    const { questions, currentQuestion } = this.state;
    if ((currentQuestion + 1) < questions.length) {
      this.setState({
        questionAnswered: false,
        currentQuestion: currentQuestion + 1,
      });
    }
  }

  renderNextButton = () => {
    const { questionAnswered } = this.state;
    return questionAnswered
      ? (
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.goToNextQuestion }
        >
          Próxima
        </button>
      )
      : null;
   }
   
  renderTimer = () => {
    const { timer } = this.state;
    return (
      <div>{timer}</div>
    );
  }

  render() {
    const { image, score } = this.state;
    const { userName } = this.props;
    return (
      <main className="Game">
        <Header image={ image } name={ userName } score={ score } />
        <div>
          {this.renderQuestion()}
          {this.renderAnswers()}
        </div>
        {this.renderNextButton()}
        {this.renderTimer()}
      </main>
    );
  }
}

Game.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  getToken: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  userName: store.player.name,
  userEmail: store.player.gravatarEmail,
  token: store.token,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(thunkToken()),
  updateScore: (score) => dispatch(saveScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
