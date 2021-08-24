import { FormControl, FormControlLabel, FormLabel, makeStyles, Radio, RadioGroup } from '@material-ui/core';
import React, { Fragment } from 'react';
import { red, green } from '@material-ui/core/colors';

const styles = makeStyles({
  wrong: {
    borderColor: red[500],
    borderWidth: '2px',
    backgroundColor: red[100],
    borderStyle: 'solid',
    borderRadius: '10px',
    width: '100%'
  },
  correct: {
    borderColor: green[500],
    borderWidth: '2px',
    backgroundColor: green[100],
    borderStyle: 'solid',
    borderRadius: '10px',
    width: '100%'
  }
});

const QuestionItem = function Component({question}) {
  const states = styles();

  return (
    <Fragment>
      <article className="QuestionItem">
        <h2>{question.question}</h2>
        <FormControl component="fieldset">
          <FormLabel>Respuestas</FormLabel>
          <RadioGroup>
            {
              question.answers.map(a => {
                return (
                  <FormControlLabel
                    className={
                      question.correctAnswer.answer === a.answer ? states.correct :
                      (question.answerSelected.answer === a.answer && question.correctAnswer.answer !== a.answer) ?
                      states.wrong : ''
                    }
                    control= {
                      <Radio checked={question.answerSelected.answer === a.answer} disabled />
                    }
                    label={a.answer}
                    key={`answer-id: ${a.id}`}
                  />
                );
              })
            }
          </RadioGroup>
        </FormControl>
      </article>
    </Fragment>
  );
}

export default QuestionItem;