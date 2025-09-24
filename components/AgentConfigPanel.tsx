import React from 'react';
import { AgentConfig, Tool } from '../types';
import Card from './common/Card';
import Input from './common/Input';
import Button from './common/Button';
import ToolEditor from './ToolEditor';

interface AgentConfigPanelProps {
  config: AgentConfig;
  onUpdate: <K extends keyof AgentConfig>(key: K, value: AgentConfig[K]) => void;
  onAddTool: () => void;
  onUpdateTool: (toolId: string, updatedTool: Tool) => void;
  onRemoveTool: (toolId: string) => void;
  errors: {
    name?: string;
    description?: string;
    systemInstruction?: string;
    model?: string;
    tools?: {
      [toolId: string]: any;
    };
  };
}

const AgentConfigPanel: React.FC<AgentConfigPanelProps> = ({ config, onUpdate, onAddTool, onUpdateTool, onRemoveTool, errors }) => {

  return (
    <div className="flex flex-col gap-6 h-full">
      <h1 className="text-2xl text-light-on-background dark:text-dark-on-background">Agent Configuration</h1>
      
      <Card title="Agent Details">
        <div className="space-y-4">
          <Input
            label="Name"
            value={config.name}
            onChange={(e) => onUpdate('name', e.target.value)}
            placeholder="e.g., WeatherBot"
            error={errors.name}
          />
          <Input
            label="Description"
            value={config.description}
            onChange={(e) => onUpdate('description', e.target.value)}
            placeholder="A short description of your agent."
            error={errors.description}
          />
        </div>
      </Card>
      
      <Card title="System Instructions">
        <textarea
          value={config.systemInstruction}
          onChange={(e) => onUpdate('systemInstruction', e.target.value)}
          placeholder="Define the agent's persona, goals, and constraints..."
          className={`w-full h-32 p-3 bg-transparent dark:bg-transparent border rounded-lg focus:ring-2 transition-colors text-sm
          text-light-on-surface-variant dark:text-dark-on-surface-variant placeholder-light-on-surface-variant dark:placeholder-dark-on-surface-variant
          ${errors.systemInstruction 
            ? 'border-light-error dark:border-dark-error focus:ring-light-error/50 focus:border-light-error dark:focus:border-dark-error' 
            : 'border-light-outline dark:border-dark-outline focus:ring-light-primary/50 dark:focus:ring-dark-primary/50 focus:border-light-primary dark:focus:border-dark-primary'}`}
        />
        {errors.systemInstruction && <p className="mt-1 text-xs text-light-error dark:text-dark-error">{errors.systemInstruction}</p>}
      </Card>

      <Card title="Model Configuration">
        <Input
          label="Model Name"
          value={config.model}
          onChange={(e) => onUpdate('model', e.target.value)}
          placeholder="e.g., my-local-model"
          error={errors.model}
        />
        <p className="mt-2 text-xs text-light-on-surface-variant dark:text-dark-on-surface-variant">
          Specify the identifier for the model this agent will use. This could be a local model name or an API endpoint identifier.
        </p>
      </Card>

      <Card title="Tools">
        <div className="space-y-4">
          {config.tools.length > 0 ? (
            config.tools.map((tool) => (
              <ToolEditor
                key={tool.id}
                tool={tool}
                onUpdate={(updatedTool) => onUpdateTool(tool.id, updatedTool)}
                onRemove={() => onRemoveTool(tool.id)}
                errors={errors.tools?.[tool.id]}
              />
            ))
          ) : (
            <div className="text-light-on-surface-variant dark:text-dark-on-surface-variant p-4 border-2 border-dashed border-light-outline-variant dark:border-dark-outline-variant rounded-lg bg-light-surface-container-low dark:bg-dark-surface-container-low">
              <h4 className="font-semibold text-light-on-surface dark:text-dark-on-surface">Get Started with Tools</h4>
              <p className="text-sm mt-1 mb-3">Tools are functions the agent can call to interact with external systems. Define a name, a clear description, and the parameters it needs.</p>
              
              <p className="text-sm font-semibold mb-1">Example: A `getWeather` tool</p>
              <div className="text-left bg-light-surface-container dark:bg-dark-surface-container p-3 rounded-lg text-xs font-mono">
                <span className="text-light-tertiary dark:text-dark-tertiary">Tool Name:</span> <span className="text-light-on-surface dark:text-dark-on-surface">getWeather</span><br/>
                <span className="text-light-tertiary dark:text-dark-tertiary">Description:</span> <span className="text-light-on-surface dark:text-dark-on-surface">Get the current weather for a specific location.</span><br/>
                <br/>
                <span className="text-light-secondary dark:text-dark-secondary">Parameters:</span>
                <div className="pl-4 mt-1 border-l border-light-outline-variant dark:border-dark-outline-variant">
                  <span className="text-light-primary dark:text-dark-primary">name:</span> <span className="text-light-on-surface dark:text-dark-on-surface">location</span><br/>
                  <span className="text-light-primary dark:text-dark-primary">type:</span> <span className="text-light-on-surface dark:text-dark-on-surface">string</span><br/>
                  <span className="text-light-primary dark:text-dark-primary">description:</span> <span className="text-light-on-surface dark:text-dark-on-surface">The city and state, e.g., San Francisco, CA</span><br/>
                  <span className="text-light-primary dark:text-dark-primary">required:</span> <span className="text-light-tertiary dark:text-dark-tertiary">true</span>
                </div>
              </div>
              <p className="text-sm mt-4 text-center">Click the button below to add your first tool.</p>
            </div>
          )}
          <Button onClick={onAddTool} variant="outlined">
            + Add Tool
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AgentConfigPanel;