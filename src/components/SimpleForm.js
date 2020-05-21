import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';

class Review extends Component {
  constructor(props) {
    super(props);
    //console.log(this.props)
  }
  render () {
    const { a, s, d } = this.props;
    console.log(a,s,d)
    return (<div> something</div>
      /*<div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Anxiety Score</td>
              <td>{results.a}</td>
            </tr>
            <tr>
              <td>Depression Score</td>
              <td>{results.d}</td>
            </tr>
            <tr>
              <td>Stress Score</td>
              <td>{results.s}</td>
            </tr>
          </tbody>
        </table>
      </div>*/
    );
}
}

/*Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};
*/



class SimpleForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          anxietyScore: 0,
          stressScore: 0,
          depressionScore: 0
        }
        this.generateSteps = this.generateSteps.bind(this);
    }

    addtoarray = (freqval, i) => {

      const anxietyQuestions = [2, 4, 7, 9, 15, 19, 20];
      const depressionQuestions = [3, 5, 10, 13, 16, 17, 21];
      const stressQuestions = [1, 6, 8, 11, 12, 14, 18];

      if (anxietyQuestions.includes(i+1)) {
          this.setState({ anxietyScore: (this.state.anxietyScore + freqval) })
      }
      else if (depressionQuestions.includes(i+1)) {
          this.setState({ depressionScore : this.state.depressionScore + freqval })
      }
      else {
          this.setState({ stressScore: this.state.stressScore + freqval })
      }

      const next = "quiz"+(i+1);
      console.log("Add to array called", next, "score", this.state.anxietyScore, this.state.depressionScore, this.state.stressScore);
      
      if ( i === 20) {
        return "show-results"
      }
      else {
        return next;
      }
    }

 generateSteps () 
    {
      const question = [
        'I found it hard to wind down',
        'I was aware of dryness of my mouth',
        'I couldn’t seem to experience any positive feeling at all',
        'I experienced breathing difficulty (e.g. excessively rapid breathing, breathlessness in the absence of physical exertion)',
        'I found it difficult to work up the initiative to do things',
        'I tended to over-react to situations',
        'I experienced trembling (e.g. in the hands)',
        'I felt that I was using a lot of nervous energy',
        'I was worried about situations in which I might panic and make a fool of myself',
        'I felt that I had nothing to look forward to',
        'I found myself getting agitated',
        'I found it difficult to relax',
        'I felt down-hearted and blue',
        'I was intolerant of anything that kept me from getting on with what I was doing',
        'I felt I was close to panic',
        'I was unable to become enthusiastic about anything',
        'I felt I wasn’t worth much as a person',
        'I felt that I was rather touchy',
        'I was aware of the action of my heart in the absence of physical exertion (e.g. sense of heart rate increase, heart missing a beat)',
        'I felt scared without any good reason',
        'I felt that life was meaningless',
    ]

      const initial = [
        {
            id: 'i1',
            message: 'Hello, my name is Helper. What is your name?',
            trigger: 'name',
        },
        {
            id: 'name',
            user: true,
            trigger: 'i3',
          },
          {
            id: 'i3',
            message: 'Hi {previousValue}! Nice to meet you. Would you like to take a quiz?',
            trigger: 'ask-quiz'
          },
          {
            id: 'ask-quiz',
            options: [
                { value: 'yes', label: 'Yes', trigger: 'quiz0' },
                { value: 'no', label: 'No', trigger: 'no-quiz' },
              ],
          },
          {
            id: 'no-quiz',
            message: 'Okay, Take Care!',
            end: true,
          }
    ]

    for (let i=0; i<question.length; i++)
    {
        const string = "quiz" + i;
        const temp = {
            id: string,
            message: question[i],
            trigger: "stdopt"+i
        }
        initial.push(temp);
        const stndopts = {
            id: "stdopt"+i,
            options: [
                {
                    value: 1,
                    label: "Sometimes",
                    trigger: () => {
                        return this.addtoarray(1,i);
                    }
                },
                {
                    value: 2,
                    label: "Often",
                    trigger: () => {
                        return this.addtoarray(2,i);
                    }
                },
                {
                    value: 3,
                    label: "Always",
                    trigger: () => {
                        return this.addtoarray(3,i);
                    }
                },
                {
                    value: 0,
                    label: "Never",
                    trigger: () => {
                        return this.addtoarray(0,i);
                    }
                },
                {
                  value: "temp",
                  label: "Results",
                  trigger: "show-results"
                  }
            ]
        }
        initial.push(stndopts);
        const summaryStep = {
              id: 'show-results',
              //message: 'results',
              component: <Review a={this.state.anxietyScore} s={this.state.stressScore} d={this.state.depressionScore} />,
              asMessage: true,
              end: true,
          }
          
        initial.push(summaryStep)
    }
        return initial;
        
    };

  render() {
    const finalSteps = this.generateSteps();
    //console.log(finalSteps);
    return (
      <ChatBot
        steps= { finalSteps }
      />
    );
  }
}

export default SimpleForm;