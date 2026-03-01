import { useEffect, useMemo, useState } from "react";
import { Keyboard } from "lucide-react";

const DEFAULT_PASSING_SCORE = 60;
const DEFAULT_EXAM_DURATION_SECONDS = 40 * 60;

const formatTimeRemaining = (seconds) => {
  const safeSeconds = Math.max(seconds, 0);
  const minutes = String(Math.floor(safeSeconds / 60)).padStart(2, "0");
  const remainingSeconds = String(safeSeconds % 60).padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
};

const CLI_COMMAND_PATTERN = /^CLI command\s+\d+[a-z]?:\s*([^—-]+)\s*[—-]\s*(.+)$/i;

const parseCliCommandItem = (item) => {
  const match = item.match(CLI_COMMAND_PATTERN);
  if (!match) return null;

  const command = match[1].trim();
  const details = match[2].trim();
  const exampleMatch = details.match(/\(example:\s*([^)]*)\)/i);

  if (exampleMatch) {
    return {
      command,
      description: details.replace(exampleMatch[0], "").trim().replace(/[,.;]\s*$/, ""),
      example: exampleMatch[1].trim(),
    };
  }

  return { command, description: details, example: null };
};

const parseShortcutListItem = (item) => {
  if (typeof item !== "string") return null;

  const [rawShortcut, ...rest] = item.split(":");
  const description = rest.join(":").trim();
  if (!rawShortcut || !description) return null;

  const keys = rawShortcut
    .split("+")
    .map((part) => part.trim())
    .filter(Boolean);

  if (!keys.length) return null;

  return {
    rawShortcut: rawShortcut.trim(),
    keys,
    description,
  };
};

const renderCliCommandList = (items, index) => {
  const commands = items.map(parseCliCommandItem);
  if (commands.some((command) => !command)) return null;

  return (
    <section key={index} className="mt-8 overflow-hidden rounded-2xl border border-[#302426] bg-gradient-to-b from-[#141217] to-[#0e0f13] shadow-[0_25px_80px_rgba(0,0,0,0.4)]">
      <header className="flex items-center justify-between border-b border-white/10 bg-black/30 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs uppercase tracking-[0.18em] text-[#A1A1AA]">CLI Quick Reference</span>
      </header>

      <div className="space-y-3 p-4 md:p-5">
        {commands.map((commandItem) => (
          <article key={`${commandItem.command}-${commandItem.description}`} className="rounded-xl border border-white/10 bg-black/35 p-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-[#9CA3AF]">$</span>
              <code className="rounded-md border border-[#E10600]/35 bg-[#220f12] px-2 py-1 font-mono text-sm font-semibold text-[#FF6A65]">
                {commandItem.command}
              </code>
              <p className="text-[15px] leading-relaxed text-[#D4D4D8]">{commandItem.description}</p>
            </div>

            {commandItem.example ? (
              <p className="mt-3 border-t border-white/10 pt-3 text-sm text-[#A1A1AA]">
                Example: <code className="font-mono text-[#F4F4F5]">{commandItem.example}</code>
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
};

const renderKeyboardShortcutList = (items, index) => {
  const shortcuts = items.map(parseShortcutListItem);
  const hasShortcutItems = shortcuts.filter(Boolean).length >= 3;

  if (!hasShortcutItems || shortcuts.some((shortcut) => !shortcut)) return null;

  return (
    <section
      key={index}
      className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-b from-[#15141b] to-[#0f1015] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.45)] md:p-6"
    >
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#60A5FA]/35 bg-[#60A5FA]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#BFDBFE]">
        <Keyboard className="h-3.5 w-3.5" />
        Keyboard Shortcuts
      </div>

      <div className="grid gap-3">
        {shortcuts.map((shortcut) => (
          <article
            key={`${shortcut.rawShortcut}-${shortcut.description}`}
            className="group rounded-xl border border-white/10 bg-black/35 p-4 transition-colors hover:border-[#60A5FA]/35"
          >
            <div className="flex flex-wrap items-center gap-2">
              {shortcut.keys.map((key, keyIndex) => (
                <div key={`${shortcut.rawShortcut}-${key}-${keyIndex}`} className="flex items-center gap-2">
                  <kbd className="min-w-8 rounded-md border border-white/15 bg-[#171923] px-2 py-1 text-center font-mono text-[13px] font-semibold text-[#E4E4E7] shadow-[inset_0_-2px_0_rgba(255,255,255,0.08)]">
                    {key}
                  </kbd>
                  {keyIndex < shortcut.keys.length - 1 ? <span className="text-sm text-[#9CA3AF]">+</span> : null}
                </div>
              ))}
            </div>

            <p className="mt-3 text-[15px] leading-relaxed text-[#D4D4D8]">{shortcut.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

const renderBlock = (block, index) => {
  if (block.type === "h2") return <h2 key={index} className="mt-12 text-3xl font-semibold text-white">{block.text}</h2>;
  if (block.type === "h3") return <h3 key={index} className="mt-8 text-2xl font-semibold text-white">{block.text}</h3>;

  if (block.type === "tips-list") {
    return (
      <section
        key={index}
        className="mt-4 rounded-2xl border border-[#F43F5E]/35 bg-gradient-to-br from-[#1A1115] via-[#120f14] to-[#101317] p-5 shadow-[0_18px_50px_rgba(244,63,94,0.12)] md:p-6"
      >
        <div className="mb-4 inline-flex items-center rounded-full border border-[#F43F5E]/40 bg-[#F43F5E]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#FFB4C0]">
          Pro Tips
        </div>

        <ul className="list-disc space-y-2 pl-6 text-[16px] leading-[1.7] text-[#F4F4F5] marker:text-[#FB7185]">
          {block.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
    );
  }

  if (block.type === "list") {
    const keyboardShortcutList = renderKeyboardShortcutList(block.items, index);
    if (keyboardShortcutList) return keyboardShortcutList;

    const cliCommandList = renderCliCommandList(block.items, index);
    if (cliCommandList) return cliCommandList;

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

  if (block.type === "video") {
    return (
      <section key={index} className="mt-8 space-y-3">
        {block.title ? <h3 className="text-xl font-semibold text-white">{block.title}</h3> : null}
        <div className="aspect-video overflow-hidden rounded-xl border border-[#232326] bg-[#0E0E10]">
          <iframe
            src={block.url}
            title={block.title ?? "Lesson video"}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>
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
