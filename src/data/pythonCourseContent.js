export const pythonCourseContent = [
  {
    id: "python-course",
    slug: "python",
    title: "Python Programming: From Fundamentals to Practical Development",
    instructor: "Dev Fraol",
    modules: [
      {
        title: "Python Foundations",
        lessons: [
          {
            title: "What is Python and Why It Matters",
            description:
              "Python is a high-level, readable programming language used in web development, automation, data science, and more. In this lesson, learners understand Python's role in modern software and how its simple syntax helps beginners focus on logic before complexity.",
            code: null,
            tip: "Python emphasizes readability—clean code is a core part of the language culture.",
          },
          {
            title: "Setting Up Your Python Environment",
            description:
              "Before writing programs, students learn how to install Python, use the terminal, run scripts, and work with virtual environments. This setup knowledge builds confidence and ensures consistent project execution across devices.",
            code: "python --version\npython -m venv .venv\nsource .venv/bin/activate",
            tip: "Always verify your Python version first to avoid compatibility issues.",
          },
          {
            title: "Variables, Data Types, and Input/Output",
            description:
              "This lesson introduces fundamental building blocks: variables, numbers, strings, booleans, and console interaction. Learners practice storing information and displaying meaningful output, which forms the base for all future exercises.",
            code: "name = input('What is your name? ')\nage = 18\nprint(f'Hello {name}, next year you will be {age + 1}.')",
            tip: "Use descriptive variable names like user_name instead of vague names like x.",
          },
          {
            title: "Operators and Expressions",
            description:
              "Students explore arithmetic, comparison, and logical operators to combine values and evaluate conditions. By the end, they can write expressions that drive decisions in code.",
            code: "score = 82\npassed = score >= 60 and score <= 100\nprint('Passed:', passed)",
            tip: "Practice with small examples; operator precedence becomes clear through repetition.",
          },
        ],
      },
      {
        title: "Core Programming Concepts",
        lessons: [
          {
            title: "Conditional Statements",
            description:
              "Learners use if, elif, and else to control program flow based on conditions. Real examples such as grading systems and login checks help students understand branching logic.",
            code: "temperature = 30\nif temperature > 35:\n    print('Very hot')\nelif temperature > 25:\n    print('Warm')\nelse:\n    print('Cool')",
            tip: "Keep conditions readable; complex logic can be split into helper variables.",
          },
          {
            title: "Loops: for and while",
            description:
              "This lesson covers repetition with for loops for known ranges and while loops for condition-driven tasks. Students learn to avoid infinite loops and write controlled iterations.",
            code: "for day in range(1, 6):\n    print(f'Day {day}')\n\ncount = 3\nwhile count > 0:\n    print(count)\n    count -= 1",
            tip: "When using while loops, always update the loop condition inside the block.",
          },
          {
            title: "Functions and Reusability",
            description:
              "Functions help organize logic into reusable units. Learners define parameters, return values, and create modular code that is easier to test and maintain.",
            code: "def calculate_total(price, quantity, discount=0):\n    subtotal = price * quantity\n    return subtotal - discount\n\nprint(calculate_total(15, 3, 5))",
            tip: "Prefer small, single-purpose functions instead of one large function.",
          },
          {
            title: "Error Handling Basics",
            description:
              "Students learn why runtime errors happen and how to handle predictable issues gracefully using try/except. The focus is user-friendly behavior instead of abrupt crashes.",
            code: "try:\n    value = int(input('Enter a number: '))\n    print(100 / value)\nexcept ValueError:\n    print('Please enter a valid integer.')\nexcept ZeroDivisionError:\n    print('Zero is not allowed here.')",
            tip: "Handle only expected exceptions and keep error messages clear for users.",
          },
        ],
      },
      {
        title: "Data Structures",
        lessons: [
          {
            title: "Working with Lists and Tuples",
            description:
              "This lesson introduces ordered collections and when to use mutable lists versus immutable tuples. Learners practice indexing, slicing, and iterating through grouped data.",
            code: "tasks = ['setup', 'code', 'test']\nprint(tasks[0])\ntasks.append('deploy')\n\ncoordinates = (10.5, 20.2)\nprint(coordinates)",
            tip: "Use tuples for values that should not change, like fixed coordinates.",
          },
          {
            title: "Dictionaries and Key-Value Modeling",
            description:
              "Students model real-world entities using dictionaries and access values by keys. They learn updates, safe retrieval, and nested structures for richer data representation.",
            code: "student = {'name': 'Asha', 'score': 91, 'active': True}\nstudent['score'] = 95\nprint(student.get('name'))",
            tip: "Use dict.get(key, default) when a key may not exist.",
          },
          {
            title: "Sets and Unique Data",
            description:
              "Sets are presented as a fast way to remove duplicates and perform operations like union and intersection. Learners compare sets with lists to understand trade-offs.",
            code: "tags = ['python', 'web', 'python', 'api']\nunique_tags = set(tags)\nprint(unique_tags)",
            tip: "Set items are unordered—do not rely on index positions.",
          },
          {
            title: "Reading and Writing Files",
            description:
              "Learners persist data by opening text files safely with context managers. The lesson emphasizes file modes, encoding basics, and avoiding resource leaks.",
            code: "with open('notes.txt', 'w', encoding='utf-8') as file:\n    file.write('Practice Python daily.\\n')\n\nwith open('notes.txt', 'r', encoding='utf-8') as file:\n    print(file.read())",
            tip: "Use with open(...) to automatically close files after operations.",
          },
        ],
      },
      {
        title: "Intermediate Python",
        lessons: [
          {
            title: "Object-Oriented Programming Fundamentals",
            description:
              "This lesson introduces classes, objects, attributes, and methods. Students build mental models for representing entities in code and organizing behavior around data.",
            code: "class Student:\n    def __init__(self, name):\n        self.name = name\n\n    def greet(self):\n        return f'Hi, I am {self.name}.'\n\nprint(Student('Lina').greet())",
            tip: "Start with simple classes first; advanced OOP patterns can come later.",
          },
          {
            title: "Inheritance and Polymorphism",
            description:
              "Learners extend base classes and override methods to specialize behavior. This lesson demonstrates reusable architecture and flexible design through polymorphism.",
            code: "class Animal:\n    def speak(self):\n        return '...'\n\nclass Dog(Animal):\n    def speak(self):\n        return 'Woof'\n\nprint(Dog().speak())",
            tip: "Inheritance should model a true 'is-a' relationship to keep design intuitive.",
          },
          {
            title: "Modules, Packages, and Imports",
            description:
              "Students organize growing codebases by splitting logic into modules and packages. They practice importing functions cleanly and understanding Python's execution entry points.",
            code: "# math_utils.py\ndef square(n):\n    return n * n\n\n# main.py\nfrom math_utils import square\nprint(square(7))",
            tip: "Avoid circular imports by keeping module responsibilities focused.",
          },
          {
            title: "Comprehensions and Cleaner Code",
            description:
              "List and dictionary comprehensions help express transformations concisely. Learners refactor verbose loops into readable one-liners while preserving clarity.",
            code: "numbers = [1, 2, 3, 4, 5]\nsquares = [n * n for n in numbers if n % 2 == 1]\nprint(squares)",
            tip: "If a comprehension becomes hard to read, switch back to a regular loop.",
          },
        ],
      },
      {
        title: "Practical Applications",
        lessons: [
          {
            title: "Project Planning: CLI Task Tracker",
            description:
              "The final module begins with project decomposition: requirements, features, and file structure for a command-line task tracker. Learners translate ideas into an actionable implementation plan.",
            code: null,
            tip: "Define the smallest usable version first, then expand features incrementally.",
          },
          {
            title: "Building CRUD Features in Python",
            description:
              "Students implement create, read, update, and delete flows for tasks stored in memory or JSON files. This lesson reinforces functions, loops, data structures, and file handling in one practical context.",
            code: "tasks = []\n\ndef add_task(title):\n    tasks.append({'title': title, 'done': False})\n\ndef list_tasks():\n    for index, task in enumerate(tasks, start=1):\n        status = '✓' if task['done'] else '✗'\n        print(f'{index}. [{status}] {task[\"title\"]}')",
            tip: "Implement one CRUD action at a time and test it before moving on.",
          },
          {
            title: "Persistence with JSON",
            description:
              "Learners save and load task data using the json module so project state persists between runs. They also discuss simple validation and fallback behavior when files are missing.",
            code: "import json\n\ndef save_tasks(tasks, filename='tasks.json'):\n    with open(filename, 'w', encoding='utf-8') as file:\n        json.dump(tasks, file, indent=2)\n\ndef load_tasks(filename='tasks.json'):\n    with open(filename, 'r', encoding='utf-8') as file:\n        return json.load(file)",
            tip: "Store data in UTF-8 and include indentation for human-readable files.",
          },
          {
            title: "Testing, Refactoring, and Next Steps",
            description:
              "The course closes with practical quality habits: writing small tests, refactoring repeated logic, and identifying paths toward web frameworks, APIs, or data analysis. Learners leave with a maintainable project and a clear growth roadmap.",
            code: "def test_add_task():\n    tasks = []\n    tasks.append({'title': 'Review loops', 'done': False})\n    assert len(tasks) == 1",
            tip: "Consistent refactoring and testing turn beginner code into professional-grade code.",
          },
        ],
      },
    ],
  },
];
