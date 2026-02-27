export const microsoftWindowsCourseContent = [
  {
    id: "microsoft-windows-course",
    slug: "microsoft-windows",
    title: "Microsoft Windows Mastery",
    instructor: "Dev Fraol",
    modules: [
      {
        title: "Windows Basics",
        lessons: [
          {
            title: "Desktop and Taskbar",
            description:
              "This lesson introduces the Windows desktop workspace and taskbar essentials so learners can confidently launch apps, manage open windows, pin important tools, and navigate notifications. By understanding the Start menu, system tray, and taskbar customization, students build a strong foundation for everyday system use.",
            code:
              "1. Press the Windows key to open Start and search for an app.\n2. Right-click an app and select 'Pin to taskbar'.\n3. Use Win + D to show the desktop quickly.\n4. Open multiple apps and switch with Alt + Tab.",
            tip: "Pin your most-used applications (browser, file manager, notes) to reduce click time during daily work.",
          },
          {
            title: "File Manager",
            description:
              "Learners explore File Manager (File Explorer) to create folders, organize files, use quick access, and perform common operations such as copy, move, rename, and delete. The lesson also explains directory structure and practical naming conventions so users can locate content faster and keep devices tidy.",
            code:
              "1. Open File Manager with Win + E.\n2. Create a folder structure: Documents/Study/Windows-Course.\n3. Rename files using clear names like 'lesson-notes-01.txt'.\n4. Practice copy (Ctrl + C), paste (Ctrl + V), and cut (Ctrl + X).",
            tip: "Use consistent file naming with dates (YYYY-MM-DD) for easier sorting and retrieval.",
          },
          {
            title: "Settings and User Management",
            description:
              "This lesson explains how to configure core system options in Windows Settings, including display, sound, network, personalization, and accounts. Students also learn user management basics such as creating local accounts, setting passwords, and understanding administrator versus standard user privileges.",
            code:
              "1. Open Settings with Win + I.\n2. Visit Accounts > Family & other users.\n3. Add a new user and assign account type (Standard or Administrator).\n4. Configure sign-in options such as PIN or password.",
            tip: "Use a standard account for day-to-day activity and reserve administrator access for trusted setup tasks.",
          },
        ],
      },
      {
        title: "System Productivity",
        lessons: [
          {
            title: "Shortcuts",
            description:
              "Students learn high-impact Windows keyboard shortcuts that improve speed and reduce repetitive mouse actions. The lesson focuses on navigation, window management, clipboard history, and quick access commands that significantly boost productivity in study or office workflows.",
            code:
              "Common shortcuts:\n- Win + E: Open File Manager\n- Win + L: Lock screen\n- Win + V: Open clipboard history\n- Win + Shift + S: Capture a selected screenshot\n- Alt + Tab: Switch between open applications",
            tip: "Memorize 3 to 5 shortcuts first, then add more weekly to build habit without overload.",
          },
          {
            title: "Task Manager",
            description:
              "This lesson teaches how to use Task Manager to monitor CPU, memory, disk, and startup impact. Learners identify frozen apps, end non-responsive tasks safely, and optimize startup programs for faster boot times while understanding what not to terminate.",
            code:
              "1. Open Task Manager with Ctrl + Shift + Esc.\n2. In Processes, sort by CPU or Memory to find heavy apps.\n3. Select an unresponsive application and click 'End task'.\n4. In Startup apps, disable unnecessary high-impact items.",
            tip: "Avoid ending unknown system processes unless you are certain of their purpose.",
          },
          {
            title: "Storage Optimization",
            description:
              "Learners discover practical storage management techniques using Storage settings, temporary file cleanup, and cloud/offline balancing. The lesson covers freeing disk space safely, identifying large files, and keeping enough free capacity for smooth updates and performance.",
            code:
              "1. Go to Settings > System > Storage.\n2. Open Temporary files and remove safe-to-delete items.\n3. Enable Storage Sense for automatic cleanup.\n4. Move large media files to cloud or external drives.",
            tip: "Keep at least 15–20% of your system drive free to maintain stable performance.",
          },
          {
            title: "Keyboard Language",
            description:
              "This lesson explains how to add and switch between keyboard layouts and input languages in Windows. Students practice multilingual typing, configure preferred language order, and troubleshoot accidental layout changes that cause unexpected character input.",
            code:
              "1. Open Settings > Time & language > Language & region.\n2. Add a language and install its keyboard layout.\n3. Switch layouts with Win + Space.\n4. Reorder preferred languages for default behavior.",
            tip: "If characters look wrong while typing, first check whether the keyboard layout changed.",
          },
          {
            title: "Application Software Install",
            description:
              "Students learn safe software installation practices using trusted sources such as the Microsoft Store and official vendor websites. The lesson includes understanding installer prompts, selecting installation paths, updating software, and uninstalling apps cleanly.",
            code:
              "1. Download apps from Microsoft Store or official websites only.\n2. Run installer and review permissions/options carefully.\n3. Complete installation, then check for updates in app settings.\n4. Uninstall unused apps via Settings > Apps > Installed apps.",
            tip: "Always verify software source authenticity to avoid malware or bundled unwanted programs.",
          },
        ],
      },
      {
        title: "Maintenance",
        lessons: [
          {
            title: "Update",
            description:
              "This lesson covers Windows Update fundamentals, including checking for updates, scheduling restart windows, and understanding quality versus feature updates. Learners build routines that keep systems secure, compatible, and stable without interrupting important work.",
            code:
              "1. Open Settings > Windows Update.\n2. Click 'Check for updates'.\n3. Install available updates and choose a convenient restart time.\n4. Review update history for recently applied patches.",
            tip: "Schedule updates outside study or work hours to prevent disruption during critical tasks.",
          },
          {
            title: "Security Basics",
            description:
              "Learners are introduced to essential Windows security practices: Microsoft Defender scanning, firewall awareness, account protection, and phishing prevention. The lesson emphasizes practical daily habits that reduce risk, especially when downloading files or browsing unknown links.",
            code:
              "1. Open Windows Security from Start.\n2. Run a Quick scan under Virus & threat protection.\n3. Confirm Firewall is enabled for active network profiles.\n4. Turn on reputation-based protection where available.",
            tip: "Security is strongest when technical protections and careful user behavior are combined.",
          },
          {
            title: "Backup Options",
            description:
              "This lesson teaches backup strategies for personal and study files using OneDrive sync, external drives, and File History/System Image options. Learners understand the 3-2-1 backup principle and practice restoring files to reduce the impact of accidental deletion or hardware failure.",
            code:
              "1. Connect an external drive or sign in to OneDrive.\n2. Enable backup for important folders (Desktop, Documents, Pictures).\n3. Configure File History or periodic manual backups.\n4. Test restore by recovering one sample file.",
            tip: "A backup is only reliable if restore has been tested at least once.",
          },
        ],
      },
    ],
  },
];
