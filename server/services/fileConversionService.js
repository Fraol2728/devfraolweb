import fs from "fs";
import path from "path";
import xlsx from "xlsx";
import { jsPDF } from "jspdf";
import { PDFDocument } from "pdf-lib";

const readUtf8 = (filePath) => fs.promises.readFile(filePath, "utf8");

const writePdfFromText = async (text, outputPath) => {
  const doc = new jsPDF();
  const lines = doc.splitTextToSize(text || " ", 180);
  doc.text(lines, 15, 20);
  doc.save(outputPath);
};

export const convertFile = async ({ inputPath, inputExt, targetFormat }) => {
  const outputPath = `${inputPath}-${Date.now()}.${targetFormat}`;

  if (inputExt === ".txt" && targetFormat === "pdf") {
    const text = await readUtf8(inputPath);
    await writePdfFromText(text, outputPath);
    return outputPath;
  }

  if (inputExt === ".csv" && targetFormat === "xlsx") {
    const workbook = xlsx.readFile(inputPath);
    xlsx.writeFile(workbook, outputPath);
    return outputPath;
  }

  if (inputExt === ".xlsx" && targetFormat === "csv") {
    const workbook = xlsx.readFile(inputPath);
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const csv = xlsx.utils.sheet_to_csv(firstSheet);
    await fs.promises.writeFile(outputPath, csv, "utf8");
    return outputPath;
  }

  if (inputExt === ".csv" && targetFormat === "pdf") {
    const workbook = xlsx.readFile(inputPath);
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(firstSheet, { header: 1 });
    const doc = new jsPDF();
    doc.text(rows.map((r) => r.join(" | ")).join("\n"), 15, 20);
    doc.save(outputPath);
    return outputPath;
  }

  if (inputExt === ".xlsx" && targetFormat === "pdf") {
    const workbook = xlsx.readFile(inputPath);
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(firstSheet, { header: 1 });
    await writePdfFromText(rows.map((r) => r.join(" | ")).join("\n"), outputPath);
    return outputPath;
  }

  if (inputExt === ".pdf" && targetFormat === "txt") {
    const bytes = await fs.promises.readFile(inputPath);
    const pdfDoc = await PDFDocument.load(bytes);
    const pageCount = pdfDoc.getPageCount();
    await fs.promises.writeFile(outputPath, `PDF loaded successfully. Page count: ${pageCount}\n`, "utf8");
    return outputPath;
  }

  throw new Error(`Conversion from ${inputExt} to ${targetFormat} is not supported.`);
};

export const withOutputName = (originalName, targetFormat) =>
  `${path.parse(originalName).name}.${targetFormat}`;
