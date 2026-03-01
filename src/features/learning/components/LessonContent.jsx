import { useEffect, useMemo, useState } from "react";

const DEFAULT_PASSING_SCORE = 60;
const DEFAULT_EXAM_DURATION_SECONDS = 40 * 60;

const formatTimeRemaining = (seconds) => {
  const safeSeconds = Math.max(seconds, 0);
  const minutes = String(Math.floor(safeSeconds / 60)).padStart(2, "0");
  const remainingSeconds = String(safeSeconds % 60).padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
};

const renderBlock = (block, index) => {
  if (block.type === "h2") return <h2 key={index} className="mt-12 text-3xl font-semibold text-white">{block.text}</h2>;
  if (block.type === "h3") return <h3 key={index} className="mt-8 text-2xl font-semibold text-white">{block.text}</h3>;

  if (block.type === "list") {
    return (
      <ul key={index} className="mt-4 list-disc space-y-2 pl-6 text-[16px] leading-[1.7] text-[#D4D4D8]">
        {block.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    );
  }

  if (block.type === "ordered-list") {
    return (
      <ol key={index} className="mt-4 list-decimal space-y-2 pl-6 text-[16px] leading-[1.7] text-[#D4D4D8]">
        {block.items.map((item) => <li key={item}>{item}</li>)}
      </ol>
    );
  }

  if (block.type === "callout") {
    return <div key={index} className="mt-7 rounded-xl border border-[#E10600]/60 bg-[#1A1010] p-5 text-[16px] leading-[1.7] text-[#F4F4F5]">{block.text}</div>;
  }

  if (block.type === "code") {
    return <pre key={index} className="mt-7 overflow-x-auto rounded-xl border border-[#232326] bg-[#0E0E10] p-5 text-sm text-[#E4E4E7]"><code>{block.text}</code></pre>;
  }

  if (block.type === "quote") {
    return <blockquote key={index} className="mt-7 border-l-2 border-[#E10600] pl-4 text-[16px] italic leading-[1.7] text-[#D4D4D8]">{block.text}</blockquote>;
  }

  if (block.type === "image") {
    return (
      <figure key={index} className="mt-8 overflow-hidden rounded-xl border border-[#232326] bg-[#0E0E10] p-3">
        <img src={block.src} alt={block.alt} className="mx-auto w-full max-w-[620px] rounded-lg object-cover" loading="lazy" />
      </figure>
    );
  }

  return <p key={index} className="mt-6 text-[16px] leading-[1.7] text-[#D4D4D8]">{block.text}</p>;
};

const LessonExam = ({ exam }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const examDurationSeconds = exam.durationMinutes ? exam.durationMinutes * 60 : DEFAULT_EXAM_DURATION_SECONDS;
  const [timeRemaining, setTimeRemaining] = useState(examDurationSeconds);
  const passingScore = exam.passingScore ?? DEFAULT_PASSING_SCORE;

  useEffect(() => {
    setQuestionIndex(0);
    setAnswers({});
    setShowResult(false);
    setTimeRemaining(examDurationSeconds);
  }, [exam, examDurationSeconds]);

  useEffect(() => {
    if (showResult) return undefined;

    const timer = window.setInterval(() => {
      setTimeRemaining((previous) => {
        if (previous <= 1) {
          window.clearInterval(timer);
          setShowResult(true);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [showResult]);

  const currentQuestion = exam.questions[questionIndex];
  const selectedAnswer = answers[currentQuestion.id];
  const allAnswered = exam.questions.every((question) => answers[question.id]);

  const result = useMemo(() => {
    const correctAnswers = exam.questions.reduce((count, question) => {
      return answers[question.id] === question.correctAnswer ? count + 1 : count;
    }, 0);

    const score = Math.round((correctAnswers / exam.questions.length) * 100);

    return {
      correctAnswers,
      score,
      passed: score >= passingScore,
    };
  }, [answers, exam.questions, passingScore]);

  return (
    <article className="mx-auto w-full max-w-[800px] px-6 pb-24 pt-10 text-left md:px-10">
      <header className="mb-10 border-b border-[#232326] pb-7">
        <p className="text-sm text-[#A1A1AA]">Final Exam</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-[38px]">{exam.title}</h1>
        <p className="mt-4 text-sm text-[#A1A1AA]">Passing Score: {passingScore}%</p>
        <p className={`mt-2 text-sm font-medium ${timeRemaining <= 300 ? "text-[#ff6767]" : "text-[#A1A1AA]"}`}>
          Time Remaining: {formatTimeRemaining(timeRemaining)}
        </p>
      </header>

      {showResult ? (
        <div className="rounded-2xl border border-[#232326] bg-[#101013] p-6">
          <h2 className="text-2xl font-semibold text-white">Exam Result</h2>
          <p className="mt-4 text-lg text-[#D4D4D8]">
            You scored <span className="font-bold text-white">{result.score}%</span> ({result.correctAnswers}/{exam.questions.length} correct)
          </p>
          <p className={`mt-3 text-lg font-semibold ${result.passed ? "text-emerald-400" : "text-[#ff6767]"}`}>
            {result.passed ? "Status: Passed" : "Status: Not Passed"}
          </p>

          <div className="mt-7 border-t border-[#232326] pt-5">
            <h3 className="text-xl font-semibold text-white">Incorrect Answers Review</h3>
            {exam.questions.filter((question) => answers[question.id] !== question.correctAnswer).length === 0 ? (
              <p className="mt-3 text-[#D4D4D8]">Great job! You answered every question correctly.</p>
            ) : (
              <ul className="mt-4 space-y-4">
                {exam.questions
                  .filter((question) => answers[question.id] !== question.correctAnswer)
                  .map((question) => {
                    const selectedOption = question.options.find((option) => option.id === answers[question.id]);
                    const correctOption = question.options.find((option) => option.id === question.correctAnswer);

                    return (
                      <li key={question.id} className="rounded-lg border border-[#2a2a2d] bg-[#141418] p-4 text-[#D4D4D8]">
                        <p className="font-semibold text-white">{question.text}</p>
                        <p className="mt-2 text-sm text-[#ff9999]">
                          Your answer: {selectedOption ? `${selectedOption.id}. ${selectedOption.text}` : "Not answered"}
                        </p>
                        <p className="mt-1 text-sm text-emerald-300">
                          Correct answer: {correctOption ? `${correctOption.id}. ${correctOption.text}` : question.correctAnswer}
                        </p>
                      </li>
                    );
                  })}
              </ul>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              setQuestionIndex(0);
              setAnswers({});
              setShowResult(false);
              setTimeRemaining(examDurationSeconds);
            }}
            className="mt-6 rounded-lg border border-[#E10600] px-4 py-2 text-sm font-medium text-[#E10600] hover:bg-[#E10600] hover:text-white"
          >
            Retake Exam
          </button>
        </div>
      ) : (
        <div className="space-y-6 rounded-2xl border border-[#232326] bg-[#101013] p-6">
          <div className="flex items-center justify-between text-sm text-[#A1A1AA]">
            <span>
              Question {questionIndex + 1} of {exam.questions.length}
            </span>
            <span>{Math.round(((questionIndex + 1) / exam.questions.length) * 100)}% completed</span>
          </div>

          <h2 className="text-2xl font-semibold text-white">{currentQuestion.text}</h2>

          <fieldset className="space-y-3">
            {currentQuestion.options.map((option) => (
              <label
                key={option.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#2a2a2d] bg-[#141418] px-4 py-3 text-[#E4E4E7] hover:border-[#E10600]/70"
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={option.id}
                  checked={selectedAnswer === option.id}
                  onChange={() => setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option.id }))}
                  className="h-4 w-4 accent-[#E10600]"
                />
                <span>
                  <span className="font-semibold">{option.id}.</span> {option.text}
                </span>
              </label>
            ))}
          </fieldset>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
            <button
              type="button"
              onClick={() => setQuestionIndex((prev) => Math.max(prev - 1, 0))}
              disabled={questionIndex === 0}
              className="rounded-lg border border-[#2f2f33] px-4 py-2 text-sm text-[#D4D4D8] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous Question
            </button>

            {questionIndex === exam.questions.length - 1 ? (
              <button
                type="button"
                onClick={() => setShowResult(true)}
                disabled={!allAnswered}
                className="rounded-lg border border-[#E10600] px-4 py-2 text-sm font-medium text-[#E10600] hover:bg-[#E10600] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Submit Exam
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setQuestionIndex((prev) => Math.min(prev + 1, exam.questions.length - 1))}
                className="rounded-lg border border-[#E10600] px-4 py-2 text-sm font-medium text-[#E10600] hover:bg-[#E10600] hover:text-white"
              >
                Next Question
              </button>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export const LessonContent = ({ lesson, moduleTitle }) => {
  if (lesson.exam) return <LessonExam exam={lesson.exam} />;

  return (
    <article className="mx-auto w-full max-w-[800px] px-6 pb-24 pt-10 text-left md:px-10">
      <header className="mb-10 border-b border-[#232326] pb-7">
        <p className="text-sm text-[#A1A1AA]">{moduleTitle}</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-[38px]">{lesson.title}</h1>
      </header>

      <div className="space-y-1">{lesson.content.map((block, index) => renderBlock(block, index))}</div>
    </article>
  );
};
