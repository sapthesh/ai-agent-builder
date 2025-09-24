import React from 'react';
import { BaseParameter, NamedParameter, ParameterType } from '../types';
import Input from './common/Input';
import Button from './common/Button';
import {
  TrashIcon,
  StringIcon,
  NumberIcon,
  BooleanIcon,
  ObjectIcon,
  ArrayIcon,
} from './common/Icon';

interface ParameterEditorProps {
  parameter: NamedParameter;
  onUpdate: (updatedParam: NamedParameter) => void;
  onRemove: () => void;
  errors?: {
    name?: string;
    description?: string;
    properties?: { [paramId: string]: any };
    items?: any;
  };
  level?: number; // Add level for recursive styling
}

const typeIconMap: Record<ParameterType, React.ReactNode> = {
    [ParameterType.STRING]: <StringIcon className="text-sky-500 dark:text-sky-400" />,
    [ParameterType.NUMBER]: <NumberIcon className="text-orange-500 dark:text-orange-400" />,
    [ParameterType.BOOLEAN]: <BooleanIcon className="text-purple-500 dark:text-purple-400" />,
    [ParameterType.OBJECT]: <ObjectIcon className="text-green-500 dark:text-green-400" />,
    [ParameterType.ARRAY]: <ArrayIcon className="text-yellow-500 dark:text-yellow-400" />,
};

// Helper component for consistent styling of nested blocks
const NestedBlock: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mt-3 space-y-3 p-3 rounded-lg border-l-4 border-light-primary/50 dark:border-dark-primary/50 bg-light-surface-container dark:bg-dark-surface-container">
    <h5 className="text-sm font-semibold text-light-on-surface-variant dark:text-dark-on-surface-variant">{title}</h5>
    {children}
  </div>
);


const ParameterEditor: React.FC<ParameterEditorProps> = ({ parameter, onUpdate, onRemove, errors, level = 0 }) => {

  const handleUpdate = <K extends keyof NamedParameter>(key: K, value: NamedParameter[K]) => {
    onUpdate({ ...parameter, [key]: value });
  };
  
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as ParameterType;
    const updatedParam: NamedParameter = { ...parameter, type: newType };

    // Clear default value when type changes as it may become invalid
    delete updatedParam.defaultValue;

    if (newType === ParameterType.OBJECT) {
        updatedParam.properties = updatedParam.properties || [];
        delete updatedParam.items;
    } else if (newType === ParameterType.ARRAY) {
        updatedParam.items = updatedParam.items || {
            id: `item-${Date.now()}`,
            type: ParameterType.STRING,
            description: 'Schema for items in the array.'
        };
        delete updatedParam.properties;
    } else {
        delete updatedParam.properties;
        delete updatedParam.items;
    }

    onUpdate(updatedParam);
  };
  
  const addProperty = () => {
    const newProperty: NamedParameter = {
        id: `param-${Date.now()}`,
        name: `property${(parameter.properties || []).length + 1}`,
        type: ParameterType.STRING,
        description: 'A description for this property.',
        isRequired: false,
    };
    onUpdate({
        ...parameter,
        properties: [...(parameter.properties || []), newProperty],
    });
  };

  const updateProperty = (propId: string, updatedProp: NamedParameter) => {
    const newProperties = (parameter.properties || []).map(p => p.id === propId ? updatedProp : p);
    onUpdate({ ...parameter, properties: newProperties });
  };
  
  const removeProperty = (propId: string) => {
    const newProperties = (parameter.properties || []).filter(p => p.id !== propId);
    onUpdate({ ...parameter, properties: newProperties });
  };

  const updateItemSchema = (updatedSchema: BaseParameter) => {
     onUpdate({ ...parameter, items: updatedSchema });
  };
  
  const ItemSchemaEditor: React.FC<{schema: BaseParameter, onUpdate: (s: BaseParameter) => void, errors?: any}> = ({ schema, onUpdate: onUpdateSchema, errors }) => {
    
    const handleItemTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value as ParameterType;
        const updatedSchema: BaseParameter = { ...schema, type: newType };
        
        delete updatedSchema.defaultValue;

        if (newType === ParameterType.OBJECT) {
            (updatedSchema as NamedParameter).properties = (updatedSchema as NamedParameter).properties || [];
            delete updatedSchema.items;
        } else if (newType === ParameterType.ARRAY) {
            updatedSchema.items = updatedSchema.items || {
                id: `item-${Date.now()}`,
                type: ParameterType.STRING,
                description: 'Schema for items in the array.'
            };
            delete (updatedSchema as NamedParameter).properties;
        } else {
            delete (updatedSchema as NamedParameter).properties;
            delete updatedSchema.items;
        }
        onUpdateSchema(updatedSchema);
    };
    
    // Fix: Localized functions to handle properties of the item schema
    const addItemProperty = () => {
        const newProperty: NamedParameter = {
            id: `param-${Date.now()}`,
            name: `property${((schema as NamedParameter).properties || []).length + 1}`,
            type: ParameterType.STRING,
            description: 'A description for this property.',
            isRequired: false,
        };
        onUpdateSchema({
            ...schema,
            properties: [...((schema as NamedParameter).properties || []), newProperty],
        });
    };

    const updateItemProperty = (propId: string, updatedProp: NamedParameter) => {
        const newProperties = ((schema as NamedParameter).properties || []).map(p => p.id === propId ? updatedProp : p);
        onUpdateSchema({ ...schema, properties: newProperties });
    };

    const removeItemProperty = (propId: string) => {
        const newProperties = ((schema as NamedParameter).properties || []).filter(p => p.id !== propId);
        onUpdateSchema({ ...schema, properties: newProperties });
    };

    return (
        <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <select
                    value={schema.type}
                    onChange={handleItemTypeChange}
                    className="w-full p-2 bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline rounded-lg focus:ring-2 focus:ring-light-primary/50 dark:focus:ring-dark-primary/50 focus:border-light-primary dark:focus:border-dark-primary transition-colors text-sm text-light-on-surface-variant dark:text-dark-on-surface-variant"
                >
                    {Object.values(ParameterType).map(type => <option key={type} value={type}>{type}</option>)}
                </select>
                <Input
                    value={schema.description}
                    onChange={(e) => onUpdateSchema({ ...schema, description: e.target.value })}
                    placeholder="Item Description"
                    error={errors?.description}
                />
            </div>
            {schema.type === ParameterType.OBJECT && (
                <NestedBlock title="Properties">
                  {((schema as NamedParameter).properties || []).map(prop => (
                      <ParameterEditor
                          key={prop.id}
                          parameter={prop}
                          onUpdate={(p) => updateItemProperty(prop.id, p)}
                          onRemove={() => removeItemProperty(prop.id)}
                          errors={errors?.properties?.[prop.id]}
                          level={level + 1}
                      />
                  ))}
                  <Button onClick={addItemProperty} variant="text" size="sm">+ Add Property</Button>
                </NestedBlock>
            )}
        </div>
    );
  };

  const renderDefaultValueInput = () => {
    switch (parameter.type) {
      case ParameterType.STRING:
        return (
          <Input
            label="Default Value"
            value={parameter.defaultValue ?? ''}
            onChange={(e) => handleUpdate('defaultValue', e.target.value)}
            placeholder="Enter default value"
          />
        );
      case ParameterType.NUMBER:
        return (
          <Input
            type="number"
            label="Default Value"
            value={parameter.defaultValue ?? ''}
            onChange={(e) => handleUpdate('defaultValue', e.target.value)}
            placeholder="Enter default number"
          />
        );
      case ParameterType.BOOLEAN: {
          const hasDefault = parameter.defaultValue !== undefined;
          return (
            <div>
              <label className="block text-xs font-medium text-light-on-surface-variant dark:text-dark-on-surface-variant mb-1">Default Value</label>
              <div className="flex items-center space-x-4 mt-2">
                 <label htmlFor={`hasDefault-${parameter.id}`} className="flex items-center space-x-2 text-sm text-light-on-surface-variant dark:text-dark-on-surface-variant cursor-pointer">
                    <input
                        id={`hasDefault-${parameter.id}`}
                        type="checkbox"
                        checked={hasDefault}
                        onChange={(e) => {
                          handleUpdate('defaultValue', e.target.checked ? false : undefined); // Default to false when enabled
                        }}
                        className="h-4 w-4 rounded bg-transparent border-light-outline dark:border-dark-outline text-light-primary dark:text-dark-primary focus:ring-light-primary/50 dark:focus:ring-dark-primary/50"
                    />
                    <span>Set a default value</span>
                 </label>

                {hasDefault && (
                  <label htmlFor={`defaultValue-${parameter.id}`} className="flex items-center space-x-2 text-sm text-light-on-surface-variant dark:text-dark-on-surface-variant cursor-pointer">
                    <span className={parameter.defaultValue === false ? 'font-semibold text-light-on-surface dark:text-dark-on-surface' : ''}>False</span>
                    <div className="relative">
                      <input
                        id={`defaultValue-${parameter.id}`}
                        type="checkbox"
                        checked={!!parameter.defaultValue}
                        onChange={(e) => handleUpdate('defaultValue', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-light-outline rounded-full peer peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-light-primary/50 dark:peer-focus:ring-dark-primary/50 peer-checked:bg-light-primary dark:peer-checked:bg-dark-primary dark:bg-dark-outline transition-colors"></div>
                      <div className="absolute top-0.5 left-0.5 bg-white dark:bg-dark-outline-variant peer-checked:bg-light-on-primary dark:peer-checked:dark-on-primary border-gray-300 dark:border-gray-600 rounded-full h-5 w-5 transform transition-transform peer-checked:translate-x-full"></div>
                    </div>
                    <span className={parameter.defaultValue === true ? 'font-semibold text-light-on-surface dark:text-dark-on-surface' : ''}>True</span>
                  </label>
                )}
              </div>
            </div>
          );
        }
      case ParameterType.OBJECT:
      case ParameterType.ARRAY:
        return (
          <div>
            <label className="block text-xs font-medium text-light-on-surface-variant dark:text-dark-on-surface-variant mb-1">Default Value (as JSON string)</label>
            <textarea
              value={parameter.defaultValue ?? ''}
              onChange={(e) => handleUpdate('defaultValue', e.target.value)}
              placeholder={parameter.type === ParameterType.OBJECT ? 'e.g., {"user": {"name": "John Doe"}}' : 'e.g., ["read", "write"]'}
              className="w-full h-20 p-3 bg-transparent border border-light-outline dark:border-dark-outline rounded-lg focus:ring-2 focus:border-light-primary dark:focus:border-dark-primary transition-colors text-xs font-mono"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const rootContainerClasses = "rounded-lg p-3 space-y-3 bg-light-surface-container-high dark:bg-dark-surface-container-high";

  return (
    <div className={rootContainerClasses}>
      <div className="flex flex-col md:flex-row items-start gap-2">
        <div className="flex-grow w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Input
            value={parameter.name}
            onChange={(e) => handleUpdate('name', e.target.value)}
            placeholder="Param Name"
            error={errors?.name}
            icon={typeIconMap[parameter.type]}
          />
          <select
            value={parameter.type}
            onChange={handleTypeChange}
            className="w-full p-2 bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline rounded-lg focus:ring-2 focus:ring-light-primary/50 dark:focus:ring-dark-primary/50 focus:border-light-primary dark:focus:border-dark-primary transition-colors text-sm text-light-on-surface-variant dark:text-dark-on-surface-variant"
          >
            {Object.values(ParameterType).map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
        <div className="flex items-center justify-end gap-4 w-full md:w-auto pt-2 md:pt-0">
          <label htmlFor={`required-${parameter.id}`} className="flex items-center space-x-2 text-sm text-light-on-surface-variant dark:text-dark-on-surface-variant cursor-pointer">
            <div className="relative">
              <input
                id={`required-${parameter.id}`}
                type="checkbox"
                checked={parameter.isRequired}
                onChange={(e) => handleUpdate('isRequired', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-light-outline rounded-full peer peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-light-primary/50 dark:peer-focus:ring-dark-primary/50 peer-checked:bg-light-primary dark:peer-checked:bg-dark-primary dark:bg-dark-outline transition-colors"></div>
              <div className="absolute top-0.5 left-0.5 bg-white dark:bg-dark-outline-variant peer-checked:bg-light-on-primary dark:peer-checked:dark-on-primary border-gray-300 dark:border-gray-600 rounded-full h-5 w-5 transform transition-transform peer-checked:translate-x-full"></div>
            </div>
            <span>Required</span>
          </label>
          <button onClick={onRemove} className="p-1.5 text-light-on-surface-variant dark:text-dark-on-surface-variant hover:text-light-error dark:hover:text-dark-error rounded-full hover:bg-light-error-container/50 dark:hover:bg-dark-error-container/50 transition-colors">
              <TrashIcon size={18} />
          </button>
        </div>
      </div>
      <Input
          value={parameter.description}
          onChange={(e) => handleUpdate('description', e.target.value)}
          placeholder="Parameter Description"
          error={errors?.description}
      />

      {renderDefaultValueInput()}

      {parameter.type === ParameterType.OBJECT && (
        <NestedBlock title="Properties">
            {(parameter.properties || []).map(prop => (
                <ParameterEditor
                    key={prop.id}
                    parameter={prop}
                    onUpdate={(p) => updateProperty(prop.id, p)}
                    onRemove={() => removeProperty(prop.id)}
                    errors={errors?.properties?.[prop.id]}
                    level={level + 1}
                />
            ))}
            <Button onClick={addProperty} variant="text" size="sm">+ Add Property</Button>
        </NestedBlock>
      )}

      {parameter.type === ParameterType.ARRAY && parameter.items && (
         <NestedBlock title="Array Item Schema">
            <ItemSchemaEditor schema={parameter.items} onUpdate={updateItemSchema} errors={errors?.items} />
        </NestedBlock>
      )}
    </div>
  );
};

export default ParameterEditor;