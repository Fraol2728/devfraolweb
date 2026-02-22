import rateLimit from "express-rate-limit";

const jsonMessage = (message) => ({ success: false, message });

export const heavyOperationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: jsonMessage("Too many requests for heavy operation. Try again later.")
});

export const codeRunnerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: jsonMessage("Too many code run requests. Try again later.")
});
