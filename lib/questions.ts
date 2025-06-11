export interface Question {
  id: number;
  topic: 'HTML' | 'C#' | 'Algorithm';
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
  {
    id: 5,
    topic: 'HTML',
    question: 'Which HTML element is used to specify a footer for a document?',
    options: ['<bottom>', '<section>', '<footer>', '<end>'],
    correctAnswer: 2,
    explanation: 'The <footer> element defines a footer for a document or section.'
  },
  
  // C# Questions
  {
    id: 6,
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
    id: 7,
    topic: 'C#',
    question: 'What is the default access modifier for a class in C#?',
    options: ['public', 'private', 'internal', 'protected'],
    correctAnswer: 2,
    explanation: 'The default access modifier for a class in C# is internal, which means it can be accessed within the same assembly.'
  },
  {
    id: 8,
    topic: 'C#',
    question: 'Which keyword is used to inherit a class in C#?',
    options: ['extends', 'inherits', ':', 'implements'],
    correctAnswer: 2,
    explanation: 'In C#, the colon (:) is used to indicate inheritance from a base class or implementation of interfaces.'
  },
  {
    id: 9,
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
  {
    id: 10,
    topic: 'C#',
    question: 'Which of the following is NOT a value type in C#?',
    options: ['int', 'bool', 'string', 'char'],
    correctAnswer: 2,
    explanation: 'String is a reference type in C#, while int, bool, and char are value types.'
  },
  
  // Algorithm Questions
  {
    id: 11,
    topic: 'Algorithm',
    question: 'What is the time complexity of binary search?',
    options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    correctAnswer: 1,
    explanation: 'Binary search has O(log n) time complexity because it eliminates half of the remaining elements in each iteration.'
  },
  {
    id: 12,
    topic: 'Algorithm',
    question: 'Which sorting algorithm has the best average-case time complexity?',
    options: ['Bubble Sort', 'Quick Sort', 'Selection Sort', 'Insertion Sort'],
    correctAnswer: 1,
    explanation: 'Quick Sort has an average-case time complexity of O(n log n), which is better than the O(n²) of the other options.'
  },
  {
    id: 13,
    topic: 'Algorithm',
    question: 'What data structure uses LIFO (Last In, First Out) principle?',
    options: ['Queue', 'Array', 'Stack', 'Linked List'],
    correctAnswer: 2,
    explanation: 'Stack follows the LIFO principle where the last element added is the first one to be removed.'
  },
  {
    id: 14,
    topic: 'Algorithm',
    question: 'Which of the following is a stable sorting algorithm?',
    options: ['Quick Sort', 'Heap Sort', 'Merge Sort', 'Selection Sort'],
    correctAnswer: 2,
    explanation: 'Merge Sort is stable because it maintains the relative order of equal elements during sorting.'
  },
  {
    id: 15,
    topic: 'Algorithm',
    question: 'What is the space complexity of recursive factorial function?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 2,
    explanation: 'Recursive factorial has O(n) space complexity due to the call stack growing linearly with the input size.'
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