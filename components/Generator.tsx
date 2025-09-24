import React, { useState, useMemo } from 'react';
import { AgentConfig } from '../types';
import { agentLibrary, buildAgentFromPersona } from '../randomAgentGenerator';
import Card from './common/Card';
import Button from './common/Button';

interface GeneratorProps {
  onGenerate: (config: AgentConfig) => void;
  onBack: () => void;
}

const Generator: React.FC<GeneratorProps> = ({ onGenerate, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(agentLibrary)[0]);
  
  const personasInCategory = useMemo(() => agentLibrary[selectedCategory] || [], [selectedCategory]);
  
  const [selectedPersonaName, setSelectedPersonaName] = useState(personasInCategory[0]?.name || '');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    // Reset persona selection when category changes
    setSelectedPersonaName(agentLibrary[newCategory]?.[0]?.name || '');
  };
  
  const selectedPersona = useMemo(() => {
    return personasInCategory.find(p => p.name === selectedPersonaName);
  }, [selectedPersonaName, personasInCategory]);

  const handleGenerate = () => {
    if (selectedPersona) {
      const fullAgentConfig = buildAgentFromPersona(selectedPersona);
      onGenerate(fullAgentConfig);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 w-full">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
           <h1 className="text-3xl text-light-on-background dark:text-dark-on-background">
            Agent Generator
          </h1>
          <Button onClick={onBack} variant="outlined">
            &larr; Back to Builder
          </Button>
        </div>

        <Card title="Select a Pre-built Agent">
          <div className="space-y-6">
            <p className="text-sm text-light-on-surface-variant dark:text-dark-on-surface-variant">
              Choose from a library of curated agent personas to get a head start. Select a category, then a specific persona to see its details. Click "Generate Agent" to load it into the builder for customization.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category-select" className="block text-xs font-medium text-light-on-surface-variant dark:text-dark-on-surface-variant mb-1">Category</label>
                <select
                  id="category-select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="w-full p-2 bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline rounded-lg focus:ring-2 focus:ring-light-primary/50 dark:focus:ring-dark-primary/50 focus:border-light-primary dark:focus:border-dark-primary transition-colors text-light-on-surface-variant dark:text-dark-on-surface-variant"
                >
                  {Object.keys(agentLibrary).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="persona-select" className="block text-xs font-medium text-light-on-surface-variant dark:text-dark-on-surface-variant mb-1">Agent Persona</label>
                <select
                  id="persona-select"
                  value={selectedPersonaName}
                  onChange={(e) => setSelectedPersonaName(e.target.value)}
                  className="w-full p-2 bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline rounded-lg focus:ring-2 focus:ring-light-primary/50 dark:focus:ring-dark-primary/50 focus:border-light-primary dark:focus:border-dark-primary transition-colors text-light-on-surface-variant dark:text-dark-on-surface-variant"
                  disabled={personasInCategory.length === 0}
                >
                  {personasInCategory.map(persona => (
                    <option key={persona.name} value={persona.name}>{persona.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {selectedPersona && (
              <div className="pt-4 border-t border-light-outline-variant dark:border-dark-outline-variant space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-light-on-surface dark:text-dark-on-surface">{selectedPersona.name}</h3>
                  <p className="text-sm text-light-on-surface-variant dark:text-dark-on-surface-variant mt-1">{selectedPersona.description}</p>
                </div>
                <div>
                    <h4 className="font-semibold text-sm text-light-on-surface dark:text-dark-on-surface mb-1">System Instructions</h4>
                    <div className="p-3 bg-light-surface-container dark:bg-dark-surface-container rounded-lg text-sm text-light-on-surface-variant dark:text-dark-on-surface-variant max-h-48 overflow-y-auto">
                        <p style={{ whiteSpace: 'pre-wrap' }}>{selectedPersona.systemInstruction}</p>
                    </div>
                </div>
                 <div>
                    <h4 className="font-semibold text-sm text-light-on-surface dark:text-dark-on-surface mb-1">Pre-configured Tools</h4>
                     <div className="flex flex-wrap gap-2">
                        {selectedPersona.toolNames.map(toolName => (
                            <span key={toolName} className="bg-light-surface-container-high text-light-on-surface-variant dark:bg-dark-surface-container-high dark:text-dark-on-surface-variant text-xs font-mono px-2.5 py-1 rounded-md">
                                {toolName}
                            </span>
                        ))}
                    </div>
                </div>
              </div>
            )}
            
            <div className="text-center pt-4">
              <Button onClick={handleGenerate} disabled={!selectedPersona} size="md">
                Generate Agent & View
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Generator;