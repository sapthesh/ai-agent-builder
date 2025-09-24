export enum ParameterType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  OBJECT = 'object',
  ARRAY = 'array',
}

// Base structure for any parameter-like entity (including array items)
export interface BaseParameter {
  id: string;
  type: ParameterType;
  description: string;
  defaultValue?: any;
  // For object type
  properties?: NamedParameter[];
  // For array type
  items?: BaseParameter;
}

// A parameter that has a name and is part of a list (e.g., direct tool param or object property)
export interface NamedParameter extends BaseParameter {
  name: string;
  isRequired: boolean;
}

// Alias for clarity in the Tool interface
export type ToolParameter = NamedParameter;


export interface Tool {
  id:string;
  name: string;
  description: string;
  version?: string;
  parameters: ToolParameter[];
}

export interface AgentConfig {
  name: string;
  description: string;
  systemInstruction: string;
  model: string;
  tools: Tool[];
}