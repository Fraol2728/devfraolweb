export type FileNode = {
  id: string;
  type: "file" | "folder";
  name: string;
  children?: FileNode[];
  content?: string;
  language?: string;
};

export type TerminalLog = {
  id: string;
  text: string;
};
