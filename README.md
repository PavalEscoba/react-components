# Quiz

useState in App.jsx for steps  
`const [step, setStep] = useState(0);`

Choose question to pass to `<Game>`  
`const question = questions[step]`

Handle _question_ in Game.

```javascript
export default function Game({ question }) {
  const { title, variants } = question;
  return (
    <>
      <div className="progress">
        <div style={{ width: '50%' }} className="progress__inner"></div>
      </div>

      <h1>{title}</h1>
      <ul>
        {variants.map((variant) => {
          return <li key={variant}>{variant}</li>;
        })}
      </ul>
    </>
  );
}
```

Then work on a click handler  
Create a onVariantClickHandler in an `App.jsx` and pass it to Game component
It will just increment `step` and that will rerender the application.

```javascript
const onVarianClickHandler = () => {
  setStep(step + 1);
};
```

Pass `step` and `amountOfQuestions` to `Game.jsx` to calculate the progress bar.
In `Game.jsx` calculate.
Maybe it's a good idea to pass percent to the `Game.jsx`

**App.jsx**

```javascript
return (
  <div className="App">
    <Game
      step={step}
      question={question}
      amountOfQuestions={questions.length}
      onVarianClickHandler={onVarianClickHandler}
    />
    {/* <Result /> */}
  </div>
);
```

**Game.jsx**

```javascript
const progressBarPercent = Math.round((step / amountOfQuestions) * 100);
...
 <div className="progress">
    <div
      style={{ width: `${progressBarPercent}%` }}
      className="progress__inner"
    ></div>
  </div>
```

To prevent breaking let's do conditional rendering
**App.jsx**

```javascript
  const stillPlaying = step !== questions.length;
  ...
  return (
    <div className="App">
      {stillPlaying ? (
        <Game
          step={step}
          question={question}
          amountOfQuestions={questions.length}
          onVarianClickHandler={onVarianClickHandler}
        />
      ) : (
        <Result />
      )}
    </div>
  );
```

Let's count amount of correct answers. Set a variable and handle it in a `onVarianClickHandler()`  
After it wrap a `<button>` with `<a>` to try again

```javascript
function App() {
  const [step, setStep] = useState(0);
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
  const question = questions[step];
  const amountOfQuestions = questions.length;
  const isStillPlaying = step !== questions.length;

  const onVarianClickHandler = (index) => {
    setStep(step + 1);
    if (index === question.correct) {
      setNumberOfCorrectAnswers(numberOfCorrectAnswers + 1);
    }
  };

  return (
    <div className="App">
      {isStillPlaying ? (
        <Game
          step={step}
          question={question}
          amountOfQuestions={amountOfQuestions}
          onVarianClickHandler={onVarianClickHandler}
        />
      ) : (
        <Result
          numberOfCorrectAnswers={numberOfCorrectAnswers}
          amountOfQuestions={amountOfQuestions}
        />
      )}
    </div>
  );
}

export default App;
```

```javascript
export default function Result({ numberOfCorrectAnswers, amountOfQuestions }) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>
        Вы отгадали {numberOfCorrectAnswers} ответа из {amountOfQuestions}
      </h2>
      <a href="/">
        <button>Попробовать снова</button>
      </a>
    </div>
  );
}
```
