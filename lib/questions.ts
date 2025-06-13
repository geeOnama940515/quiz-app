export interface Question {
  id: number;
  topic: 'HTML' | 'C#' | 'Algorithm' | 'PHP';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export const questions: Question[] = [
  // HTML Questions
  {
    id: 1,
    topic: 'HTML',
    question: 'What does HTML stand for?',
    options: [
      'Hyper Text Markup Language',
      'High Tech Modern Language',
      'Home Tool Markup Language',
      'Hyperlink and Text Markup Language'
    ],
    correctAnswer: 0,
    explanation: 'HTML stands for HyperText Markup Language, which is the standard markup language for web pages.'
  },
  {
    id: 2,
    topic: 'HTML',
    question: 'Which HTML tag is used to create a hyperlink?',
    options: ['<link>', '<href>', '<a>', '<url>'],
    correctAnswer: 2,
    explanation: 'The <a> tag (anchor tag) is used to create hyperlinks in HTML.'
  },
  {
    id: 3,
    topic: 'HTML',
    question: 'Which attribute is used to specify the URL of a hyperlink?',
    options: ['src', 'href', 'link', 'url'],
    correctAnswer: 1,
    explanation: 'The href attribute specifies the URL of the page the link goes to.'
  },
  {
    id: 4,
    topic: 'HTML',
    question: 'What is the correct HTML element for the largest heading?',
    options: ['<heading>', '<h6>', '<h1>', '<head>'],
    correctAnswer: 2,
    explanation: '<h1> defines the most important heading, while <h6> defines the least important heading.'
  },
  
  // C# Questions
  {
    id: 5,
    topic: 'C#',
    question: 'Which of the following is the correct way to declare a variable in C#?',
    options: [
      'int x = 5;',
      'integer x = 5;',
      'var int x = 5;',
      'declare int x = 5;'
    ],
    correctAnswer: 0,
    explanation: 'In C#, variables are declared using the data type followed by the variable name and optionally initialized with a value.'
  },
  {
    id: 6,
    topic: 'C#',
    question: 'What is the default access modifier for a class in C#?',
    options: ['public', 'private', 'internal', 'protected'],
    correctAnswer: 2,
    explanation: 'The default access modifier for a class in C# is internal, which means it can be accessed within the same assembly.'
  },
  {
    id: 7,
    topic: 'C#',
    question: 'Which keyword is used to inherit a class in C#?',
    options: ['extends', 'inherits', ':', 'implements'],
    correctAnswer: 2,
    explanation: 'In C#, the colon (:) is used to indicate inheritance from a base class or implementation of interfaces.'
  },
  {
    id: 8,
    topic: 'C#',
    question: 'What is the correct way to create an array in C#?',
    options: [
      'int[] arr = new int[5];',
      'int arr[] = new int[5];',
      'array<int> arr = new array<int>(5);',
      'int arr = new int[5];'
    ],
    correctAnswer: 0,
    explanation: 'Arrays in C# are declared using square brackets after the data type, followed by the new keyword and array size.'
  },
  
  // PHP Questions
  {
    id: 9,
    topic: 'PHP',
    question: 'What does PHP stand for?',
    options: [
      'Personal Home Page',
      'PHP: Hypertext Preprocessor',
      'Private Home Page',
      'Professional Hypertext Processor'
    ],
    correctAnswer: 1,
    explanation: 'PHP originally stood for "Personal Home Page" but now stands for "PHP: Hypertext Preprocessor" (a recursive acronym).'
  },
  {
    id: 10,
    topic: 'PHP',
    question: 'Which symbol is used to declare a variable in PHP?',
    options: ['&', '#', '$', '@'],
    correctAnswer: 2,
    explanation: 'In PHP, all variables are prefixed with the dollar sign ($) symbol.'
  },
  {
    id: 11,
    topic: 'PHP',
    question: 'How do you start a PHP script?',
    options: ['<php>', '<?php', '<script>', '<%php%>'],
    correctAnswer: 1,
    explanation: 'PHP scripts start with the opening tag <?php and can optionally end with ?>'
  },
  {
    id: 12,
    topic: 'PHP',
    question: 'Which function is used to include a file in PHP?',
    options: ['import()', 'include()', 'require_file()', 'load()'],
    correctAnswer: 1,
    explanation: 'The include() function is used to include and evaluate a specified file. There\'s also require(), include_once(), and require_once().'
  },
  {
    id: 13,
    topic: 'PHP',
    question: 'What is the correct way to create an associative array in PHP?',
    options: [
      '$arr = array("key" => "value");',
      '$arr = ["key" = "value"];',
      '$arr = {"key": "value"};',
      '$arr = ("key" -> "value");'
    ],
    correctAnswer: 0,
    explanation: 'Associative arrays in PHP use the => operator to associate keys with values.'
  },
  {
    id: 14,
    topic: 'PHP',
    question: 'Which superglobal variable contains form data sent via POST method?',
    options: ['$_GET', '$_POST', '$_REQUEST', '$_FORM'],
    correctAnswer: 1,
    explanation: '$_POST is a superglobal variable that contains data sent to the script via HTTP POST method.'
  },
  
  // Algorithm Questions
  {
    id: 15,
    topic: 'Algorithm',
    question: 'What is the time complexity of binary search?',
    options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    correctAnswer: 1,
    explanation: 'Binary search has O(log n) time complexity because it eliminates half of the remaining elements in each iteration.'
  },
  {
    id: 16,
    topic: 'Algorithm',
    question: 'Which sorting algorithm has the best average-case time complexity?',
    options: ['Bubble Sort', 'Quick Sort', 'Selection Sort', 'Insertion Sort'],
    correctAnswer: 1,
    explanation: 'Quick Sort has an average-case time complexity of O(n log n), which is better than the O(n²) of the other options.'
  },
  {
    id: 17,
    topic: 'Algorithm',
    question: 'What data structure uses LIFO (Last In, First Out) principle?',
    options: ['Queue', 'Array', 'Stack', 'Linked List'],
    correctAnswer: 2,
    explanation: 'Stack follows the LIFO principle where the last element added is the first one to be removed.'
  },
  {
    id: 18,
    topic: 'Algorithm',
    question: 'Which of the following is a stable sorting algorithm?',
    options: ['Quick Sort', 'Heap Sort', 'Merge Sort', 'Selection Sort'],
    correctAnswer: 2,
    explanation: 'Merge Sort is stable because it maintains the relative order of equal elements during sorting.'
  }
];

export const getQuestionsByTopic = (topic: Question['topic']) => {
  return questions.filter(q => q.topic === topic);
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};