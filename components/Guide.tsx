import React from 'react';
import Card from './common/Card';
import Button from './common/Button';

interface GuideProps {
  onBack: () => void;
}

const Guide: React.FC<GuideProps> = ({ onBack }) => {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 w-full">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl text-light-on-background dark:text-dark-on-background">
            Guide: Creating the Perfect AI Agent
          </h1>
          <Button onClick={onBack} variant="outlined">
            &larr; Back to Builder
          </Button>
        </div>
        
        <div className="space-y-6">
          <Card title="1. Define the Core Identity">
            <div className="space-y-4 text-sm text-light-on-surface-variant dark:text-dark-on-surface-variant">
              <p>The first step is to give your agent a clear purpose. This is done through the Agent Details and, most importantly, the System Instructions.</p>
              <div>
                <h4 className="font-semibold text-light-on-surface dark:text-dark-on-surface">Agent Name & Description</h4>
                <p>These should be concise and descriptive. The name is for your reference, and the description helps others (and yourself) quickly understand the agent's primary function.</p>
              </div>
              <div>
                <h4 className="font-semibold text-light-on-surface dark:text-dark-on-surface">System Instructions: The Agent's Constitution</h4>
                <p>This is the most critical part of defining your agent. A well-written system instruction dramatically influences the agent's behavior, personality, and performance. Think of it as the agent's internal monologue or a set of unbreakable rules.</p>
                <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
                  <li><strong>Persona:</strong> How should the agent behave? Is it a formal assistant, a witty sidekick, a cautious expert? (e.g., "You are a cheerful and helpful assistant for a travel agency.")</li>
                  <li><strong>Goals:</strong> What is its primary objective? (e.g., "Your goal is to help users find the best flight deals.")</li>
                  <li><strong>Constraints & Rules:</strong> What should it never do? What are its boundaries? (e.g., "Never provide medical advice. Always refuse to answer questions about private individuals. Always use the provided tools to get real-time information.")</li>
                  <li><strong>Process:</strong> Should it follow a specific workflow? (e.g., "First, ask for the user's destination and dates. Then, use the `searchFlights` tool. Finally, present the top 3 options.")</li>
                </ul>
              </div>
            </div>
          </Card>
          
          <Card title="2. Choose the Right Brain (Model)">
             <div className="space-y-4 text-sm text-light-on-surface-variant dark:text-dark-on-surface-variant">
                <p>The model is the engine of your agent. Different models have different strengths in terms of reasoning ability, speed, and cost. There's no single "best" model—the right choice depends on your agent's task.</p>
                 <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
                  <li><strong>For complex reasoning (e.g., `claude-3-opus`, `gemini-1.5-pro`):</strong> Choose a powerful model if your agent needs to understand complex queries, plan multiple steps, or analyze information deeply.</li>
                  <li><strong>For speed and cost-effectiveness (e.g., `gemini-2.5-flash`, `claude-3-haiku`):</strong> If your agent handles high volumes of simple requests or needs to be very responsive, a smaller, faster model is a better choice.</li>
                </ul>
                <p>Use the descriptions in the "Model Configuration" dropdown to help you decide. It's often a good idea to start with a balanced model (`gemini-1.5-pro`, `claude-3-sonnet`) and switch if you notice performance issues or high costs.</p>
             </div>
          </Card>

          <Card title="3. Grant Superpowers with Tools">
            <div className="space-y-4 text-sm text-light-on-surface-variant dark:text-dark-on-surface-variant">
              <p>Tools are what allow your agent to interact with the outside world. They are functions it can call to get information or perform actions. The agent doesn't run the code itself—it generates a JSON object specifying which tool to call and with what arguments.</p>
               <div>
                <h4 className="font-semibold text-light-on-surface dark:text-dark-on-surface">The Importance of a Good Description</h4>
                <p>The model relies almost entirely on the <strong className="text-light-on-surface dark:text-dark-on-surface">tool's name and description</strong> to understand what it does and when to use it. Be explicit and clear!</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="bg-light-error-container/30 dark:bg-dark-error-container/30 p-3 rounded-lg border border-light-error/30 dark:border-dark-error/30">
                        <p className="font-semibold text-light-on-error-container dark:text-dark-on-error-container">Poor Description:</p>
                        <p className="text-sm">"Gets weather." - This is too vague. Where? What kind of weather?</p>
                    </div>
                    <div className="bg-light-primary-container/20 dark:bg-dark-primary-container/20 p-3 rounded-lg border border-light-primary/20 dark:border-dark-primary/20">
                        <p className="font-semibold text-light-on-primary-container dark:text-dark-on-primary-container">Good Description:</p>
                        <p className="text-sm">"Gets the current weather forecast for a specified city and state." - This is clear and tells the model exactly what information is needed.</p>
                    </div>
                </div>
              </div>
               <div>
                <h4 className="font-semibold text-light-on-surface dark:text-dark-on-surface">Define Clear Parameters</h4>
                <p>Parameters are the inputs your tool needs. Each parameter must have a clear name, type, and description. Just like with the tool description, the <strong className="text-light-on-surface dark:text-dark-on-surface">parameter description</strong> helps the model understand what value to provide.</p>
              </div>
            </div>
          </Card>

           <Card title="4. Test, Iterate, and Refine">
            <div className="space-y-4 text-sm text-light-on-surface-variant dark:text-dark-on-surface-variant">
              <p>Building a great agent is an iterative process. Your first configuration is just a starting point.</p>
               <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
                  <li><strong>Export and Test:</strong> Export your configuration and integrate it into your application.</li>
                  <li><strong>Observe:</strong> Pay attention to when the agent fails. Does it call the wrong tool? Does it hallucinate information instead of using a tool? Does it misunderstand the user's intent?</li>
                  <li><strong>Refine:</strong> Based on your observations, come back to the builder and tweak your configuration. You might need to make your system instructions more specific, improve a tool's description, or add a new tool entirely.</li>
                </ul>
            </div>
          </Card>

          <div className="text-center pt-4">
             <Button onClick={onBack} size="md">
                &larr; Back to Builder
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;