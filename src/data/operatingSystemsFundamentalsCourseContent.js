export const operatingSystemsFundamentalsCourseContent = [
  {
    id: "operating-systems-fundamentals-course",
    slug: "operating-systems-fundamentals",
    title: "Operating Systems Fundamentals",
    modules: [
      {
        title: "📘 Module 1: Operating System Basics",
        lessons: [
          {
            title: "📗 Lesson 1: What Is an Operating System?",
            overview:
              "An Operating System (OS) is the main software that runs a computer.",
            examples: [
              "Turns the computer on properly",
              "Controls all hardware (keyboard, mouse, screen, printer)",
              "Allows users to open and use applications",
              "Helps save, open, and manage files",
              "Without an operating system, a computer cannot be used.",
            ],
            keyPoints: [
              "Very simple explanation: Think of the operating system as a manager of the computer.",
              "It tells hardware what to do.",
              "It tells applications when to run.",
              "It tells users how to interact with the computer.",
              "Real-life example: Hardware = body, Operating System = brain, Applications = skills.",
              "Without the brain, the body cannot work.",
              "OS is the first software that runs.",
              "Every computer must have an OS.",
              "Users interact with the OS every day.",
            ],
            tips: [
              "You don’t need to “see” the OS working.",
              "The OS works in the background all the time.",
            ],
            quiz: ["What is an operating system?", "Can a computer work without an OS?"],
          },
          {
            title: "📗 Lesson 2: How to Install Microsoft Windows 10",
            overview:
              "This lesson explains what OS installation means and the basic idea of installing Windows 10.",
            definition:
              "Installing an operating system means putting the OS onto a computer so it can start and work properly.",
            examples: [
              "Windows 10 is a popular operating system created by Microsoft.",
              "It is used on laptops.",
              "It is used on desktop computers.",
              "Basic things needed: a computer or laptop, Windows installation USB or DVD, enough storage space, and power supply.",
            ],
            howToUse: [
              "Insert Windows installation USB/DVD.",
              "Turn on the computer.",
              "Follow instructions on the screen.",
              "Choose language and region.",
              "Wait while Windows installs.",
            ],
            howToUseVideoTitle: "Watch: Windows 10 Installation Walkthrough",
            howToUseVideoUrl: "https://www.youtube.com/embed/l9GnWYKyyYo?start=573",
            keyPoints: [
              "Installation is mostly automatic.",
              "Follow instructions carefully.",
              "The computer may restart several times.",
            ],
            tips: ["Always backup important files first.", "Keep the computer plugged in."],
            quiz: ["What does installing an OS mean?", "Why should you back up files first?"],
          },
          {
            title: "📗 Lesson 3: How to Optimize the Operating System",
            overview:
              "Optimizing an OS means making the computer faster, cleaner, and more stable.",
            definition:
              "Optimization is the process of improving system speed and stability by removing unnecessary load.",
            examples: [
              "Over time computers become slow.",
              "Too many programs run in the background.",
              "Storage becomes full.",
              "Optimization helps fix this.",
              "Real-life example: Optimizing a computer is like cleaning your room so you can move easily.",
            ],
            howToUse: [
              "Remove programs you don’t use.",
              "Restart the computer regularly.",
              "Install updates.",
              "Clean temporary files.",
            ],
            keyPoints: [
              "Optimization improves speed.",
              "Simple actions are enough.",
              "No technical skills required.",
            ],
            tips: ["Restart once a week.", "Don’t install unnecessary software."],
            quiz: ["What does optimization improve?", "Name one easy optimization step."],
          },
        ],
      },
      {
        title: "📘 Module 2: User Interfaces",
        lessons: [
          {
            title: "📗 Lesson 1: GUI (Graphical User Interface)",
            overview: "This lesson explains how users communicate with the OS using GUI.",
            definition:
              "A GUI allows users to control the computer using icons, windows, menus, mouse, and touchpad.",
            examples: ["Desktop screen", "Start menu", "File Explorer"],
            keyPoints: [
              "GUI is easy to learn.",
              "GUI is visual and clear.",
              "GUI is best for beginners.",
              "GUI uses graphics.",
              "No commands are needed.",
              "Most users rely on GUI.",
            ],
            quiz: ["What does GUI stand for?", "Is GUI good for beginners?"],
          },
          {
            title: "📗 Lesson 2: CLI (Command Line Interface)",
            overview:
              "A CLI allows users to control the computer by typing text commands using the keyboard.",
            definition:
              "Instead of clicking icons, you type instructions and press Enter. CLI is faster for experts, gives more control, and is often used by technicians.",
            keyPoints: [
              "CLI command 1: dir — list files and folders in the current location.",
              "CLI command 2: cd — move from one folder to another (example: cd Documents).",
              "CLI command 2b: cd .. — go back one folder.",
              "CLI command 3: cls — clear the command screen (does not delete files).",
              "CLI command 4: mkdir — create a new folder (example: mkdir Test).",
              "CLI command 5: rmdir — delete an empty folder (folder must be empty).",
              "CLI command 6: copy — copy files from one place to another (original stays).",
              "CLI command 7: move — move or rename files (example: move oldname.txt newname.txt).",
              "CLI command 8: del — delete a file (deleted files do not go to Recycle Bin).",
              "CLI command 9: type — view text inside a file (text files only).",
              "CLI command 10: ipconfig — show network information such as IP address.",
              "CLI command 11: ping — test if a website/device is reachable (example: ping google.com).",
              "CLI command 12: tasklist — view currently running programs.",
              "CLI command 13: taskkill — force-close a program (example: taskkill /IM notepad.exe, use carefully).",
              "CLI command 14: shutdown /s — turn off computer.",
              "CLI command 14b: shutdown /r — restart computer.",
              "CLI command 15: help — show available commands (example: help dir).",
            ],
            tips: [
              "You don’t need to memorize every command immediately — first understand what each command does.",
              "CLI uses keyboard input, not mouse input.",
            ],
            quiz: ["What is CLI?", "Does CLI use mouse or keyboard?"],
          },
        ],
      },
      {
        title: "📘 Module 3: Application Software",
        lessons: [
          {
            title: "📗 Lesson 1: What Is Application Software?",
            overview:
              "This module explains what applications are, how to install them, and how to keep them running well.",
            definition: "Application software is software that helps users do specific tasks.",
            examples: ["Web browsers", "Word processors", "Media players"],
            keyPoints: ["Applications run on the OS.", "Each app has a purpose."],
            quiz: ["What is application software?", "Give one example."],
          },
          {
            title: "📗 Lesson 2: How to Install Application Software",
            overview: "Simple installation steps for beginner users.",
            howToUse: [
              "Download from a trusted source.",
              "Open the installer.",
              "Follow instructions.",
              "Finish installation.",
            ],
            keyPoints: [
              "Avoid unknown websites.",
              "Read installation screens carefully.",
            ],
            quiz: [
              "Where should apps be downloaded from?",
              "Why read instructions?",
            ],
          },
          {
            title: "📗 Lesson 3: How to Optimize Applications",
            overview:
              "Optimizing applications means making apps run faster and use less resources.",
            howToUse: [
              "Update applications.",
              "Remove unused apps.",
              "Close apps not in use.",
            ],
            quiz: ["Why optimize applications?", "Name one optimization tip."],
          },
        ],
      },
      {
        title: "📘 Module 4: Cybersecurity Basics",
        lessons: [
          {
            title: "📗 Lesson 1: Cybersecurity Basics",
            overview:
              "This lesson explains what cybersecurity is, why it is important, common threats, and simple ways beginners can stay safe while using a computer and the internet.",
            definition:
              "Cybersecurity means protecting computers, operating systems, applications, and personal information from digital attacks, viruses, and harmful activities.",
            examples: [
              "Cybersecurity helps keep your files safe, your personal information private, and your computer working properly.",
              "Without cybersecurity, hackers can steal information, viruses can damage files, and computers can become slow or unusable.",
              "With good cybersecurity, your data stays safe, your system works better, and you avoid many online problems.",
              "Everyone needs cybersecurity, not just experts.",
              "What needs protection: Operating System (example: Windows), Application Software (example: browsers and document editors), and Personal Data (passwords, photos, documents).",
            ],
            keyPoints: [
              "Threat 1: Virus — can damage files, slow your computer, and spread to other files.",
              "Threat 2: Malware — malicious software including viruses, spyware, and ransomware; can spy on users, steal data, and lock files.",
              "Threat 3: Phishing — fake messages/emails that look real and try to steal passwords or information.",
              "Threat 4: Unsafe websites — may contain harmful downloads or install malware without permission.",
              "Real-life example: Cybersecurity is like locking your house doors and windows before leaving.",
              "Protection method 1: Use antivirus software to detect/remove threats and protect in real time.",
              "Protection method 2: Keep OS and applications updated to fix security issues and improve protection/performance.",
              "Protection method 3: Use strong passwords that are long and hard to guess; avoid weak passwords like 123456 or password.",
              "Protection method 4: Download only from official/trusted sources and avoid random unknown links.",
              "Protection method 5: Avoid suspicious emails and links, especially urgent messages asking for passwords.",
            ],
            tips: [
              "Think before you click.",
              "Update your system.",
              "Use antivirus software.",
              "Protect your passwords.",
              "Download from trusted sources.",
              "Cybersecurity is about good habits, not technical skills.",
              "One mistake can cause big problems.",
              "Simple actions prevent most attacks.",
            ],
            quickSummary:
              "Cybersecurity protects your computer, your software, and your personal information. By following basic rules, beginners can stay safe, secure, and confident while using computers.",
            practiceTasks: [
              "Check if your system has antivirus enabled.",
              "Look for pending updates.",
              "Identify a suspicious email without opening links.",
            ],
            quiz: [
              "What is cybersecurity?",
              "Name one cyber threat.",
              "Why are updates important?",
              "What should you do if an email looks suspicious?",
            ],
          },
          {
            title: "📗 Lesson 2: How to Protect OS and Applications",
            overview: "Basic protection methods for operating systems and applications.",
            howToUse: [
              "Install antivirus software.",
              "Keep OS and apps updated.",
              "Use strong passwords.",
              "Avoid suspicious links.",
            ],
            keyPoints: [
              "Updates fix security problems.",
              "Updates improve performance.",
            ],
            quiz: [
              "Why are updates important?",
              "Name one protection method.",
            ],
          },
          {
            title: "📗 Lesson 3: Final Exam",
            exam: {
              title: "Operating Systems Fundamentals Final Exam",
              passingScore: 60,
              durationMinutes: 40,
              questions: [
                {
                  id: 1,
                  text: "What is an operating system?",
                  options: [
                    { id: "A", text: "A computer game" },
                    { id: "B", text: "The main software that controls the computer" },
                    { id: "C", text: "A hardware device" },
                    { id: "D", text: "An internet connection" },
                  ],
                  correctAnswer: "B",
                },
                {
                  id: 2,
                  text: "Without an operating system, a computer:",
                  options: [
                    { id: "A", text: "Can browse the internet" },
                    { id: "B", text: "Can run applications" },
                    { id: "C", text: "Works normally" },
                    { id: "D", text: "Cannot be used" },
                  ],
                  correctAnswer: "D",
                },
                {
                  id: 3,
                  text: "Which is an example of an operating system?",
                  options: [
                    { id: "A", text: "Microsoft Word" },
                    { id: "B", text: "Google Chrome" },
                    { id: "C", text: "Windows 10" },
                    { id: "D", text: "VLC Media Player" },
                  ],
                  correctAnswer: "C",
                },
                {
                  id: 4,
                  text: "The operating system is responsible for:",
                  options: [
                    { id: "A", text: "Playing music only" },
                    { id: "B", text: "Controlling hardware and software" },
                    { id: "C", text: "Internet speed" },
                    { id: "D", text: "Screen brightness only" },
                  ],
                  correctAnswer: "B",
                },
                {
                  id: 5,
                  text: "Installing an operating system means:",
                  options: [
                    { id: "A", text: "Cleaning the computer" },
                    { id: "B", text: "Putting the OS on the computer so it can work" },
                    { id: "C", text: "Installing applications" },
                    { id: "D", text: "Deleting files" },
                  ],
                  correctAnswer: "B",
                },
                {
                  id: 6,
                  text: "Before installing an operating system, you should:",
                  options: [
                    { id: "A", text: "Delete all files" },
                    { id: "B", text: "Disconnect the keyboard" },
                    { id: "C", text: "Backup important data" },
                    { id: "D", text: "Turn off the monitor" },
                  ],
                  correctAnswer: "C",
                },
                {
                  id: 7,
                  text: "Why does a computer restart during OS installation?",
                  options: [
                    { id: "A", text: "It is broken" },
                    { id: "B", text: "It is overheating" },
                    { id: "C", text: "It is completing setup steps" },
                    { id: "D", text: "It is losing power" },
                  ],
                  correctAnswer: "C",
                },
                {
                  id: 8,
                  text: "What does OS optimization mean?",
                  options: [
                    { id: "A", text: "Making the system slower" },
                    { id: "B", text: "Making the system faster and smoother" },
                    { id: "C", text: "Installing games" },
                    { id: "D", text: "Changing wallpaper" },
                  ],
                  correctAnswer: "B",
                },
                {
                  id: 9,
                  text: "Which action helps optimize an operating system?",
                  options: [
                    { id: "A", text: "Installing many unused apps" },
                    { id: "B", text: "Never restarting the computer" },
                    { id: "C", text: "Removing unused programs" },
                    { id: "D", text: "Ignoring updates" },
                  ],
                  correctAnswer: "C",
                },
                {
                  id: 10,
                  text: "What does GUI stand for?",
                  options: [
                    { id: "A", text: "Global User Internet" },
                    { id: "B", text: "General User Input" },
                    { id: "C", text: "Graphical User Interface" },
                    { id: "D", text: "Graphic Utility Interface" },
                  ],
                  correctAnswer: "C",
                },
                {
                  id: 11,
                  text: "GUI allows users to interact using:",
                  options: [
                    { id: "A", text: "Text commands only" },
                    { id: "B", text: "Icons, windows, and mouse" },
                    { id: "C", text: "Network cables" },
                    { id: "D", text: "Programming code" },
                  ],
                  correctAnswer: "B",
                },
                {
                  id: 12,
                  text: "CLI is mainly used for:",
                  options: [
                    { id: "A", text: "Playing games" },
                    { id: "B", text: "Typing text commands" },
                    { id: "C", text: "Watching videos" },
                    { id: "D", text: "Drawing pictures" },
                  ],
                  correctAnswer: "B",
                },
                {
                  id: 13,
                  text: "Application software is:",
                  options: [
                    { id: "A", text: "Hardware inside a computer" },
                    { id: "B", text: "Software that helps users perform tasks" },
                    { id: "C", text: "The operating system" },
                    { id: "D", text: "Internet service" },
                  ],
                  correctAnswer: "B",
                },
                {
                  id: 14,
                  text: "Which is an example of application software?",
                  options: [
                    { id: "A", text: "Windows" },
                    { id: "B", text: "BIOS" },
                    { id: "C", text: "Web browser" },
                    { id: "D", text: "Firmware" },
                  ],
                  correctAnswer: "C",
                },
                {
                  id: 15,
                  text: "Cybersecurity mainly focuses on:",
                  options: [
                    { id: "A", text: "Cleaning the keyboard" },
                    { id: "B", text: "Protecting systems and data from digital threats" },
                    { id: "C", text: "Installing printers" },
                    { id: "D", text: "Formatting disks" },
                  ],
                  correctAnswer: "B",
                },
                {
                  id: 16,
                  text: "Which CLI command is used to list files and folders in the current directory?",
                  options: [
                    { id: "A", text: "cd" },
                    { id: "B", text: "dir" },
                    { id: "C", text: "cls" },
                    { id: "D", text: "mkdir" },
                  ],
                  correctAnswer: "B",
                },
                {
                  id: 17,
                  text: "Which command is used to change directories?",
                  options: [
                    { id: "A", text: "dir" },
                    { id: "B", text: "cls" },
                    { id: "C", text: "cd" },
                    { id: "D", text: "del" },
                  ],
                  correctAnswer: "C",
                },
                {
                  id: 18,
                  text: "Which command clears the command prompt screen?",
                  options: [
                    { id: "A", text: "cls" },
                    { id: "B", text: "dir" },
                    { id: "C", text: "exit" },
                    { id: "D", text: "copy" },
                  ],
                  correctAnswer: "A",
                },
                {
                  id: 19,
                  text: "Which command is used to create a new folder?",
                  options: [
                    { id: "A", text: "rmdir" },
                    { id: "B", text: "del" },
                    { id: "C", text: "mkdir" },
                    { id: "D", text: "move" },
                  ],
                  correctAnswer: "C",
                },
                {
                  id: 20,
                  text: "Which command shows the computer’s IP address information?",
                  options: [
                    { id: "A", text: "ping" },
                    { id: "B", text: "ipconfig" },
                    { id: "C", text: "tasklist" },
                    { id: "D", text: "help" },
                  ],
                  correctAnswer: "B",
                },
              ],
            },
          },
        ],
      },
    ],
  },
];
