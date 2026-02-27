import { runCodeSnippet } from "../services/codeExecutionService.js";

export const codeRunnerController = async (req, res) => {
  const { language, code } = req.body;

  try {
    const data = await runCodeSnippet({ language, code });
    return res.json({ success: true, data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
