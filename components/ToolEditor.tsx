import React from 'react';
import { Tool, ToolParameter, ParameterType, NamedParameter } from '../types';
import Input from './common/Input';
import Button from './common/Button';
import { TrashIcon } from './common/Icon';
import ParameterEditor from './ParameterEditor';

interface ToolEditorProps {
  tool: Tool;
  onUpdate: (tool: Tool) => void;
  onRemove: () => void;
  errors?: {
    name?: string;
    parameters?: {
      [paramId: string]: any;
    };
  };
}

const ToolEditor: React.FC<ToolEditorProps> = ({ tool, onUpdate, onRemove, errors }) => {
  const updateField = <K extends keyof Tool>(key: K, value: Tool[K]) => {
    onUpdate({ ...tool, [key]: value });
  };

  const addParameter = () => {
    const newParam: ToolParameter = {
      id: `param-${Date.now()}`,
      name: `param${tool.parameters.length + 1}`,
      type: ParameterType.STRING,
      description: 'A description for this parameter.',
      isRequired: false,
    };
    updateField('parameters', [...tool.parameters, newParam]);
  };

  const updateParameter = (paramId: string, updatedParam: ToolParameter) => {
    const newParams = tool.parameters.map(p =>
      p.id === paramId ? updatedParam : p
    );
    updateField('parameters', newParams);
  };

  const removeParameter = (paramId: string) => {
    const newParams = tool.parameters.filter(p => p.id !== paramId);
    updateField('parameters', newParams);
  };

  return (
    <div className="bg-light-surface-container dark:bg-dark-surface-container border border-light-outline-variant dark:border-dark-outline-variant rounded-xl p-4 space-y-4">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-grow space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input
                label="Tool Name"
                value={tool.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="e.g., getWeather"
                error={errors?.name}
              />
            </div>
            <Input
              label="Version"
              value={tool.version || ''}
              onChange={(e) => updateField('version', e.target.value)}
              placeholder="e.g., 1.0.0"
            />
          </div>
          <Input
            label="Tool Description"
            value={tool.description}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="A description for this tool."
          />
        </div>
        <button onClick={onRemove} className="p-2 text-light-on-surface-variant dark:text-dark-on-surface-variant hover:text-light-error dark:hover:text-dark-error rounded-full hover:bg-light-error-container dark:hover:bg-dark-error-container transition-colors mt-6">
          <TrashIcon />
        </button>
      </div>

      <h4 className="text-md font-medium text-light-on-surface dark:text-dark-on-surface pt-4 border-t border-light-outline-variant dark:border-dark-outline-variant">Parameters</h4>
      {tool.parameters.length === 0 && <p className="text-sm text-light-on-surface-variant dark:text-dark-on-surface-variant">No parameters defined.</p>}
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {tool.parameters.map(param => (
           <ParameterEditor
            key={param.id}
            parameter={param}
            onUpdate={(updatedParam) => updateParameter(param.id, updatedParam as NamedParameter)}
            onRemove={() => removeParameter(param.id)}
            errors={errors?.parameters?.[param.id]}
          />
        ))}
      </div>

      <Button onClick={addParameter} variant="text" size="sm">
        + Add Parameter
      </Button>
    </div>
  );
};

export default ToolEditor;