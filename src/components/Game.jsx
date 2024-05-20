export default function Game({
  step,
  amountOfQuestions,
  question,
  onVarianClickHandler,
}) {
  const { title, variants } = question;
  const progressBarPercent = Math.round((step / amountOfQuestions) * 100);

  return (
    <>
      <div className="progress">
        <div
          style={{ width: `${progressBarPercent}%` }}
          className="progress__inner"
        ></div>
      </div>

      <h1>{title}</h1>
      <ul>
        {variants.map((variant, index) => {
          return (
            <li
              key={variant}
              onClick={() => {
                onVarianClickHandler(index);
              }}
            >
              {variant}
            </li>
          );
        })}
      </ul>
    </>
  );
}
