import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { AgentConfig, Tool, ToolParameter, ParameterType } from './types';
import AgentConfigPanel from './components/AgentConfigPanel';
import JsonPreviewPanel from './components/JsonPreviewPanel';
import Guide from './components/Guide';
import Footer from './components/common/Footer';
import Button from './components/common/Button';
import { WandIcon } from './components/common/Icon';
import Generator from './components/Generator';
import ThemeToggle from './components/common/ThemeToggle';

// Interface for validation errors structure
interface ValidationErrors {
  name?: string;
  description?: string;
  systemInstruction?: string;
  model?: string;
  tools?: {
    [toolId: string]: {
      name?: string;
      description?: string; // Add description error
      parameters?: {
        [paramId: string]: any;
      };
    };
  };
}


const App: React.FC = () => {
  const [page, setPage] = useState<'builder' | 'guide' | 'generator'>('builder');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme;
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  const [agentConfig, setAgentConfig] = useState<AgentConfig>({
    name: 'My Custom Agent',
    description: 'An agent built with the offline builder.',
    systemInstruction: 'You are a helpful and friendly assistant. Your goal is to assist users with their tasks by using the provided tools effectively.',
    model: 'local-llm',
    tools: [],
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);


  const updateConfig = useCallback(<K extends keyof AgentConfig>(key: K, value: AgentConfig[K]) => {
    setAgentConfig(prev => ({ ...prev, [key]: value }));
  }, []);

  const addTool = useCallback(() => {
    const newTool: Tool = {
      id: `tool-${Date.now()}`,
      name: `newTool${agentConfig.tools.length + 1}`,
      description: 'A description for this tool.',
      version: '1.0.0',
      parameters: [],
    };
    updateConfig('tools', [...agentConfig.tools, newTool]);
  }, [agentConfig.tools, updateConfig]);

  const updateTool = useCallback((toolId: string, updatedTool: Tool) => {
    const newTools = agentConfig.tools.map(tool => tool.id === toolId ? updatedTool : tool);
    updateConfig('tools', newTools);
  }, [agentConfig.tools, updateConfig]);

  const removeTool = useCallback((toolId: string) => {
    const newTools = agentConfig.tools.filter(tool => tool.id !== toolId);
    updateConfig('tools', newTools);
  }, [agentConfig.tools, updateConfig]);
  
  const handleGenerateAgent = useCallback((config: AgentConfig) => {
    setAgentConfig(config);
    setPage('builder');
  }, []);

  useEffect(() => {
    const newErrors: ValidationErrors = {};

    // Agent details validation
    if (!agentConfig.name.trim()) newErrors.name = 'Agent name is required.';
    if (!agentConfig.description.trim()) newErrors.description = 'Agent description is required.';
    if (!agentConfig.systemInstruction.trim()) newErrors.systemInstruction = 'System instruction is required.';

    // Model validation
    if (!agentConfig.model.trim()) {
      newErrors.model = 'Model name is required.';
    }

    // Recursive parameter validation
    const validateParameters = (params: ToolParameter[]): { [id: string]: any } | undefined => {
      const paramErrors: { [id: string]: any } = {};
      const paramNames = new Set<string>();
      let hasErrors = false;
      
      const validateItem = (item: ToolParameter) => {
        const currentParamErrors: { [key: string]: any } = {};
        const trimmedParamName = item.name.trim();

        if (!trimmedParamName) {
            currentParamErrors.name = 'Parameter name is required.';
        } else if (paramNames.has(trimmedParamName)) {
            currentParamErrors.name = 'Parameter name must be unique.';
        }
        paramNames.add(trimmedParamName);

        if (!item.description.trim()) {
          currentParamErrors.description = 'Description is required.';
        }

        if (item.type === ParameterType.OBJECT && item.properties) {
            const nestedErrors = validateParameters(item.properties);
            if (nestedErrors) {
                currentParamErrors.properties = nestedErrors;
            }
        }
        
        if (item.type === ParameterType.ARRAY && item.items) {
           const itemSchemaErrors: { [key: string]: any } = {};
           if(!item.items.description.trim()) {
             itemSchemaErrors.description = 'Description is required.';
           }
           if (item.items.type === ParameterType.OBJECT && item.items.properties) {
              const nestedErrors = validateParameters(item.items.properties);
              if (nestedErrors) {
                itemSchemaErrors.properties = nestedErrors;
              }
           }
           if (Object.keys(itemSchemaErrors).length > 0) {
              currentParamErrors.items = itemSchemaErrors;
           }
        }
        
        if (Object.keys(currentParamErrors).length > 0) {
            paramErrors[item.id] = currentParamErrors;
            hasErrors = true;
        }
      };

      params.forEach(validateItem);
      return hasErrors ? paramErrors : undefined;
    };

    // Tool validation
    const toolErrors: NonNullable<ValidationErrors['tools']> = {};
    const toolNames = new Set<string>();
    agentConfig.tools.forEach(tool => {
        const currentToolErrors: { name?: string; description?: string; parameters?: { [key: string]: any } } = {};
        const trimmedToolName = tool.name.trim();

        if (!trimmedToolName) {
            currentToolErrors.name = 'Tool name is required.';
        } else if (toolNames.has(trimmedToolName)) {
            currentToolErrors.name = 'Tool name must be unique.';
        }
        toolNames.add(trimmedToolName);
        
        if (!tool.description.trim()) {
          currentToolErrors.description = 'Tool description is required.';
        }
        
        const paramErrors = validateParameters(tool.parameters);
        if (paramErrors) {
            currentToolErrors.parameters = paramErrors;
        }
        
        if (Object.keys(currentToolErrors).length > 0) {
            toolErrors[tool.id] = currentToolErrors;
        }
    });

    if (Object.keys(toolErrors).length > 0) {
        newErrors.tools = toolErrors;
    }

    setErrors(newErrors);
  }, [agentConfig]);

  const hasErrors = useMemo(() => {
    function findError(obj: any): boolean {
      for (const key in obj) {
        if (typeof obj[key] === 'string' && obj[key].length > 0) {
          return true;
        }
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          if (findError(obj[key])) return true;
        }
      }
      return false;
    }
    return findError(errors);
  }, [errors]);
  
  const renderPage = () => {
    switch (page) {
      case 'guide':
        return <Guide onBack={() => setPage('builder')} />;
      case 'generator':
        return <Generator onGenerate={handleGenerateAgent} onBack={() => setPage('builder')} />;
      case 'builder':
      default:
        return (
          <>
            <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AgentConfigPanel
                config={agentConfig}
                onUpdate={updateConfig}
                onAddTool={addTool}
                onUpdateTool={updateTool}
                onRemoveTool={removeTool}
                errors={errors}
              />
              <JsonPreviewPanel config={agentConfig} hasErrors={hasErrors} />
            </main>
            <Footer onNavigate={() => setPage('guide')} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background text-light-on-background dark:text-dark-on-background flex flex-col transition-colors duration-300">
      <header className="bg-light-surface dark:bg-dark-surface-container-low border-b border-light-outline-variant dark:border-dark-outline-variant p-3 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <button onClick={() => setPage('builder')} className="text-xl font-medium text-light-on-surface dark:text-dark-on-surface">
            AI Agent Builder
          </button>
          
          <div className="flex items-center gap-2">
            {page !== 'generator' && (
              <Button onClick={() => setPage('generator')} variant="filled-tonal">
                <WandIcon />
                Agent Generator
              </Button>
            )}
             <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </div>
      </header>
      
      <div className="flex-grow">
        {renderPage()}
      </div>

    </div>
  );
};

export default App;