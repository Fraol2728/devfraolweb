export const networkingInternetBasicsCourseContent = [
  {
    id: "networking-internet-basics-course",
    slug: "networking-internet-basics",
    title: "Networking & Internet Basics",
    modules: [
      {
        title: "Module 1: Networking Fundamentals",
        lessons: [
          {
            title: "Lesson 1: IP Addressing",
            overview:
              "In this lesson, you will clearly understand what an IP address is, why it is needed, and how it helps devices communicate on a network and on the internet. No technical background is required.",
            definition:
              "An IP address is like a phone number or home address for a device. It is a unique number that identifies a device on a network.",
            examples: [
              "A simple IP address looks like 192.168.1.5",
              "If a phone, laptop, or smart TV connects to a network, it has an IP address",
            ],
            keyPoints: [
              "An IP address identifies a device",
              "No IP address means no communication",
              "Each device should have a unique IP on the same network",
              "Most devices get IP addresses automatically from the router",
            ],
            howToUse: [
              "Connect your device to Wi-Fi or Ethernet",
              "Allow the router to assign the IP automatically",
              "If needed, open Command Prompt and run ipconfig to view your IP",
              "Observe the address only; do not edit settings as a beginner",
            ],
            tips: [
              "Restart Wi-Fi or router to fix temporary IP issues",
              "You do not need to memorize IP number formats at this stage",
            ],
            quickSummary:
              "An IP address is a unique number that allows devices to find and communicate with each other on a network or the internet.",
            practiceTasks: [
              "Open your device network settings and locate the IP address",
              "On Windows, run ipconfig and identify the IPv4 address",
            ],
            quiz: [
              "What is an IP address similar to in real life?",
              "Can a device communicate on a network without an IP address?",
              "Do devices usually get IP addresses automatically?",
            ],
          },
          {
            title: "Lesson 2: Routers and Switches",
            overview:
              "In this lesson, you will clearly understand what routers and switches are, what they do, and why they are important in home and office networks.",
            definition:
              "A router connects your local network to the internet and directs data to the correct destination. A switch connects devices inside a local network so they can communicate with each other.",
            examples: [
              "Home example: router shares internet to phones and laptops while a switch can add extra wired ports",
              "Office example: one router connects to ISP and one or more switches connect many computers",
            ],
            keyPoints: [
              "Router connects LAN to the internet",
              "Switch connects multiple local devices together",
              "Routers often assign IP addresses automatically",
              "Switches do not provide internet by themselves",
            ],
            howToUse: [
              "Connect the router to your ISP line",
              "Connect local devices directly to router LAN ports or via a switch",
              "Use a switch when you need more wired device connections",
            ],
            tips: [
              "Restart router when internet is slow",
              "Place router in a central and open location",
              "Check cable ports carefully before plugging",
            ],
            commonMistakes: [
              "Thinking router and modem are always the same device",
              "Plugging cables into wrong ports",
              "Turning off router during active usage",
            ],
            quickSummary:
              "Router handles internet access and traffic direction, while switch handles local device-to-device communication.",
            practiceTasks: [
              "Find your router and count LAN ports",
              "Identify which cable is from ISP and which cables go to local devices",
            ],
            quiz: [
              "Which device connects a network to the internet?",
              "Which device connects computers together inside a LAN?",
              "Can a switch provide internet access by itself?",
            ],
          },
          {
            title: "Lesson 3: LAN and WAN",
            overview:
              "In this lesson, you will understand what LAN and WAN mean, how they are different, and where you use them in real life.",
            definition:
              "LAN (Local Area Network) connects devices in one place, such as a home, school, or office. WAN (Wide Area Network) connects multiple LANs across large distances such as cities and countries.",
            examples: [
              "LAN examples: home Wi-Fi, office network, school computer lab",
              "WAN examples: internet, mobile data network, branches connected across regions",
            ],
            keyPoints: [
              "LAN is small and local",
              "WAN is large and wide",
              "The internet is the largest WAN",
            ],
            howToUse: [
              "Identify your local network first (home or office)",
              "Understand that LAN connects to WAN for internet access",
              "Use this idea when troubleshooting: local issue vs internet-side issue",
            ],
            tips: [
              "Protect LAN by using a strong Wi-Fi password",
              "Restart local devices when connection drops",
            ],
            commonMistakes: [
              "Thinking LAN is the internet",
              "Assuming WAN is only for large companies",
              "Ignoring basic network security",
            ],
            quickSummary: "LAN connects nearby devices. WAN connects networks across distance. Internet is the biggest WAN.",
            practiceTasks: ["Identify your current network and classify it as LAN or WAN", "Name one WAN service you use daily"],
            quiz: ["What does LAN stand for?", "What is the biggest WAN in the world?", "Is home Wi-Fi LAN or WAN?"],
          },
          {
            title: "Lesson 4: Network Hand Tools",
            overview:
              "In this lesson, you will learn about basic network hand tools, what each tool is used for, and why they are important when building or fixing a network.",
            definition:
              "Network hand tools are simple physical tools used to connect, test, and fix network cables safely and correctly.",
            examples: [
              "Crimping tool: attaches RJ45 connectors to cable ends",
              "Cable tester: confirms if a cable works or has wiring problems",
              "Wire cutter/stripper: cuts cable and removes cable jacket",
              "Screwdriver: opens network boxes and mounts devices",
            ],
            keyPoints: [
              "Tools save time and reduce mistakes",
              "Crimping tool attaches connectors",
              "Cable tester checks cable quality",
              "Always test cables after making them",
            ],
            tips: [
              "Use tools gently and correctly",
              "Keep tools clean and organized",
              "Never skip final cable testing",
            ],
            commonMistakes: [
              "Using the wrong tool for the task",
              "Forcing connectors into cable ends",
              "Skipping tester verification",
            ],
            quickSummary:
              "Network tools help you build reliable connections, confirm cable quality, and troubleshoot faults faster.",
            practiceTasks: ["Look at an Ethernet cable and identify the RJ45 connector", "Name which tool is used to attach the connector"],
            quiz: ["What is a crimping tool used for?", "Why is a cable tester important?", "Can a cable look fine but still fail?"],
          },
          {
            title: "Lesson 5: Build a Small Wireless LAN (Wi-Fi)",
            overview:
              "In this lesson, you will learn how to build a small wireless network step by step and understand how devices connect to Wi-Fi.",
            definition:
              "A wireless LAN (Wi-Fi) is a local network that connects devices without cables by using radio signals.",
            keyPoints: [
              "A wireless router creates and shares Wi-Fi",
              "Internet comes from ISP and is distributed by the router",
              "Strong passwords protect your network",
              "Router placement strongly affects signal quality",
            ],
            howToUse: [
              "Power on the router",
              "Connect ISP internet cable to router WAN port",
              "Open router settings and set Wi-Fi name (SSID) and password",
              "Connect phones, laptops, and tablets using the new credentials",
              "Test internet by opening a website",
            ],
            tips: [
              "Place router in the center of the home",
              "Keep it away from metal obstacles and closed cabinets",
              "Change default admin and Wi-Fi passwords",
              "Restart router if speed becomes unstable",
            ],
            commonMistakes: ["Using weak passwords", "Placing router in corners", "Never reviewing unknown connected devices"],
            quickSummary:
              "A small Wi-Fi network needs internet input, a properly configured router, secure credentials, and smart router placement.",
            practiceTasks: ["Check your Wi-Fi name", "Count connected devices", "Compare signal strength near and far from router"],
            quiz: ["What device creates Wi-Fi?", "Why is a Wi-Fi password important?", "Where should a router be placed for best signal?"],
          },
          {
            title: "Lesson 6: Building a Local Area Network (LAN)",
            overview:
              "In this lesson, you will build a small wired LAN and learn cable preparation, T568B wire arrangement, crimping, testing, and final device setup.",
            definition:
              "A wired LAN connects nearby devices through Ethernet cables so they can share internet, files, and local resources reliably.",
            examples: [
              "Small office setup: router to switch, then switch to multiple PCs",
              "Straight-through cable setup: same T568B wire order on both ends",
            ],
            keyPoints: [
              "Ethernet cables contain 8 color-coded wires",
              "T568B is a common beginner cable standard",
              "Crimping attaches RJ45 connectors to cable ends",
              "Cable testing confirms wiring is correct before use",
            ],
            howToUse: [
              "Cut and strip cable to expose the 8 wires",
              "Arrange wires in T568B order: White/Orange, Orange, White/Green, Blue, White/Blue, Green, White/Brown, Brown",
              "Insert wires fully into RJ45 connector",
              "Crimp firmly using a crimping tool",
              "Repeat for second end with the same T568B order",
              "Test both ends with cable tester and confirm all 8 lines",
              "Connect PC to switch/router and verify connectivity",
            ],
            tips: [
              "Label cables when multiple devices are involved",
              "Keep cable paths neat and avoid sharp bends",
              "Always test cable before deploying it",
            ],
            commonMistakes: [
              "Wrong wire color order",
              "Wires not fully inserted into connector",
              "Skipping cable testing",
              "Plugging cable into incorrect router port",
            ],
            quickSummary:
              "Building a stable LAN requires correct wire order, proper crimping, cable testing, and correct connection of router, switch, and devices.",
            practiceTasks: ["Inspect an Ethernet cable and compare both ends", "Check whether both ends follow the same color order"],
            quiz: [
              "What does LAN stand for?",
              "Why must wire colors be arranged correctly?",
              "What tool attaches RJ45 connectors?",
              "What device connects LAN to the internet?",
            ],
          },
        ],
      },
      {
        title: "Module 2: Internet Fundamentals",
        lessons: [
          {
            title: "Lesson 1: DNS Basics",
            overview:
              "In this lesson, you will learn how website names are converted into numbers so computers can find websites quickly and correctly.",
            definition:
              "DNS (Domain Name System) is like a contact list for the internet. It translates website names into IP addresses.",
            examples: ["You type www.example.com, DNS finds the matching IP address, then your browser opens the site"],
            keyPoints: [
              "Humans use website names, computers use IP numbers",
              "DNS performs translation automatically",
              "DNS makes web browsing easy for beginners",
            ],
            tips: ["DNS works in the background", "Beginners usually do not need to change DNS settings"],
            quickSummary: "DNS helps computers find websites using easy names instead of difficult number addresses.",
            practiceTasks: ["Open a browser and visit any website", "Notice you type names, not numeric IP addresses"],
            quiz: ["What does DNS do?", "Do computers understand website names directly?"],
          },
          {
            title: "Lesson 2: Web Protocols",
            overview:
              "In this lesson, you will understand the basic rules that allow information to move correctly and safely on the internet.",
            definition:
              "A protocol is a set of communication rules that tells computers how to send and receive data.",
            examples: ["HTTP is used for regular web communication", "HTTPS is secure web communication with encryption"],
            keyPoints: ["Protocols make communication possible", "HTTPS is safer than HTTP", "Most modern websites use HTTPS"],
            tips: ["Look for the lock icon in your browser", "Avoid entering passwords on HTTP-only pages"],
            quickSummary: "Protocols are communication rules, and HTTPS helps protect your data while browsing.",
            practiceTasks: ["Visit a few websites and check if each one uses HTTPS"],
            quiz: ["What is a protocol?", "Which is more secure: HTTP or HTTPS?"],
          },
          {
            title: "Lesson 3: Access and Use the Internet",
            overview:
              "In this lesson, you will learn how devices access the internet and how to use online services safely.",
            definition:
              "Internet access is the process of connecting your device to global services using Wi-Fi, mobile data, or wired Ethernet.",
            examples: ["Connecting a phone with mobile data", "Connecting a laptop through home Wi-Fi"],
            keyPoints: ["Internet connects devices worldwide", "There are multiple access methods", "Safe use protects accounts and personal data"],
            tips: ["Use strong passwords", "Avoid unknown downloads", "Do not click suspicious links"],
            quickSummary: "The internet enables communication and information sharing, but safe usage habits are essential.",
            practiceTasks: ["Connect to Wi-Fi or mobile data", "Open a website and confirm internet access"],
            quiz: ["Name one way to access the internet", "Why is safe internet use important?"],
          },
        ],
      },
      {
        title: "Module 3: Network Troubleshooting & Performance",
        lessons: [
          {
            title: "Lesson 1: Connectivity Checks",
            overview:
              "In this lesson, you will perform basic connectivity checks to find out why internet or network access is not working.",
            definition:
              "Connectivity checks are simple diagnostic steps for verifying power, cables, Wi-Fi status, and device connection state.",
            keyPoints: [
              "Start with simple checks before advanced fixes",
              "Power, cables, and Wi-Fi status are most common causes",
              "Restarting router and device solves many temporary issues",
            ],
            howToUse: [
              "Check if router is on and indicator lights are active",
              "Check Ethernet cable fit and cable condition",
              "Verify Wi-Fi is enabled and connected to correct network",
              "Restart device and router, wait 1–2 minutes, then retest",
            ],
            tips: ["Check whether other devices also lost internet", "Use the same test website after each fix step"],
            quickSummary: "Connectivity checks help you find and solve simple network problems quickly.",
            practiceTasks: ["Turn Wi-Fi off and on", "Restart router and test internet again"],
            quiz: ["What should you check first when internet fails?", "Can restarting a router fix issues?"],
          },
          {
            title: "Lesson 2: Common Network Errors",
            overview:
              "In this lesson, you will identify common network errors and apply easy fixes before escalating support.",
            definition:
              "A network error is a message or condition showing that a device cannot communicate properly with network or internet services.",
            examples: ["No internet access", "Limited connectivity", "Wrong Wi-Fi password"],
            keyPoints: [
              "Most beginner network errors are common and fixable",
              "Error messages provide useful troubleshooting clues",
              "Simple repeatable steps resolve many issues",
            ],
            howToUse: [
              "Re-enter Wi-Fi password carefully",
              "Restart router and device",
              "Move closer to router and test again",
              "If all local checks fail, contact ISP",
            ],
            tips: ["Do not panic when you see errors", "Try basic fixes before changing settings"],
            quickSummary: "Common network errors can usually be resolved with simple checks and reconnection steps.",
            practiceTasks: ["Disconnect from Wi-Fi and reconnect", "Test with a known correct password"],
            quiz: ["Name one common network error", "Can wrong passwords cause connection problems?"],
          },
          {
            title: "Lesson 3: Performance Tips",
            overview:
              "In this lesson, you will learn practical habits that improve internet speed, signal quality, and connection stability.",
            definition:
              "Network performance describes how fast and reliable your network feels during real use.",
            keyPoints: [
              "Router placement affects signal strength",
              "Too many active devices can reduce speed",
              "Background apps consume bandwidth",
            ],
            howToUse: [
              "Restart router weekly to clear temporary issues",
              "Place router in an open central location",
              "Limit unnecessary connected devices",
              "Close apps that use internet in the background",
              "Use wired Ethernet for stable high-priority tasks",
            ],
            tips: ["Keep router away from metal objects", "Compare performance before and after each improvement"],
            quickSummary: "Simple actions and good habits can significantly improve network speed and reliability.",
            practiceTasks: ["Run a speed test before and after moving closer to router", "Disable unused apps and compare internet performance"],
            quiz: ["Does router placement affect speed?", "Can many devices slow internet?"],
          },
          {
            title: "Lesson 4: Final Exam",
            exam: {
              title: "Networking & Internet Basics Final Exam",
              questions: [
                {
                  id: 1,
                  text: "What is an IP address?",
                  options: [
                    { id: "A", text: "A computer name" },
                    { id: "B", text: "A unique number that identifies a device on a network" },
                    { id: "C", text: "A website address" },
                    { id: "D", text: "A password" },
                  ],
                  correctAnswer: "B",
                },
                {
                  id: 2,
                  text: "Which device connects different networks together?",
                  options: [
                    { id: "A", text: "Switch" },
                    { id: "B", text: "Router" },
                    { id: "C", text: "Cable" },
                    { id: "D", text: "Monitor" },
                  ],
                  correctAnswer: "B",
                },
                {
                  id: 3,
                  text: "What does LAN stand for?",
                  options: [
                    { id: "A", text: "Large Area Network" },
                    { id: "B", text: "Local Area Network" },
                    { id: "C", text: "Long Access Network" },
                    { id: "D", text: "Local Access Node" },
                  ],
                  correctAnswer: "B",
                },
                {
                  id: 4,
                  text: "Which network covers a large geographical area?",
                  options: [
                    { id: "A", text: "LAN" },
                    { id: "B", text: "WLAN" },
                    { id: "C", text: "WAN" },
                    { id: "D", text: "PAN" },
                  ],
                  correctAnswer: "C",
                },
                {
                  id: 5,
                  text: "Which tool is used to test Ethernet network cables?",
                  options: [
                    { id: "A", text: "Screwdriver" },
                    { id: "B", text: "Cable tester" },
                    { id: "C", text: "Monitor" },
                    { id: "D", text: "Keyboard" },
                  ],
                  correctAnswer: "B",
                },
                {
                  id: 6,
                  text: "What is Wi-Fi mainly used for?",
                  options: [
                    { id: "A", text: "Printing" },
                    { id: "B", text: "Wireless network connection" },
                    { id: "C", text: "Power supply" },
                    { id: "D", text: "File storage" },
                  ],
                  correctAnswer: "B",
                },
                {
                  id: 7,
                  text: "What does DNS do?",
                  options: [
                    { id: "A", text: "Stores files" },
                    { id: "B", text: "Converts domain names to IP addresses" },
                    { id: "C", text: "Protects against viruses" },
                    { id: "D", text: "Boosts internet speed" },
                  ],
                  correctAnswer: "B",
                },
                {
                  id: 8,
                  text: "Which protocol is more secure for websites?",
                  options: [
                    { id: "A", text: "HTTP" },
                    { id: "B", text: "FTP" },
                    { id: "C", text: "HTTPS" },
                    { id: "D", text: "IP" },
                  ],
                  correctAnswer: "C",
                },
                {
                  id: 9,
                  text: "What symbol usually shows a secure website?",
                  options: [
                    { id: "A", text: "⭐ Star" },
                    { id: "B", text: "🔒 Lock" },
                    { id: "C", text: "⚠️ Warning" },
                    { id: "D", text: "➡️ Arrow" },
                  ],
                  correctAnswer: "B",
                },
                {
                  id: 10,
                  text: "Which is a common way to access the internet?",
                  options: [
                    { id: "A", text: "Printer" },
                    { id: "B", text: "Scanner" },
                    { id: "C", text: "Wi-Fi" },
                    { id: "D", text: "Speaker" },
                  ],
                  correctAnswer: "C",
                },
                {
                  id: 11,
                  text: "What should you check first when the internet is not working?",
                  options: [
                    { id: "A", text: "Buy a new router" },
                    { id: "B", text: "Call a technician" },
                    { id: "C", text: "Check power and connections" },
                    { id: "D", text: "Change computer" },
                  ],
                  correctAnswer: "C",
                },
                {
                  id: 12,
                  text: "Restarting a router helps because it:",
                  options: [
                    { id: "A", text: "Makes internet free" },
                    { id: "B", text: "Clears temporary problems" },
                    { id: "C", text: "Deletes user data" },
                    { id: "D", text: "Changes Wi-Fi name" },
                  ],
                  correctAnswer: "B",
                },
                {
                  id: 13,
                  text: "What commonly causes slow internet speed?",
                  options: [
                    { id: "A", text: "Bright screen" },
                    { id: "B", text: "Too many connected devices" },
                    { id: "C", text: "Keyboard settings" },
                    { id: "D", text: "Mouse speed" },
                  ],
                  correctAnswer: "B",
                },
                {
                  id: 14,
                  text: "Which cable color standard is used in LAN wiring?",
                  options: [
                    { id: "A", text: "RGB" },
                    { id: "B", text: "T568A / T568B" },
                    { id: "C", text: "CMYK" },
                    { id: "D", text: "HDMI" },
                  ],
                  correctAnswer: "B",
                },
                {
                  id: 15,
                  text: "What is a network switch mainly used for?",
                  options: [
                    { id: "A", text: "Internet browsing" },
                    { id: "B", text: "Connecting devices in a LAN" },
                    { id: "C", text: "Wireless signals" },
                    { id: "D", text: "Power control" },
                  ],
                  correctAnswer: "B",
                },
                {
                  id: 16,
                  text: "Where should a Wi-Fi router be placed for best performance?",
                  options: [
                    { id: "A", text: "Inside a cabinet" },
                    { id: "B", text: "Near metal objects" },
                    { id: "C", text: "In a central open location" },
                    { id: "D", text: "On the floor" },
                  ],
                  correctAnswer: "C",
                },
                {
                  id: 17,
                  text: "What happens if the Wi-Fi password is incorrect?",
                  options: [
                    { id: "A", text: "Internet slows down" },
                    { id: "B", text: "Device still connects" },
                    { id: "C", text: "Connection fails" },
                    { id: "D", text: "Router turns off" },
                  ],
                  correctAnswer: "C",
                },
                {
                  id: 18,
                  text: "What does WAN usually connect?",
                  options: [
                    { id: "A", text: "Devices in one room" },
                    { id: "B", text: "One computer only" },
                    { id: "C", text: "Multiple LANs over distance" },
                    { id: "D", text: "USB devices" },
                  ],
                  correctAnswer: "C",
                },
                {
                  id: 19,
                  text: "Which is a basic network hand tool?",
                  options: [
                    { id: "A", text: "Hammer" },
                    { id: "B", text: "Crimping tool" },
                    { id: "C", text: "Paint brush" },
                    { id: "D", text: "Calculator" },
                  ],
                  correctAnswer: "B",
                },
                {
                  id: 20,
                  text: "Which connection is usually more stable?",
                  options: [
                    { id: "A", text: "Wi-Fi" },
                    { id: "B", text: "Bluetooth" },
                    { id: "C", text: "Wired Ethernet" },
                    { id: "D", text: "Mobile hotspot" },
                  ],
                  correctAnswer: "C",
                },
              ],
            },
          },
        ],
      },
    ],
  },
];
