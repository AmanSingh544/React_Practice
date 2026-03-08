/*  App.jsx  */
import React, { useState } from 'react'
import { QuestionsList, correctAnswers } from "./questions.js";
import Select from "./select.jsx";
import "./styleQuiz.css";

const App = () => {

  const [answers, setAnswers] = useState({});

  const handleAnswers = ({ checked, ques, ansId}) => {
    setAnswers((prev) => {
      const prevAnswers = prev[ques.id] || [];
      let updated;

      if (ques.isMulti) {
        if (checked) {
          updated = [...prevAnswers, ansId];
        }
        else {
          updated = prevAnswers.filter(x => x !== ansId);
        }
      }
      else {
        updated = checked ? [ansId] : [];
      }

      return {
        ...prev,
        [ques.id]: updated
      }
    });
  }

  const checkScore = () => {
    let score = 0;
    for (const [key, value] of Object.entries(answers)) {
      // value may be [] or [1] or [1,2,4] and correcAns may be [1] or [4,1,1]
      if (value.length === correctAnswers[key].length && value.every(v => correctAnswers[key].includes(v))) {
        score++;
      }

    }
    alert("Your Score is: " + score + " out of 20");
    setAnswers({})
  }

  const handleSubmit = () => {
    alert("Submitted successfully!!");
    checkScore();
  }

  return (<>
    <div className="main">
      <div style={{ display: "flex", justifyContent: "space-between" }}><h1> Quizz</h1>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="questions">
        {
          QuestionsList && QuestionsList.map((item) => {
            return (<>
              <Select key={item.id} item={item} onChange={handleAnswers} answers={answers} />
            </>)
          })
        }
      </div>
    </div>
  </>)
};


/*------------------------- select.jsx -------------------- */
import React from 'react';
import "./styleQuiz.css";

const Select = ({ item, onChange, answers }) => {

  const handleChange = (e, item, ansId) => {
    onChange({ checked: e.target.checked, ques: item, ansId });
  }
  return (<>
    <div className="question-container">
      <p className="question"><b>{item.id}. </b>{item.question}</p>
      {item.isMulti && <i>{"(Multiple choices)"}</i>}
      <div key={item.id} data-testid={`select-container-${item.id}`} className="select-container">
        <div className="options">
          {
            item.options.map((option) => {
              const isChecked = answers?.[item.id]?.includes(option.id) || false;
              return (
                <div key={option.id} className="option">
                  <input style={{ marginRight: "10px" }}
                    type={item.isMulti ? "checkbox" : "radio"} value={option.id} checked={isChecked}
                    onChange={(e) => handleChange(e, item, option.id)} />
                  <p>{option.value}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  </>)
};

export default Select;

/*-------------------------- StyleQuiz.css ------------*/
.main {
  margin: 2rem;
}

button {
  cursor: pointer;
  border-radius: 5px;
  background-color: green;
  padding: 5px;
  color: white;
}

i {
  color: blueviolet;
  margin-left: 25px;
}

.questions {
  padding: 1rem;
  background-color: beige;
  margin: 10px;
  border: 1px solid white;
}

.question-container {
  margin-left: 10px;
}

.question {
  color: blue;
  font-size: large;
  font-weight: 700;
}

.select-container {
  padding: 1rem;
}

.option {
  display: flex;
  color: black
}


/*--------------- question.js -----------------*/
export const QuestionsList = [
  {
    id: 1,
    question: "What is the full form of DOM?",
    options: [
      { id: 1, value: "Duplicate Object Model" },
      { id: 2, value: "Document Order Model" },
      { id: 3, value: "Document Oriented Module" },
      { id: 4, value: "Document Object Model" }
    ],
    isMulti: false
  },

  {
    id: 2,
    question: "Which JavaScript method converts JSON string into an object?",
    options: [
      { id: 1, value: "JSON.parse()" },
      { id: 2, value: "JSON.stringify()" },
      { id: 3, value: "JSON.objectify()" },
      { id: 4, value: "JSON.convert()" }
    ],
    isMulti: false
  },

  {
    id: 3,
    question: "Which of the following are primitive data types in JavaScript?",
    options: [
      { id: 1, value: "String" },
      { id: 2, value: "Number" },
      { id: 3, value: "Object" },
      { id: 4, value: "Boolean" }
    ],
    isMulti: true
  },

  {
    id: 4,
    question: "What will be the output of: typeof null ?",
    options: [
      { id: 1, value: "null" },
      { id: 2, value: "object" },
      { id: 3, value: "undefined" },
      { id: 4, value: "number" }
    ],
    isMulti: false
  },

  {
    id: 5,
    question: "Which method is used to add an element at the end of an array?",
    options: [
      { id: 1, value: "push()" },
      { id: 2, value: "pop()" },
      { id: 3, value: "shift()" },
      { id: 4, value: "unshift()" }
    ],
    isMulti: false
  },

  {
    id: 6,
    question: "Which DOM method selects an element by CSS selector?",
    options: [
      { id: 1, value: "getElementById()" },
      { id: 2, value: "querySelector()" },
      { id: 3, value: "getElementsByTagName()" },
      { id: 4, value: "queryAllSelector()" }
    ],
    isMulti: false
  },

  {
    id: 7,
    question: "Which DOM methods return a NodeList?",
    options: [
      { id: 1, value: "querySelectorAll()" },
      { id: 2, value: "getElementsByClassName()" },
      { id: 3, value: "getElementsByTagName()" },
      { id: 4, value: "childNodes" }
    ],
    isMulti: true
  },

  {
    id: 8,
    question: "What is event bubbling in DOM?",
    options: [
      { id: 1, value: "Event propagates from child to parent" },
      { id: 2, value: "Event propagates from parent to child" },
      { id: 3, value: "Event stops immediately" },
      { id: 4, value: "Event fires only once" }
    ],
    isMulti: false
  },

  {
    id: 9,
    question: "Which CSS property is used to create space inside the element border?",
    options: [
      { id: 1, value: "margin" },
      { id: 2, value: "padding" },
      { id: 3, value: "border-spacing" },
      { id: 4, value: "gap" }
    ],
    isMulti: false
  },

  {
    id: 10,
    question: "Which CSS properties create a flex container?",
    options: [
      { id: 1, value: "display:flex" },
      { id: 2, value: "display:inline-flex" },
      { id: 3, value: "flex-direction" },
      { id: 4, value: "align-items" }
    ],
    isMulti: true
  },

  {
    id: 11,
    question: "What is the purpose of React Virtual DOM?",
    options: [
      { id: 1, value: "Improve performance by minimizing direct DOM manipulation" },
      { id: 2, value: "Store application state" },
      { id: 3, value: "Replace browser DOM completely" },
      { id: 4, value: "Render HTML faster without JavaScript" }
    ],
    isMulti: false
  },

  {
    id: 12,
    question: "Which React hook is used for side effects?",
    options: [
      { id: 1, value: "useEffect" },
      { id: 2, value: "useMemo" },
      { id: 3, value: "useCallback" },
      { id: 4, value: "useReducer" }
    ],
    isMulti: false
  },

  {
    id: 13,
    question: "Which hooks help prevent unnecessary re-renders?",
    options: [
      { id: 1, value: "useMemo" },
      { id: 2, value: "useCallback" },
      { id: 3, value: "useEffect" },
      { id: 4, value: "React.memo" }
    ],
    isMulti: true
  },

  {
    id: 14,
    question: "What does the dependency array in useEffect control?",
    options: [
      { id: 1, value: "When the effect should re-run" },
      { id: 2, value: "Which components re-render" },
      { id: 3, value: "How many times React renders" },
      { id: 4, value: "Which hooks are executed" }
    ],
    isMulti: false
  },

  {
    id: 15,
    question: "Which statements about JavaScript event loop are correct?",
    options: [
      { id: 1, value: "It handles asynchronous operations" },
      { id: 2, value: "It processes callback queue" },
      { id: 3, value: "It runs on a separate thread" },
      { id: 4, value: "It decides execution order of tasks" }
    ],
    isMulti: true
  },

  {
    id: 16,
    question: "Which CSS properties are used for grid layout?",
    options: [
      { id: 1, value: "display:grid" },
      { id: 2, value: "grid-template-columns" },
      { id: 3, value: "grid-gap" },
      { id: 4, value: "flex-wrap" }
    ],
    isMulti: true
  },

  {
    id: 17,
    question: "What is reconciliation in React?",
    options: [
      { id: 1, value: "Process of updating DOM efficiently" },
      { id: 2, value: "Comparing Virtual DOM trees" },
      { id: 3, value: "Rendering components twice" },
      { id: 4, value: "Updating state automatically" }
    ],
    isMulti: true
  },

  {
    id: 18,
    question: "Which lifecycle equivalents exist in React functional components?",
    options: [
      { id: 1, value: "useEffect" },
      { id: 2, value: "useLayoutEffect" },
      { id: 3, value: "componentDidMount" },
      { id: 4, value: "componentWillUnmount" }
    ],
    isMulti: true
  },

  {
    id: 19,
    question: "What is closure in JavaScript?",
    options: [
      { id: 1, value: "Function remembering variables from its lexical scope" },
      { id: 2, value: "A function executed immediately" },
      { id: 3, value: "A block scoped variable" },
      { id: 4, value: "A global object reference" }
    ],
    isMulti: false
  },

  {
    id: 20,
    question: "Which statements about React keys are correct?",
    options: [
      { id: 1, value: "They help React identify changed elements" },
      { id: 2, value: "They must be unique among siblings" },
      { id: 3, value: "They improve rendering performance" },
      { id: 4, value: "They are required in every component" }
    ],
    isMulti: true
  }
];

export const correctAnswers = {
  1: [4],
  2: [1],
  3: [1, 2, 4],
  4: [2],
  5: [1],
  6: [2],
  7: [1, 4],
  8: [1],
  9: [2],
  10: [1, 2],
  11: [1],
  12: [1],
  13: [1, 2, 4],
  14: [1],
  15: [1, 2, 4],
  16: [1, 2, 3],
  17: [1, 2],
  18: [1, 2],
  19: [1],
  20: [1, 2, 3]
};

export default App;
