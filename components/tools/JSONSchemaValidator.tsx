'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { validateJSONSchema, exampleSchemas } from '@/lib/utils/toolHelpers'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function JSONSchemaValidator() {
  const [jsonData, setJsonData] = useState('')
  const [jsonSchema, setJsonSchema] = useState('')
  const [result, setResult] = useState<{ valid: boolean; errors: string[] } | null>(null)
  const { showToast } = useToast()

  const handleValidate = () => {
    if (!jsonData.trim() || !jsonSchema.trim()) {
      showToast('Please provide both JSON data and schema', 'error')
      return
    }

    try {
      const validation = validateJSONSchema(jsonData, jsonSchema)
      setResult(validation)

      if (validation.valid) {
        showToast('JSON is valid!', 'success')
      } else {
        showToast(`Found ${validation.errors.length} validation error(s)`, 'error')
      }
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Validation failed', 'error')
    }
  }

  const handleClear = () => {
    setJsonData('')
    setJsonSchema('')
    setResult(null)
  }

  const loadExample = (type: keyof typeof exampleSchemas) => {
    const schema = exampleSchemas[type]
    setJsonSchema(JSON.stringify(schema, null, 2))

    // Load example data for the schema
    const exampleData: Record<string, any> = {
      user: {
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
        role: 'admin',
      },
      product: {
        id: 1,
        name: 'Widget',
        price: 29.99,
        tags: ['electronics', 'gadget'],
      },
      config: {
        version: '1.0.0',
        settings: {
          debug: true,
          maxRetries: 5,
        },
      },
    }

    setJsonData(JSON.stringify(exampleData[type], null, 2))
    setResult(null)
  }

  useKeyboardShortcuts([
    { key: 'Enter', ctrlKey: true, handler: handleValidate, description: 'Validate' },
    { key: 'k', ctrlKey: true, handler: handleClear, description: 'Clear' },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          JSON Data
        </h3>
        <textarea
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
          className="w-full h-48 bg-bg-tertiary border border-border-primary p-3 font-mono text-sm text-text-primary focus:outline-none focus:border-accent-primary resize-y"
          placeholder='{"name": "John Doe", "email": "john@example.com"}'
        />
      </div>

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          JSON Schema
        </h3>
        <textarea
          value={jsonSchema}
          onChange={(e) => setJsonSchema(e.target.value)}
          className="w-full h-48 bg-bg-tertiary border border-border-primary p-3 font-mono text-sm text-text-primary focus:outline-none focus:border-accent-primary resize-y"
          placeholder='{"type": "object", "required": ["name", "email"], "properties": {...}}'
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="primary" onClick={handleValidate}>
          Validate
        </Button>
        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
        <Button variant="secondary" onClick={() => loadExample('user')}>
          Load User Example
        </Button>
        <Button variant="secondary" onClick={() => loadExample('product')}>
          Load Product Example
        </Button>
        <Button variant="secondary" onClick={() => loadExample('config')}>
          Load Config Example
        </Button>
      </div>

      {result && (
        <div className="bg-bg-secondary border border-border-primary p-5">
          <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
            Validation Result
          </h3>

          <div className={`border ${result.valid ? 'border-green-400' : 'border-red-400'} p-6 bg-bg-tertiary`}>
            <div className="text-3xl font-mono font-bold mb-4">
              {result.valid ? (
                <span className="text-green-400">✓ VALID</span>
              ) : (
                <span className="text-red-400">✗ INVALID</span>
              )}
            </div>

            {!result.valid && result.errors.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-mono text-text-secondary mb-2">Validation Errors:</p>
                {result.errors.map((error, index) => (
                  <div key={index} className="bg-bg-primary border border-red-400 p-3">
                    <p className="text-sm font-mono text-red-400">{error}</p>
                  </div>
                ))}
              </div>
            )}

            {result.valid && (
              <p className="text-sm font-mono text-green-400">
                All schema validations passed successfully!
              </p>
            )}
          </div>
        </div>
      )}

      <div className="bg-bg-secondary border border-border-primary p-5">
        <h3 className="font-mono text-lg font-semibold text-text-primary mb-4">
          About JSON Schema
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">📋 What is JSON Schema?</p>
            <p className="text-text-secondary">
              JSON Schema is a vocabulary for validating JSON data structure and constraints
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">🔍 Type Validation</p>
            <p className="text-text-secondary">
              Validates data types: object, array, string, number, boolean, null
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">✅ Required Fields</p>
            <p className="text-text-secondary">
              Enforces presence of required properties in objects
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">📏 Constraints</p>
            <p className="text-text-secondary">
              Supports minLength, maxLength, minimum, maximum, enum, and more
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">🎯 Nested Validation</p>
            <p className="text-text-secondary">
              Validates nested objects and array items recursively
            </p>
          </div>
          <div className="bg-bg-tertiary border border-border-primary p-3">
            <p className="text-accent-primary mb-2">💡 Use Cases</p>
            <p className="text-text-secondary">
              API validation, config files, form validation, data integrity
            </p>
          </div>
        </div>
      </div>

      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Validate' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
