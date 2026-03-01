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
              "In this lesson, you will understand what an IP address is, why it is needed, and how it helps devices communicate on a network and on the internet.",
            definition:
              "An IP address is a unique number that identifies a device on a network, similar to a home address or phone number.",
            keyPoints: [
              "An IP address identifies a device",
              "No IP address means no communication",
              "Devices usually get IP addresses automatically from the router",
              "Each device should have a unique IP on the same network",
            ],
            howToUse: [
              "Connect your device to Wi-Fi or cable",
              "Allow the router to assign an IP address automatically",
              "Check your IP with ipconfig in Command Prompt if needed",
            ],
            tips: ["Restarting Wi-Fi can fix temporary IP problems", "Observe IP settings, but do not change them as a beginner"],
            quickSummary:
              "An IP address allows devices to find and communicate with each other on a network or the internet.",
            practiceTasks: ["Open network settings and find your IP address", "On Windows, run ipconfig in CMD and review the output"],
            quiz: [
              "What is an IP address similar to in real life?",
              "Can a device communicate on a network without an IP address?",
              "Do devices usually get IP addresses automatically?",
            ],
          },
          {
            title: "Lesson 2: Routers and Switches",
            overview:
              "In this lesson, you will learn what routers and switches do in home and office networks, and why both devices are important.",
            definition:
              "A router connects your local network to the internet and directs traffic. A switch connects devices inside a local network and helps them communicate.",
            keyPoints: [
              "Router connects LAN to the internet",
              "Switch connects multiple local devices together",
              "Routers can assign IP addresses automatically",
              "Switches do not provide internet by themselves",
            ],
            examples: [
              "At home, a router shares internet to phones and laptops",
              "In an office, a switch adds more ports for wired computers",
            ],
            tips: ["Restart router if internet becomes slow", "Place router in a central, open location", "Use a switch when cable ports are not enough"],
            commonMistakes: [
              "Thinking a router and modem are the same",
              "Connecting cables to wrong ports",
              "Turning off network devices without checking active users",
            ],
            quickSummary:
              "Router handles internet access for the network, while switch handles local device-to-device communication.",
            practiceTasks: ["Find your router and count LAN ports", "Identify which cables go to ISP, router, and local devices"],
            quiz: [
              "Which device connects a network to the internet?",
              "Which device connects computers together inside a LAN?",
              "Can a switch provide internet access by itself?",
            ],
          },
          {
            title: "Lesson 3: LAN and WAN",
            overview:
              "In this lesson, you will understand the difference between LAN and WAN and where each is used in real life.",
            definition:
              "LAN (Local Area Network) connects devices in one place, such as a home or office. WAN (Wide Area Network) connects multiple LANs across large distances.",
            keyPoints: ["LAN is small and local", "WAN is large and wide", "The internet is the largest WAN"],
            examples: ["Home Wi-Fi is LAN", "Office network is LAN", "Mobile data and internet are WAN examples"],
            howToUse: [
              "Identify your local network first",
              "Recognize that your LAN connects to a wider WAN to access online services",
              "Use both concepts when troubleshooting internet access",
            ],
            tips: ["Do not share Wi-Fi passwords publicly", "Restart local network devices during connection issues"],
            commonMistakes: ["Thinking LAN is the internet", "Assuming WAN is only for companies"],
            quickSummary: "LAN connects nearby devices. WAN connects networks over distance. Internet is the biggest WAN.",
            practiceTasks: ["Identify whether your home network is LAN or WAN", "Name one WAN service you use daily"],
            quiz: ["What does LAN stand for?", "What is the biggest WAN in the world?", "Is home Wi-Fi LAN or WAN?"],
          },
          {
            title: "Lesson 4: Network Hand Tools",
            overview:
              "In this lesson, you will learn beginner network hand tools and how they help build, fix, and test wired connections.",
            definition:
              "Network hand tools are physical tools used to prepare cables, attach connectors, and verify cable quality.",
            keyPoints: [
              "Crimping tool attaches connectors",
              "Cable tester checks if cables work correctly",
              "Wire cutter/stripper prepares cable ends",
              "Always test cables after making them",
            ],
            examples: [
              "Replacing a damaged RJ45 connector with a crimping tool",
              "Using a cable tester when internet is not working through a cable",
            ],
            tips: ["Use tools gently and safely", "Keep tools clean and organized", "Do not skip cable testing"],
            commonMistakes: ["Using wrong tools", "Forcing connectors", "Skipping final test"],
            quickSummary:
              "Network tools help you connect, test, and repair cables efficiently and reduce troubleshooting time.",
            practiceTasks: ["Look at a network cable and identify the RJ45 connector", "Name which tool attaches the connector"],
            quiz: ["What is a crimping tool used for?", "Why is a cable tester important?", "Can a cable look fine but still fail?"],
          },
          {
            title: "Lesson 5: Build a Small Wireless LAN (Wi-Fi)",
            overview:
              "In this lesson, you will build a simple Wi-Fi network and understand how devices connect wirelessly.",
            definition:
              "A wireless LAN (Wi-Fi) is a local network where devices connect without network cables using radio signals.",
            keyPoints: [
              "A wireless router creates Wi-Fi",
              "Internet enters through ISP then router shares it",
              "Strong passwords protect your network",
              "Router placement affects signal quality",
            ],
            howToUse: [
              "Power on the router",
              "Connect ISP internet cable to router",
              "Set Wi-Fi name (SSID) and password",
              "Connect devices using the new Wi-Fi credentials",
            ],
            tips: [
              "Place router near the center of the home",
              "Keep router away from metal obstacles and enclosed spaces",
              "Change default router password",
            ],
            commonMistakes: ["Using weak passwords", "Placing router in a corner", "Never restarting the router"],
            quickSummary:
              "Wi-Fi allows cable-free internet access using a router, secure credentials, and good router placement.",
            practiceTasks: ["Check your Wi-Fi name", "Count currently connected devices", "Compare signal strength near and far from router"],
            quiz: ["What device creates Wi-Fi?", "Why is a Wi-Fi password important?", "Where should a router be placed for best signal?"],
          },
          {
            title: "Lesson 6: Building a Local Area Network (LAN)",
            overview:
              "In this lesson, you will learn how to build a small wired LAN, including cable preparation, color arrangement, crimping, testing, and device connection.",
            definition:
              "A wired LAN connects nearby devices through Ethernet cables so they can share internet and local resources.",
            keyPoints: [
              "Use correct wire order for reliable cable function",
              "T568B is a common beginner standard",
              "Crimping attaches RJ45 connectors",
              "Testing confirms cable quality before deployment",
            ],
            examples: [
              "Router connected to internet, switch connected to router, and multiple computers connected to switch",
              "Using same T568B standard on both cable ends for straight-through LAN cables",
            ],
            howToUse: [
              "Prepare and strip Ethernet cable",
              "Arrange wires in T568B order",
              "Insert into RJ45 and crimp",
              "Test both ends with cable tester",
              "Connect devices to switch/router and verify communication",
            ],
            tips: ["Keep cable runs organized and labeled", "Avoid sharp cable bends", "Always test every cable before installation"],
            commonMistakes: [
              "Wrong wire order",
              "Not inserting wires fully into connector",
              "Skipping cable test",
              "Connecting to wrong router port",
            ],
            quickSummary:
              "Building a stable LAN requires correct cable assembly, proper tools, and correct router/switch connection.",
            practiceTasks: ["Inspect an Ethernet cable and compare both ends", "Identify if both ends follow the same color order"],
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
              "In this lesson, you will learn how DNS helps computers find websites using names instead of number addresses.",
            definition:
              "DNS (Domain Name System) translates website names into IP addresses so computers can connect to the correct server.",
            keyPoints: [
              "Humans use domain names, computers use IP addresses",
              "DNS performs translation automatically",
              "DNS makes browsing easier",
            ],
            quickSummary: "DNS is the internet's contact list that maps names to IP addresses.",
            practiceTasks: ["Open a browser and visit any website", "Notice that you type names, not numeric IP addresses"],
            quiz: ["What does DNS do?", "Do computers understand website names directly?"],
          },
          {
            title: "Lesson 2: Web Protocols",
            overview:
              "In this lesson, you will understand internet communication rules and why HTTPS is important for security.",
            definition:
              "A protocol is a rule set that allows computers to exchange data correctly over a network.",
            keyPoints: ["HTTP and HTTPS are common web protocols", "HTTPS encrypts communication", "Most websites use HTTPS today"],
            tips: ["Look for the lock icon in your browser", "Avoid entering passwords on HTTP-only pages"],
            quickSummary: "Protocols define how data moves. HTTPS helps keep browsing safer.",
            practiceTasks: ["Visit a website and check whether it uses HTTPS"],
            quiz: ["What is a protocol?", "Which is more secure: HTTP or HTTPS?"],
          },
          {
            title: "Lesson 3: Access and Use the Internet",
            overview:
              "In this lesson, you will learn common internet access methods and basic safe browsing practices.",
            definition:
              "Internet access allows your device to connect to global online services through Wi-Fi, mobile data, or wired Ethernet.",
            keyPoints: ["Internet connects devices worldwide", "There are multiple connection methods", "Safe use protects your data and accounts"],
            tips: ["Use strong passwords", "Avoid unknown downloads", "Do not click suspicious links"],
            quickSummary: "Internet access is simple to use, but safety habits are essential.",
            practiceTasks: ["Connect with Wi-Fi or mobile data", "Open a website and verify internet access"],
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
              "In this lesson, you will perform quick checks to identify why network or internet access is not working.",
            definition:
              "Connectivity checks are basic steps used to verify power, cables, Wi-Fi status, and device connection state.",
            keyPoints: ["Check power first", "Check cables and Wi-Fi status", "Restarting router and device solves many issues"],
            howToUse: [
              "Confirm router power and indicator lights",
              "Check cable or Wi-Fi connection",
              "Restart device and router",
              "Test with a website after 1–2 minutes",
            ],
            quickSummary: "Start with simple connectivity checks before advanced troubleshooting.",
            practiceTasks: ["Turn Wi-Fi off and on", "Restart your router and test internet"],
            quiz: ["What should you check first when internet fails?", "Can restarting a router fix issues?"],
          },
          {
            title: "Lesson 2: Common Network Errors",
            overview:
              "In this lesson, you will recognize common network errors and apply basic fixes.",
            definition:
              "A network error is a connection problem or message that indicates communication failure between a device and network service.",
            examples: ["No internet access", "Limited connectivity", "Wrong Wi-Fi password"],
            keyPoints: ["Most network errors are common and fixable", "Error messages provide useful clues", "Basic checks solve many problems"],
            howToUse: ["Reconnect and re-enter Wi-Fi password", "Restart router and device", "Move closer to router for better signal"],
            quickSummary: "Most beginner network errors can be solved with simple, repeatable steps.",
            practiceTasks: ["Disconnect from Wi-Fi and reconnect", "Test with a known correct password"],
            quiz: ["Name one common network error", "Can wrong passwords cause connection problems?"],
          },
          {
            title: "Lesson 3: Performance Tips",
            overview:
              "In this lesson, you will learn easy ways to improve internet speed and overall network stability.",
            definition:
              "Network performance describes how fast and reliable a network connection is during real usage.",
            keyPoints: ["Router placement affects signal quality", "Too many active devices can reduce speed", "Background apps can consume bandwidth"],
            howToUse: [
              "Restart router to clear temporary issues",
              "Place router in an open and central location",
              "Limit unnecessary connected devices",
              "Close apps using internet in the background",
            ],
            tips: ["Restart router weekly", "Prefer wired connection for stable tasks", "Keep router away from metal objects"],
            quickSummary: "Simple habits can greatly improve internet speed and connection reliability.",
            practiceTasks: ["Run a speed test before and after moving closer to router", "Disable unused background apps and compare performance"],
            quiz: ["Does router placement affect speed?", "Can many devices slow internet?"],
          },
        ],
      },
    ],
  },
];
