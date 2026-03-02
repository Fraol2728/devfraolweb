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

const CLI_COMMAND_PATTERN = /^(CLI command\s+\d+[a-z]?):\s*([^—-]+)\s*[—-]\s*(.+)$/i;

const parseCliCommandItem = (item) => {
  const match = item.match(CLI_COMMAND_PATTERN);
  if (!match) return null;

  const label = match[1].trim();
  const command = match[2].trim();
  const details = match[3].trim();
  const exampleMatch = details.match(/\(example:\s*([^)]*)\)/i);

  if (exampleMatch) {
    return {
      command,
      label,
      description: details.replace(exampleMatch[0], "").trim().replace(/[,.;]\s*$/, ""),
      example: exampleMatch[1].trim(),
    };
  }

  return { command, label, description: details, example: null };
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
    <section key={index} className="mt-8 overflow-hidden rounded-2xl border border-[#31253b] bg-gradient-to-b from-[#14131d] via-[#11121a] to-[#0b0d12] shadow-[0_28px_90px_rgba(0,0,0,0.48)]">
      <header className="flex items-center justify-between border-b border-white/10 bg-black/35 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="rounded-full border border-[#A855F7]/30 bg-[#A855F7]/10 px-2 py-0.5 text-[11px] uppercase tracking-[0.18em] text-[#E9D5FF]">
          Terminal · CLI Quick Reference
        </span>
      </header>

      <div className="space-y-4 p-4 md:p-5">
        {commands.map((commandItem) => (
          <article
            key={`${commandItem.command}-${commandItem.description}`}
            className="rounded-xl border border-[#334155]/45 bg-[#05070d]/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            <div className="mb-3 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
              <span className="rounded-md border border-[#64748B]/40 bg-[#0B1220] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#BFDBFE]">
                {commandItem.label}
              </span>
              <span className="text-xs font-medium text-[#64748B]">Windows CMD</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 rounded-lg border border-white/10 bg-[#020409] px-3 py-2">
              <span className="font-mono text-sm text-[#22C55E]">C:\&gt;</span>
              <code className="font-mono text-sm font-semibold text-[#E2E8F0]">{commandItem.command}</code>
            </div>

            <p className="mt-3 text-[15px] leading-relaxed text-[#D4D4D8]">{commandItem.description}</p>

            {commandItem.example ? (
              <div className="mt-3 rounded-lg border border-[#1D4ED8]/30 bg-[#0B1020] px-3 py-2 text-sm text-[#BFDBFE]">
                Example: <code className="font-mono text-[#F8FAFC]">{commandItem.example}</code>
              </div>
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
  if (exam.type === "drag_order") {
    return <DragOrderExam exam={exam} />;
  }

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

const DragOrderExam = ({ exam }) => {
  const examDurationSeconds = (exam.durationMinutes ?? 10) * 60;
  const maxAttempts = exam.maxAttempts ?? 3;

  const [timeRemaining, setTimeRemaining] = useState(examDurationSeconds);
  const [attemptsUsed, setAttemptsUsed] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [passed, setPassed] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [bankItems, setBankItems] = useState(() => [...exam.items].sort(() => Math.random() - 0.5));
  const [arrangedSlots, setArrangedSlots] = useState(() => Array(exam.items.length).fill(null));

  useEffect(() => {
    setTimeRemaining(examDurationSeconds);
    setAttemptsUsed(0);
    setShowResult(false);
    setPassed(false);
    setFeedback("");
    setBankItems([...exam.items].sort(() => Math.random() - 0.5));
    setArrangedSlots(Array(exam.items.length).fill(null));
  }, [exam, examDurationSeconds]);

  useEffect(() => {
    if (showResult) return undefined;

    const timer = window.setInterval(() => {
      setTimeRemaining((previous) => {
        if (previous <= 1) {
          window.clearInterval(timer);
          setShowResult(true);
          setPassed(false);
          setFeedback("Time is up. Review the correct arrangement and try again.");
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [showResult]);

  const attemptsLeft = maxAttempts - attemptsUsed;

  const parseDragPayload = (event) => {
    try {
      return JSON.parse(event.dataTransfer.getData("application/json"));
    } catch {
      return null;
    }
  };

  const handleDropOnSlot = (event, slotIndex) => {
    event.preventDefault();
    if (showResult) return;

    const payload = parseDragPayload(event);
    if (!payload) return;

    if (payload.origin === "bank") {
      const draggedItem = bankItems.find((item) => item.id === payload.itemId);
      if (!draggedItem) return;

      setBankItems((previous) => previous.filter((item) => item.id !== payload.itemId));
      setArrangedSlots((previous) => {
        const next = [...previous];
        const replacedItem = next[slotIndex];
        next[slotIndex] = draggedItem;

        if (replacedItem) {
          setBankItems((bankPrevious) => [...bankPrevious, replacedItem]);
        }

        return next;
      });
    }

    if (payload.origin === "slot") {
      setArrangedSlots((previous) => {
        const next = [...previous];
        const draggedItem = next[payload.slotIndex];
        if (!draggedItem) return previous;

        const targetItem = next[slotIndex];
        next[slotIndex] = draggedItem;
        next[payload.slotIndex] = targetItem ?? null;

        return next;
      });
    }
  };

  const handleDropOnBank = (event) => {
    event.preventDefault();
    if (showResult) return;

    const payload = parseDragPayload(event);
    if (!payload || payload.origin !== "slot") return;

    setArrangedSlots((previous) => {
      const next = [...previous];
      const draggedItem = next[payload.slotIndex];
      if (!draggedItem) return previous;

      next[payload.slotIndex] = null;
      setBankItems((bankPrevious) => [...bankPrevious, draggedItem]);

      return next;
    });
  };

  const handleSubmit = () => {
    const allFilled = arrangedSlots.every(Boolean);
    if (!allFilled) {
      setFeedback("Please place all colors in the main box before submitting.");
      return;
    }

    const isCorrect = arrangedSlots.every((item, index) => item?.id === exam.correctOrder[index]);

    if (isCorrect) {
      setPassed(true);
      setShowResult(true);
      setFeedback("Excellent! You arranged all colors in the correct T568B order.");
      return;
    }

    const nextAttemptsUsed = attemptsUsed + 1;
    setAttemptsUsed(nextAttemptsUsed);

    if (nextAttemptsUsed >= maxAttempts) {
      setPassed(false);
      setShowResult(true);
      setFeedback("No attempts left. Review the correct order below and retake the exam.");
      return;
    }

    setFeedback(`Incorrect arrangement. You have ${maxAttempts - nextAttemptsUsed} attempt(s) left.`);
  };

  const handleReset = () => {
    setTimeRemaining(examDurationSeconds);
    setAttemptsUsed(0);
    setShowResult(false);
    setPassed(false);
    setFeedback("");
    setBankItems([...exam.items].sort(() => Math.random() - 0.5));
    setArrangedSlots(Array(exam.items.length).fill(null));
  };

  return (
    <article className="mx-auto w-full max-w-[900px] px-6 pb-24 pt-10 text-left md:px-10">
      <header className="mb-10 border-b border-[#232326] pb-7">
        <p className="text-sm text-[#A1A1AA]">Practical Exam</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-[38px]">{exam.title}</h1>
        <p className="mt-4 text-sm text-[#A1A1AA]">Attempts Left: {Math.max(attemptsLeft, 0)} / {maxAttempts}</p>
        <p className={`mt-2 text-sm font-medium ${timeRemaining <= 120 ? "text-[#ff6767]" : "text-[#A1A1AA]"}`}>
          Time Remaining: {formatTimeRemaining(timeRemaining)}
        </p>
      </header>

      <div className="rounded-2xl border border-[#232326] bg-[#101013] p-6">
        <p className="mb-5 text-[#D4D4D8]">{exam.instructions}</p>

        <h2 className="mb-3 text-lg font-semibold text-white">Main Box (Place colors in order)</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {arrangedSlots.map((slotItem, index) => (
            <div
              key={`slot-${exam.correctOrder[index]}`}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => handleDropOnSlot(event, index)}
              className="flex min-h-[58px] items-center gap-3 rounded-lg border border-dashed border-[#3b3b41] bg-[#16161c] px-4 py-3"
            >
              <span className="text-xs font-semibold text-[#A1A1AA]">{index + 1}.</span>
              {slotItem ? (
                <button
                  type="button"
                  draggable
                  onDragStart={(event) => {
                    event.dataTransfer.setData(
                      "application/json",
                      JSON.stringify({ origin: "slot", slotIndex: index, itemId: slotItem.id }),
                    );
                  }}
                  className="flex w-full cursor-grab items-center justify-between rounded-md border border-[#2f2f35] bg-[#20202a] px-3 py-2 text-left text-sm text-white"
                >
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full border border-black/40" style={{ backgroundColor: slotItem.swatch }} />
                    {slotItem.label}
                  </span>
                  <span className="text-xs text-[#a5a5b0]">drag</span>
                </button>
              ) : (
                <span className="text-sm text-[#7a7a85]">Drop color here</span>
              )}
            </div>
          ))}
        </div>

        <h2 className="mb-3 mt-8 text-lg font-semibold text-white">Color Box (Drag from here)</h2>
        <div
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDropOnBank}
          className="grid gap-3 rounded-xl border border-[#2a2a2f] bg-[#15151b] p-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {bankItems.length === 0 ? <p className="text-sm text-[#7a7a85]">All colors are placed. Drag an item back here to remove it.</p> : null}
          {bankItems.map((item) => (
            <button
              key={item.id}
              type="button"
              draggable
              onDragStart={(event) => {
                event.dataTransfer.setData("application/json", JSON.stringify({ origin: "bank", itemId: item.id }));
              }}
              className="flex cursor-grab items-center gap-2 rounded-md border border-[#2f2f35] bg-[#20202a] px-3 py-2 text-left text-sm text-white"
            >
              <span className="h-3 w-3 rounded-full border border-black/40" style={{ backgroundColor: item.swatch }} />
              {item.label}
            </button>
          ))}
        </div>

        {feedback ? <p className={`mt-5 text-sm ${passed ? "text-emerald-300" : "text-[#ff9999]"}`}>{feedback}</p> : null}

        {showResult ? (
          <div className="mt-6 rounded-xl border border-[#2a2a2f] bg-[#16161d] p-4">
            <h3 className={`text-lg font-semibold ${passed ? "text-emerald-400" : "text-[#ff7676]"}`}>
              {passed ? "Status: Passed" : "Status: Not Passed"}
            </h3>
            <p className="mt-3 text-sm text-[#D4D4D8]">Correct order:</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-white">
              {exam.correctOrder.map((itemId) => {
                const item = exam.items.find((entry) => entry.id === itemId);

                return <li key={`correct-${itemId}`}>{item?.label ?? itemId}</li>;
              })}
            </ol>
            <button
              type="button"
              onClick={handleReset}
              className="mt-5 rounded-lg border border-[#E10600] px-4 py-2 text-sm font-medium text-[#E10600] hover:bg-[#E10600] hover:text-white"
            >
              Retake Exam
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={attemptsLeft <= 0 || timeRemaining <= 0}
            className="mt-6 rounded-lg border border-[#E10600] px-4 py-2 text-sm font-medium text-[#E10600] hover:bg-[#E10600] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Check Arrangement
          </button>
        )}
      </div>
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
