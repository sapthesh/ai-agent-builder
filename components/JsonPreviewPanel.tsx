import React, { useMemo, useState } from 'react';
import { AgentConfig, ParameterType, BaseParameter, ToolParameter, NamedParameter } from '../types';
import Button from './common/Button';
import { DownloadIcon, CopyIcon, CheckIcon } from './common/Icon';

interface JsonPreviewPanelProps {
  config: AgentConfig;
  hasErrors: boolean;
}

const buildSchemaFromParam = (param: BaseParameter): any => {
    const schema: any = {
        type: param.type,
        description: param.description,
    };

    // Handle default value
    if (param.defaultValue !== undefined && param.defaultValue !== null) {
        // For string type, an empty string is a valid default. For others, treat it as not set.
        if (param.type !== ParameterType.STRING && param.defaultValue === '') {
          // Do not add default value if it's an empty string for non-string types
        } else {
            try {
                let parsedDefault = param.defaultValue;
                if (param.type === ParameterType.NUMBER) {
                    parsedDefault = parseFloat(param.defaultValue);
                    if (isNaN(parsedDefault)) throw new Error("Invalid number");
                } else if (param.type === ParameterType.OBJECT || param.type === ParameterType.ARRAY) {
                    // It must be a non-empty string to be valid JSON
                    if (typeof param.defaultValue === 'string' && param.defaultValue.trim()) {
                       parsedDefault = JSON.parse(param.defaultValue);
                    } else if (typeof param.defaultValue !== 'string') {
                       // if it's already an object/array, just use it
                       parsedDefault = param.defaultValue;
                    }
                    else {
                      throw new Error("Empty or invalid JSON string");
                    }
                }
                // Booleans are already boolean type in state, and strings are strings.
                schema.default = parsedDefault;
            } catch (e) {
                console.warn(`Invalid default value for parameter`, 'name' in param ? (param as NamedParameter).name : param.id, e);
                // Do not add invalid default value to the schema
            }
        }
    }

    if (param.type === ParameterType.OBJECT) {
        const properties: { [key: string]: any } = {};
        const required: string[] = [];

        (param.properties || []).forEach(prop => {
            properties[prop.name] = buildSchemaFromParam(prop);
            if (prop.isRequired) {
                required.push(prop.name);
            }
        });
        
        schema.properties = properties;
        if (required.length > 0) {
            schema.required = required;
        }

    } else if (param.type === ParameterType.ARRAY) {
        if (param.items) {
            schema.items = buildSchemaFromParam(param.items);
        } else {
            schema.items = { type: ParameterType.STRING };
        }
    }

    return schema;
};

const formatForExport = (config: AgentConfig) => {
  const exportableConfig: any = {
    name: config.name,
    description: config.description,
    systemInstruction: config.systemInstruction,
    model: config.model,
    tools: config.tools.map(tool => {
      const toolSchemaRoot: BaseParameter = {
          id: 'root',
          type: ParameterType.OBJECT,
          description: 'Root schema for tool parameters',
          properties: tool.parameters
      };
      
      const exportedTool: any = {
        name: tool.name,
        description: tool.description,
        parameters: buildSchemaFromParam(toolSchemaRoot),
      };

      if (tool.version && tool.version.trim()) {
        exportedTool.version = tool.version.trim();
      }

      return exportedTool;
    }),
  };
  
  return exportableConfig;
};


const JsonPreviewPanel: React.FC<JsonPreviewPanelProps> = ({ config, hasErrors }) => {
  const [isCopied, setIsCopied] = useState(false);

  const formattedJson = useMemo(() => {
    try {
      const exportableConfig = formatForExport(config);
      return JSON.stringify(exportableConfig, null, 2);
    } catch (error) {
      console.error("Error generating JSON:", error);
      return 'Error generating JSON preview.';
    }
  }, [config]);

  const handleExport = () => {
    if (hasErrors) return;
    const blob = new Blob([formattedJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.name.replace(/\s+/g, '_').toLowerCase() || 'agent'}_config.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (hasErrors || !navigator.clipboard) return;
    navigator.clipboard.writeText(formattedJson).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="flex flex-col h-full sticky top-24">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl text-light-on-background dark:text-dark-on-background">Export Configuration</h2>
        <div className="flex items-center gap-2">
            <Button onClick={handleCopy} disabled={hasErrors || isCopied} variant="outlined">
                {isCopied ? <CheckIcon/> : <CopyIcon />}
                {isCopied ? 'Copied!' : 'Copy'}
            </Button>
            <Button onClick={handleExport} disabled={hasErrors} title={hasErrors ? "Fix validation errors to export" : "Export JSON"}>
                <DownloadIcon />
                Export
            </Button>
        </div>
      </div>
      <div className="bg-light-surface-container-low dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-lg p-4 flex-grow overflow-auto">
        <pre className="text-sm text-light-on-surface-variant dark:text-dark-on-surface-variant whitespace-pre-wrap break-all">
          <code>{formattedJson}</code>
        </pre>
      </div>
    </div>
  );
};

export default JsonPreviewPanel;