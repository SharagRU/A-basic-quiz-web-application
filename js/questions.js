// ========================================
// OUTSMART AI - QUESTION DATABASE
// ========================================

const questions = [

    // ========================================
    // LOGIC
    // ========================================

    {
        id: 1,
        category: "LOGIC",
        difficulty: "EASY",

        question: "What comes next?",

        display: `
            <div class="sequence">
                2 <span>→</span>
                6 <span>→</span>
                12 <span>→</span>
                20 <span>→</span>
                <strong>?</strong>
            </div>
        `,

        options: ["24", "30", "32", "42"],

        answer: 1,

        explanation:
            "The pattern is n × (n + 1): 1×2, 2×3, 3×4, 4×5, so the next value is 5×6 = 30.",

        points: 100
    },


    {
        id: 2,
        category: "LOGIC",
        difficulty: "EASY",

        question: "Which number doesn't belong?",

        display: `
            <div class="number-row">
                3 &nbsp;&nbsp; 5 &nbsp;&nbsp; 7 &nbsp;&nbsp; 9 &nbsp;&nbsp; 11
            </div>
        `,

        options: ["3", "7", "9", "11"],

        answer: 2,

        explanation:
            "9 is the only composite number. The other numbers are prime.",

        points: 100
    },


    {
        id: 3,
        category: "LOGIC",
        difficulty: "MEDIUM",

        question: "What comes next?",

        display: `
            <div class="number-row">
                1 &nbsp;&nbsp; 4 &nbsp;&nbsp; 9 &nbsp;&nbsp; 16 &nbsp;&nbsp; ?
            </div>
        `,

        options: ["20", "24", "25", "36"],

        answer: 2,

        explanation:
            "These are consecutive square numbers: 1², 2², 3², 4², 5².",

        points: 150
    },


    // ========================================
    // PATTERNS
    // ========================================

    {
        id: 4,
        category: "PATTERN",
        difficulty: "EASY",

        question: "Find the missing number.",

        display: `
            <div class="number-row">
                5 &nbsp;&nbsp; 10 &nbsp;&nbsp; 20 &nbsp;&nbsp; 40 &nbsp;&nbsp; ?
            </div>
        `,

        options: ["60", "70", "80", "100"],

        answer: 2,

        explanation:
            "Each number is multiplied by 2.",

        points: 100
    },


    {
        id: 5,
        category: "PATTERN",
        difficulty: "MEDIUM",

        question: "What comes next?",

        display: `
            <div class="number-row">
                2 &nbsp;&nbsp; 3 &nbsp;&nbsp; 5 &nbsp;&nbsp; 8 &nbsp;&nbsp; 13 &nbsp;&nbsp; ?
            </div>
        `,

        options: ["18", "20", "21", "26"],

        answer: 2,

        explanation:
            "Each number is the sum of the previous two numbers.",

        points: 150
    },


    // ========================================
    // PROGRAMMING
    // ========================================

    {
        id: 6,
        category: "PYTHON",
        difficulty: "EASY",

        question: "What will this Python code print?",

        display: `
            <pre class="code-question">x = 5
y = 2

print(x + y * 2)</pre>
        `,

        options: ["14", "9", "12", "7"],

        answer: 1,

        explanation:
            "Multiplication happens before addition. 2 × 2 = 4, then 5 + 4 = 9.",

        points: 100
    },


    {
        id: 7,
        category: "PYTHON",
        difficulty: "EASY",

        question: "What is the output?",

        display: `
            <pre class="code-question">x = [1, 2, 3]
print(len(x))</pre>
        `,

        options: ["2", "3", "4", "Error"],

        answer: 1,

        explanation:
            "The list contains three elements, so len(x) returns 3.",

        points: 100
    },


    {
        id: 8,
        category: "PYTHON",
        difficulty: "MEDIUM",

        question: "What will this print?",

        display: `
            <pre class="code-question">x = 10

if x > 5:
    print("A")
else:
    print("B")</pre>
        `,

        options: ["A", "B", "AB", "Nothing"],

        answer: 0,

        explanation:
            "10 is greater than 5, so the condition is true and A is printed.",

        points: 150
    },


    // ========================================
    // DEBUGGING
    // ========================================

    {
        id: 9,
        category: "DEBUGGING",
        difficulty: "MEDIUM",

        question: "What's wrong with this Python code?",

        display: `
            <pre class="code-question">name = "Alex"

print(Name)</pre>
        `,

        options: [
            "Missing parentheses",
            "Wrong variable name",
            "String is invalid",
            "Nothing is wrong"
        ],

        answer: 1,

        explanation:
            "Python variable names are case-sensitive. The variable is 'name', not 'Name'.",

        points: 150
    },


    {
        id: 10,
        category: "DEBUGGING",
        difficulty: "MEDIUM",

        question: "Which line causes the error?",

        display: `
            <pre class="code-question">x = 10
y = 0

print(x / y)</pre>
        `,

        options: [
            "x = 10",
            "y = 0",
            "print(x / y)",
            "None"
        ],

        answer: 2,

        explanation:
            "Division by zero causes a ZeroDivisionError.",

        points: 150
    },


    // ========================================
    // RIDDLES
    // ========================================

    {
        id: 11,
        category: "RIDDLE",
        difficulty: "EASY",

        question: "What has keys but cannot open locks?",

        display: `
            <div class="riddle-icon">⌨️</div>
        `,

        options: [
            "A keyboard",
            "A door",
            "A map",
            "A clock"
        ],

        answer: 0,

        explanation:
            "A keyboard has keys, but those keys don't open physical locks.",

        points: 100
    },


    {
        id: 12,
        category: "RIDDLE",
        difficulty: "EASY",

        question: "What gets wetter the more it dries?",

        display: `
            <div class="riddle-icon">🤔</div>
        `,

        options: [
            "A sponge",
            "A towel",
            "Rain",
            "A cloud"
        ],

        answer: 1,

        explanation:
            "A towel gets wetter while it dries something else.",

        points: 100
    },


    // ========================================
    // MATH / QUICK THINKING
    // ========================================

    {
        id: 13,
        category: "QUICK THINKING",
        difficulty: "EASY",

        question: "If you have 3 apples and take away 2, how many do you have?",

        display: `
            <div class="number-row">
                🍎 🍎 🍎
            </div>
        `,

        options: ["1", "2", "3", "0"],

        answer: 1,

        explanation:
            "You took 2 apples, so you have the 2 apples you took.",

        points: 100
    },


    {
        id: 14,
        category: "MATH",
        difficulty: "MEDIUM",

        question: "What is 15% of 200?",

        display: `
            <div class="number-row">
                15% × 200 = ?
            </div>
        `,

        options: ["15", "20", "30", "35"],

        answer: 2,

        explanation:
            "10% of 200 is 20 and 5% is 10. Together that's 30.",

        points: 150
    },


    // ========================================
    // HARD
    // ========================================

    {
        id: 15,
        category: "LOGIC",
        difficulty: "HARD",

        question: "A clock shows 3:15. What is the angle between the hour and minute hands?",

        display: `
            <div class="clock-question">
                🕒
            </div>
        `,

        options: ["0°", "7.5°", "15°", "30°"],

        answer: 1,

        explanation:
            "At 3:15, the minute hand is at 90°. The hour hand has moved 7.5° past 3, giving an angle of 7.5°.",

        points: 250
    }

];