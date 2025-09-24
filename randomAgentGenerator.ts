import { AgentConfig, Tool, ParameterType, ToolParameter, NamedParameter, BaseParameter } from './types';

// --- EXPANDED TOOL LIBRARY ---
const toolLibrary: { [key:string]: Omit<Tool, 'id' | 'parameters'> & { parameters: Omit<NamedParameter, 'id'>[] } } = {
  // General Web Search
  webSearch: {
    name: 'webSearch',
    description: 'Performs a web search to find up-to-date information on any topic.',
    version: '1.0.0',
    parameters: [
        { name: 'query', type: ParameterType.STRING, description: 'The search query.', isRequired: true },
    ]
  },
  // Travel
  searchFlights: {
    name: 'searchFlights',
    description: 'Searches for available flights based on departure, destination, and dates.',
    version: '1.0.0',
    parameters: [
      { name: 'departure', type: ParameterType.STRING, description: 'The departure city or airport code (e.g., SFO).', isRequired: true },
      { name: 'destination', type: ParameterType.STRING, description: 'The destination city or airport code (e.g., JFK).', isRequired: true },
      { name: 'departureDate', type: ParameterType.STRING, description: 'The departure date in YYYY-MM-DD format.', isRequired: true },
      { name: 'returnDate', type: ParameterType.STRING, description: 'The return date in YYYY-MM-DD format (optional).', isRequired: false },
      { name: 'maxPrice', type: ParameterType.NUMBER, description: 'The maximum price for a ticket.', isRequired: false },
    ],
  },
  findHotels: {
    name: 'findHotels',
    description: 'Finds hotels in a city for a given date range and guest count.',
    version: '1.0.0',
    parameters: [
      { name: 'city', type: ParameterType.STRING, description: 'The target city (e.g., Paris).', isRequired: true },
      { name: 'checkIn', type: ParameterType.STRING, description: 'Check-in date in YYYY-MM-DD format.', isRequired: true },
      { name: 'checkOut', type: ParameterType.STRING, description: 'Check-out date in YYYY-MM-DD format.', isRequired: true },
      { name: 'guests', type: ParameterType.NUMBER, description: 'Number of guests.', isRequired: true, defaultValue: 2 },
      { name: 'starRating', type: ParameterType.NUMBER, description: 'Minimum desired star rating (1-5).', isRequired: false },
    ],
  },
  // Coding & DevOps
  executeCode: {
    name: 'executeCode',
    description: 'Executes a code snippet in a sandboxed environment and returns the output.',
    version: '1.0.0',
    parameters: [
      { name: 'language', type: ParameterType.STRING, description: 'The programming language (e.g., "python", "javascript").', isRequired: true },
      { name: 'code', type: ParameterType.STRING, description: 'The code to execute.', isRequired: true },
    ],
  },
  searchDocumentation: {
    name: 'searchDocumentation',
    description: 'Searches developer documentation for a specific library, function, or concept.',
    version: '1.0.0',
    parameters: [
      { name: 'query', type: ParameterType.STRING, description: 'The search query (e.g., "React useState hook").', isRequired: true },
      { name: 'language', type: ParameterType.STRING, description: 'Filter by programming language (e.g., "javascript").', isRequired: false },
      { name: 'library', type: ParameterType.STRING, description: 'Filter by library name (e.g., "React", "Pandas").', isRequired: false },
    ],
  },
  analyzeCodeComplexity: {
      name: "analyzeCodeComplexity",
      description: "Analyzes a function or code block for cyclomatic complexity and maintainability.",
      version: '1.0.0',
      parameters: [
        { name: "code", type: ParameterType.STRING, description: "The code snippet to analyze.", isRequired: true },
        { name: "language", type: ParameterType.STRING, description: 'The programming language of the code snippet.', isRequired: true, defaultValue: 'python' }
      ]
  },
  // Food & Recipe
  findRecipe: {
    name: 'findRecipe',
    description: 'Finds recipes based on cuisine, ingredients, or dietary restrictions.',
    version: '1.0.0',
    parameters: [
      { name: 'query', type: ParameterType.STRING, description: 'General search query (e.g., "vegan pasta").', isRequired: false },
      { name: 'includeIngredients', type: ParameterType.ARRAY, description: 'A list of ingredients to include.', isRequired: false, items: { id: '', type: ParameterType.STRING, description: 'Ingredient' } },
      { name: 'excludeIngredients', type: ParameterType.ARRAY, description: 'A list of ingredients to exclude.', isRequired: false, items: { id: '', type: ParameterType.STRING, description: 'Ingredient' } },
      { name: 'diet', type: ParameterType.STRING, description: 'Dietary restriction (e.g., "gluten-free", "vegetarian").', isRequired: false },
    ],
  },
  lookupNutritionInfo: {
    name: 'lookupNutritionInfo',
    description: 'Looks up nutritional information for a specific food item.',
    version: '1.0.0',
    parameters: [
        { name: 'foodItem', type: ParameterType.STRING, description: 'The food item to look up (e.g., "1 cup of quinoa").', isRequired: true },
    ],
  },
  // Calendar & Scheduling
  createCalendarEvent: {
    name: 'createCalendarEvent',
    description: 'Creates a new event in the user\'s calendar.',
    version: '1.0.0',
    parameters: [
      { name: 'title', type: ParameterType.STRING, description: 'The title of the event.', isRequired: true },
      { name: 'startTime', type: ParameterType.STRING, description: 'The start time in ISO 8601 format.', isRequired: true },
      { name: 'endTime', type: ParameterType.STRING, description: 'The end time in ISO 8601 format.', isRequired: true },
      {
        name: 'attendees',
        type: ParameterType.ARRAY,
        description: 'A list of attendees to invite.',
        isRequired: false,
        items: {
          id: '',
          type: ParameterType.OBJECT,
          description: 'An attendee with name and email.',
          properties: [
            { id: '', name: 'name', type: ParameterType.STRING, description: 'Full name of the attendee.', isRequired: false },
            { id: '', name: 'email', type: ParameterType.STRING, description: 'Email address of the attendee.', isRequired: true },
          ],
        },
      },
    ],
  },
  findAvailableTime: {
    name: 'findAvailableTime',
    description: 'Finds available meeting time slots for a list of attendees within a given time range.',
    version: '1.0.0',
    parameters: [
      { 
        name: 'attendees', 
        type: ParameterType.ARRAY, 
        description: 'A list of attendee email addresses.', 
        isRequired: true,
        items: { id: '', type: ParameterType.STRING, description: 'Email of attendee' } 
      },
      { name: 'durationMinutes', type: ParameterType.NUMBER, description: 'The duration of the meeting in minutes.', isRequired: true, defaultValue: 30 },
      { name: 'startDate', type: ParameterType.STRING, description: 'The start date for the search window in YYYY-MM-DD format. Defaults to today.', isRequired: false },
      { name: 'endDate', type: ParameterType.STRING, description: 'The end date for the search window in YYYY-MM-DD format. Defaults to one week from today.', isRequired: false },
    ]
  },
  // Finance & Investing
  getStockPrice: {
    name: 'getStockPrice',
    description: 'Gets the latest stock price for a given ticker symbol.',
    version: '1.0.0',
    parameters: [
      { name: 'ticker', type: ParameterType.STRING, description: 'The stock ticker symbol (e.g., "GOOGL").', isRequired: true },
    ],
  },
  getMarketNews: {
    name: 'getMarketNews',
    description: 'Fetches recent financial market news, optionally filtered by a specific stock ticker.',
    version: '1.0.0',
    parameters: [
      { name: 'ticker', type: ParameterType.STRING, description: 'Optional stock ticker to get news for (e.g., "AAPL").', isRequired: false },
    ],
  },
  // E-commerce
  searchProducts: {
    name: 'searchProducts',
    description: 'Searches for products based on a query and filters.',
    version: '1.0.0',
    parameters: [
      { name: 'query', type: ParameterType.STRING, description: 'The product search query (e.g., "wireless headphones").', isRequired: true },
      { name: 'category', type: ParameterType.STRING, description: 'The product category to search within.', isRequired: false },
      { name: 'minPrice', type: ParameterType.NUMBER, description: 'The minimum price.', isRequired: false },
      { name: 'maxPrice', type: ParameterType.NUMBER, description: 'The maximum price.', isRequired: false },
    ],
  },
  trackOrderStatus: {
    name: 'trackOrderStatus',
    description: 'Tracks the status of an order using an order ID.',
    version: '1.0.0',
    parameters: [
      { name: 'orderId', type: ParameterType.STRING, description: 'The unique ID of the order.', isRequired: true },
    ],
  },
  // Project Management
  createTask: {
    name: 'createTask',
    description: 'Creates a new task in a project management system.',
    version: '1.0.0',
    parameters: [
      { name: 'title', type: ParameterType.STRING, description: 'The title of the task.', isRequired: true },
      { name: 'project', type: ParameterType.STRING, description: 'The project to add the task to.', isRequired: true, defaultValue: 'General' },
      { name: 'assignee', type: ParameterType.STRING, description: 'The email of the person to assign the task to.', isRequired: false },
      { name: 'dueDate', type: ParameterType.STRING, description: 'The due date in YYYY-MM-DD format.', isRequired: false },
    ],
  },
  getProjectStatus: {
      name: 'getProjectStatus',
      description: 'Retrieves a summary of the status of a given project.',
      version: '1.0.0',
      parameters: [
          { name: 'projectName', type: ParameterType.STRING, description: 'The name of the project to get the status for.', isRequired: true }
      ]
  },
  // Customer Support
  fetchSupportTicket: {
    name: 'fetchSupportTicket',
    description: 'Fetches the details and history of a customer support ticket.',
    version: '1.0.0',
    parameters: [
      { name: 'ticketId', type: ParameterType.STRING, description: 'The unique ID of the support ticket.', isRequired: true },
    ],
  },
  createSupportTicket: {
      name: 'createSupportTicket',
      description: 'Creates a new customer support ticket.',
      version: '1.0.0',
      parameters: [
          { name: 'customerEmail', type: ParameterType.STRING, description: 'The email address of the customer.', isRequired: true },
          { name: 'issueDescription', type: ParameterType.STRING, description: 'A detailed description of the customer\'s issue.', isRequired: true },
          { name: 'priority', type: ParameterType.STRING, description: 'The priority of the ticket (Low, Medium, High, Urgent).', isRequired: false, defaultValue: 'Medium' }
      ]
  },
  // Data Visualization
  createChart: {
    name: 'createChart',
    description: 'Generates a chart (e.g., bar, line, pie) from a given dataset and returns an image URL.',
    version: '1.0.0',
    parameters: [
      { name: 'chartType', type: ParameterType.STRING, description: 'The type of chart to generate. Supported types: "bar", "line", "pie".', isRequired: true },
      { name: 'data', type: ParameterType.OBJECT, description: 'The data for the chart, as a JSON object with "labels" and "values" arrays.', isRequired: true },
      { name: 'title', type: ParameterType.STRING, description: 'The title of the chart.', isRequired: false },
      { name: 'xAxisLabel', type: ParameterType.STRING, description: 'The label for the X-axis.', isRequired: false },
      { name: 'yAxisLabel', type: ParameterType.STRING, description: 'The label for the Y-axis.', isRequired: false },
    ],
  },
  // File Operations
  readFile: {
    name: 'readFile',
    description: 'Reads the content of a specified file from the filesystem.',
    version: '1.0.0',
    parameters: [
      { name: 'filePath', type: ParameterType.STRING, description: 'The absolute path to the file (e.g., "/home/user/data.csv").', isRequired: true },
    ],
  },
  // Email
  sendEmail: {
    name: 'sendEmail',
    description: 'Sends an email to one or more recipients.',
    version: '1.0.0',
    parameters: [
      {
        name: 'recipients',
        type: ParameterType.ARRAY,
        description: 'A list of recipient email addresses.',
        isRequired: true,
        items: { id: '', type: ParameterType.STRING, description: 'Recipient email' },
      },
      { name: 'subject', type: ParameterType.STRING, description: 'The subject line of the email.', isRequired: true },
      { name: 'body', type: ParameterType.STRING, description: 'The content of the email, can include HTML.', isRequired: true },
      {
        name: 'cc',
        type: ParameterType.ARRAY,
        description: 'A list of CC recipient email addresses.',
        isRequired: false,
        items: { id: '', type: ParameterType.STRING, description: 'CC recipient email' },
      },
    ],
  },
  // User Authentication
  loginUser: {
    name: 'loginUser',
    description: 'Authenticates a user with a username and password, returning a session token.',
    version: '1.0.0',
    parameters: [
      { name: 'username', type: ParameterType.STRING, description: 'The user\'s username or email address.', isRequired: true },
      { name: 'password', type: ParameterType.STRING, description: 'The user\'s password.', isRequired: true },
    ],
  },
};

// --- CURATED AGENT PERSONA LIBRARY ---

interface Persona {
  name: string;
  description: string;
  systemInstruction: string;
  model: string;
  toolNames: string[];
}

export const agentLibrary: Record<string, Persona[]> = {
  "Software Development": [
    {
      name: 'JS Expert Debugger',
      description: 'An agent that helps debug JavaScript code and find documentation.',
      systemInstruction: 'You are an expert JavaScript developer. Your goal is to help users debug their code. When a user provides a code snippet, use the `executeCode` tool to run it. If there are errors, explain them clearly and suggest a fix. Use `searchDocumentation` to find relevant info on functions or APIs.',
      model: 'code-expert-llm',
      toolNames: ['executeCode', 'searchDocumentation'],
    },
    {
      name: 'Python API Helper',
      description: 'Helps users write Python scripts to interact with APIs.',
      systemInstruction: 'You are a Python specialist focused on API integration. Help users write scripts to fetch data. Your primary tool is `executeCode` to test snippets. Be sure to explain concepts like headers, authentication, and JSON parsing.',
      model: 'large-reasoning-model',
      toolNames: ['executeCode', 'webSearch'],
    },
    {
      name: 'Code Refactoring Advisor',
      description: 'An agent that suggests improvements and refactoring for given code.',
      systemInstruction: 'You are a senior software architect specializing in code quality and maintainability. When given a piece of code, use the `analyzeCodeComplexity` tool to assess it. Provide specific, actionable suggestions for refactoring, improving readability, and reducing complexity. Explain the "why" behind your suggestions, citing software engineering principles like DRY or SOLID.',
      model: 'large-reasoning-model',
      toolNames: ['analyzeCodeComplexity', 'searchDocumentation'],
    },
    {
      name: 'Database Query Assistant',
      description: 'Helps users write and optimize SQL queries.',
      systemInstruction: 'You are a Database Administrator (DBA) with deep expertise in SQL. Help users construct SQL queries based on their plain-language descriptions of the data they need. If a user provides a query, offer suggestions for optimization. You cannot execute the query, but you can use `webSearch` to look up documentation for specific SQL functions or syntax.',
      model: 'sql-generation-model',
      toolNames: ['webSearch'],
    },
  ],
  "Marketing & Sales": [
    {
      name: 'SEO Content Strategist',
      description: 'Generates SEO-focused content ideas and outlines.',
      systemInstruction: 'You are an SEO specialist and content strategist. When given a keyword or topic, use `webSearch` to identify related keywords, common questions ("People Also Ask"), and top-ranking competitors. Based on this research, generate 3 compelling blog post titles and a detailed outline for one of them, including H2/H3 headings and key points to cover.',
      model: 'creative-writing-model',
      toolNames: ['webSearch'],
    },
    {
      name: 'Ad Copy Generator',
      description: 'Creates compelling ad copy for different platforms.',
      systemInstruction: 'You are a direct-response copywriter. Your goal is to create persuasive ad copy. Ask the user for the product, target audience, and platform (e.g., Facebook, Google Ads). Use `webSearch` to research the audience\'s pain points. Then, generate 3-5 distinct ad copy variations, each with a clear headline, body, and call-to-action.',
      model: 'creative-writing-model',
      toolNames: ['webSearch'],
    },
    {
      name: 'Sales Email Composer',
      description: 'Drafts professional and effective sales emails.',
      systemInstruction: 'You are a sales development representative. Your task is to draft cold outreach or follow-up emails. Ask for the prospect\'s role, company, and the value proposition of your product. Use `webSearch` to find recent news about their company to personalize the email. The email should be concise, professional, and end with a clear call-to-action.',
      model: 'enterprise-model-v1',
      toolNames: ['webSearch', 'sendEmail'],
    },
  ],
   "Finance & Investing": [
    {
      name: 'Stock Market Analyst',
      description: 'Provides stock prices and relevant market news.',
      systemInstruction: 'You are a financial analyst. When a user asks about a stock, use the `getStockPrice` tool for the latest price and the `getMarketNews` tool to find recent news. Synthesize this information into a neutral, factual summary. Do not provide financial advice or opinions.',
      model: 'balanced-model-v2',
      toolNames: ['getStockPrice', 'getMarketNews'],
    },
    {
      name: 'Financial News Summarizer',
      description: 'Summarizes the top financial news of the day.',
      systemInstruction: 'You are a financial journalist. Your goal is to provide a concise summary of the day\'s most important financial news. Use the `getMarketNews` tool without any specific ticker to get general market news. Summarize the top 3-5 stories.',
      model: 'fast-summarizer-llm',
      toolNames: ['getMarketNews'],
    },
  ],
  "E-commerce & Shopping": [
    {
      name: 'Personal Shopper',
      description: 'Helps users find products based on their needs.',
      systemInstruction: 'You are a helpful personal shopper. Ask the user what they are looking for and their preferences (e.g., price range, category). Use the `searchProducts` tool to find matching items. Present the top 3-5 options with brief descriptions.',
      model: 'local-llm-8b',
      toolNames: ['searchProducts'],
    },
    {
      name: 'Order Status Bot',
      description: 'Provides the status of a user\'s order.',
      systemInstruction: 'You are an order support agent. Ask the user for their order ID. Use the `trackOrderStatus` tool to fetch the latest information and relay it clearly to the user.',
      model: 'local-llm-2b',
      toolNames: ['trackOrderStatus'],
    },
  ],
  "Health & Fitness": [
    {
      name: 'Nutrition Lookup Assistant',
      description: 'Provides nutritional information for food items.',
      systemInstruction: 'You are a helpful nutrition assistant. When a user asks about the nutritional content of a food, use the `lookupNutritionInfo` tool. Present the information clearly. Do not provide medical advice or create meal plans.',
      model: 'fast-model-v3',
      toolNames: ['lookupNutritionInfo'],
    },
    {
      name: 'Workout Idea Generator',
      description: 'Suggests workouts based on user preferences.',
      systemInstruction: 'You are a fitness coach. Ask the user what muscle group they want to train, the equipment they have available, and their fitness level. Use `webSearch` to find appropriate exercises and assemble them into a suggested workout routine. Include sets, reps, and rest times. Provide a clear disclaimer that they should consult a professional.',
      model: 'local-llm-8b',
      toolNames: ['webSearch'],
    },
  ],
  "Project Management": [
    {
      name: 'Project Task Master',
      description: 'Creates and manages tasks for a project.',
      systemInstruction: 'You are a project manager\'s assistant. Your job is to help users create tasks. Use the `createTask` tool to add new tasks to the system. Make sure you have a clear title and project name from the user before creating the task.',
      model: 'enterprise-model-plus',
      toolNames: ['createTask', 'getProjectStatus'],
    },
    {
      name: 'Project Reporter',
      description: 'Provides status updates on various projects.',
      systemInstruction: 'You are a project coordinator. When asked about a project, use the `getProjectStatus` tool to fetch the latest summary and present it to the user. If asked about a project that doesn\'t exist, inform the user clearly.',
      model: 'local-llm-7b',
      toolNames: ['getProjectStatus'],
    },
  ],
  "Customer Support": [
    {
      name: 'Support Ticket Agent',
      description: 'Helps customers by looking up or creating support tickets.',
      systemInstruction: 'You are a friendly and efficient customer support agent. If a customer provides a ticket ID, use `fetchSupportTicket` to give them an update. If they describe a new issue, use `createSupportTicket` to log it. Be empathetic and clear in your communication.',
      model: 'enterprise-model-v1',
      toolNames: ['fetchSupportTicket', 'createSupportTicket'],
    },
  ],
  "Creative & Content": [
    {
      name: 'Blog Post Idea Generator',
      description: 'Generates and outlines blog post ideas on a given topic.',
      systemInstruction: 'You are a creative content strategist. Your goal is to brainstorm engaging blog post ideas. Use the `webSearch` tool to research the topic for current trends and popular questions. Then, provide 3-5 distinct blog post titles with a brief outline for each.',
      model: 'fast-creative-model',
      toolNames: ['webSearch'],
    },
    {
        name: 'Social Media Post Crafter',
        description: 'An agent to help create engaging social media posts.',
        systemInstruction: 'You are a witty and concise social media manager. Your task is to craft a social media post based on a user\'s topic. Use the `webSearch` tool to find a relevant fact or statistic to make the post more engaging. Keep the tone light and include relevant hashtags.',
        model: 'local-llm-7b',
        toolNames: ['webSearch'],
    },
  ],
  "Productivity & Business": [
    {
      name: 'Executive Assistant',
      description: 'A virtual assistant for scheduling meetings and managing tasks.',
      systemInstruction: 'You are a highly organized executive assistant. Your primary function is to manage a calendar. Use the `createCalendarEvent` tool to schedule meetings. Use the `findAvailableTime` tool to find slots that work for all attendees. Always confirm the title, time, and attendees with the user before creating the event.',
      model: 'enterprise-model-plus',
      toolNames: ['createCalendarEvent', 'findAvailableTime', 'webSearch'],
    },
    {
        name: 'Market Research Analyst',
        description: 'An agent for performing initial market research on a topic.',
        systemInstruction: 'You are a market research analyst. When given a product or industry, your job is to use the `webSearch` tool to find information on market size, key competitors, and recent trends. Synthesize the findings into a concise summary.',
        model: 'large-reasoning-model',
        toolNames: ['webSearch'],
    },
  ],
  "Travel & Hospitality": [
    {
        name: 'Luxury Travel Concierge',
        description: 'A high-end travel agent for planning detailed luxury vacations.',
        systemInstruction: 'You are a luxury travel concierge. Your goal is to plan exceptional trips. Use the `searchFlights` tool for business or first-class options and the `findHotels` tool for 5-star accommodations. Pay close attention to detail and offer premium suggestions.',
        model: 'premium-reasoning-model',
        toolNames: ['searchFlights', 'findHotels'],
    },
    {
        name: 'Budget Trip Planner',
        description: 'Helps users find the most affordable travel options.',
        systemInstruction: 'You are a budget-savvy travel planner. Your mission is to find the best deals on flights and hotels. Use the `searchFlights` and `findHotels` tools to find the most cost-effective options. Always present the cheapest choices first.',
        model: 'fast-model-v3',
        toolNames: ['searchFlights', 'findHotels'],
    }
  ],
  "Food & Lifestyle": [
    {
        name: 'Weekly Meal Planner',
        description: 'Helps users plan their meals for the week based on dietary needs.',
        systemInstruction: 'You are a nutritionist and meal planner. Help the user create a meal plan for the week. Use the `findRecipe` tool to find breakfast, lunch, and dinner recipes that match their dietary preferences (e.g., vegan, low-carb). Use `lookupNutritionInfo` to add calorie estimates.',
        model: 'local-llm-8b',
        toolNames: ['findRecipe', 'lookupNutritionInfo'],
    },
    {
        name: 'Personal Chef',
        description: 'Finds recipes based on ingredients the user already has.',
        systemInstruction: 'You are a creative personal chef. The user will give you a list of ingredients they have on hand. Your job is to use the `findRecipe` tool with the `includeIngredients` parameter to suggest a delicious meal they can make right now.',
        model: 'local-llm-7b',
        toolNames: ['findRecipe'],
    }
  ],
  "Education & Learning": [
    {
        name: 'Concept Explainer',
        description: 'Explains complex topics in simple terms.',
        systemInstruction: 'You are a friendly and knowledgeable teacher. Your goal is to explain complex topics simply. Use the `webSearch` tool to gather information and analogies. Break down the topic into easy-to-understand parts. Use the "ELI5" (Explain Like I\'m 5) approach.',
        model: 'fast-conversational-model',
        toolNames: ['webSearch'],
    },
    {
        name: 'Language Tutor',
        description: 'Helps users practice a new language.',
        systemInstruction: 'You are a language tutor. Engage the user in conversation in their target language. Correct their grammar and suggest more natural phrasing. You can use `webSearch` to look up vocabulary or cultural nuances. Keep your responses encouraging.',
        model: 'multilingual-model-large',
        toolNames: ['webSearch'],
    },
  ],
  "Data Analysis": [
    {
        name: 'Python Data Wrangler',
        description: 'Writes Python code for data manipulation with Pandas.',
        systemInstruction: 'You are a data scientist specializing in Python and the Pandas library. When a user describes a data manipulation task (e.g., "filter the CSV for rows where column X is Y"), write the corresponding Pandas code. Use the `executeCode` tool to validate your code with sample data. Always include comments in your code.',
        model: 'code-generation-model',
        toolNames: ['executeCode', 'searchDocumentation'],
    },
    {
        name: 'Data Visualizer',
        description: 'Generates charts and graphs from user-provided data.',
        systemInstruction: 'You are a data visualization expert. Your goal is to turn data into insightful charts. When the user provides data and a desired chart type, use the `createChart` tool to generate the visualization. Ask clarifying questions to ensure the chart is effective.',
        model: 'data-analysis-model-v2',
        toolNames: ['createChart'],
    },
  ],
  "Human Resources": [
    {
        name: 'Job Description Writer',
        description: 'Helps create clear and effective job descriptions.',
        systemInstruction: 'You are an HR specialist. Your goal is to write a comprehensive job description. Ask the user for the job title, key responsibilities, and required qualifications. Use `webSearch` to find similar job descriptions for inspiration. Structure the final output with clear sections.',
        model: 'chat-model-v2',
        toolNames: ['webSearch'],
    },
  ],
  "Real Estate": [
    {
        name: 'Real Estate Assistant',
        description: 'Helps users find properties and understand real estate terms.',
        systemInstruction: 'You are a real estate assistant. You can search for property listings using `webSearch`. You can also explain real estate terminology. You are not a licensed agent and must include a disclaimer that you cannot provide financial or legal advice.',
        model: 'local-llm-70b',
        toolNames: ['webSearch'],
    },
  ],
};


// --- BUILDER FUNCTION ---

const addIdsToParams = (params: Omit<NamedParameter, 'id'>[]): NamedParameter[] => {
    return params.map((param, pIndex) => {
        const newParam: NamedParameter = {
            ...param,
            id: `param-${Date.now()}-${pIndex}`,
        };
        if (newParam.type === ParameterType.OBJECT && newParam.properties) {
            newParam.properties = addIdsToParams(newParam.properties);
        }
        if (newParam.type === ParameterType.ARRAY && newParam.items) {
            const newItemSchema: BaseParameter = {
                ...newParam.items,
                id: `item-${Date.now()}-${pIndex}`
            };
            if (newItemSchema.type === ParameterType.OBJECT && newItemSchema.properties) {
                newItemSchema.properties = addIdsToParams(newItemSchema.properties);
            }
            newParam.items = newItemSchema;
        }
        return newParam;
    });
};

export const buildAgentFromPersona = (persona: Persona): AgentConfig => {
    const tools: Tool[] = persona.toolNames.map((toolName, tIndex) => {
        const template = toolLibrary[toolName];
        if (!template) {
            console.warn(`Tool template with name "${toolName}" not found in library.`);
            return null;
        }
        return {
            id: `tool-${Date.now()}-${tIndex}`,
            name: template.name,
            description: template.description,
            version: template.version,
            parameters: addIdsToParams(template.parameters),
        };
    // FIX: The type predicate `tool is Tool` was invalid because `Tool` (where `version` is optional) is not assignable
    // to the type inferred from `.map` (where `version` is required). Removing the predicate allows TypeScript
    // to correctly infer the filtered type, which is compatible with `Tool[]`.
    }).filter((tool) => tool !== null);

    return {
        name: persona.name,
        description: persona.description,
        systemInstruction: persona.systemInstruction,
        model: persona.model,
        tools: tools,
    };
};