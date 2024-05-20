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
