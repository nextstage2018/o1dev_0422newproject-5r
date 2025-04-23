"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePicker } from "@/components/ui/date-picker"

interface Field {
  id: string
  name: string
  type: string
  required: boolean
  visible: boolean
  table: string
  options?: { value: string; label: string }[]
}

interface DynamicFormProps {
  fields: Field[]
  initialValues?: Record<string, any>
  onSubmit: (values: Record<string, any>) => void
  submitLabel?: string
  cancelLabel?: string
  onCancel?: () => void
}

export function DynamicForm({
  fields,
  initialValues = {},
  onSubmit,
  submitLabel = "保存",
  cancelLabel = "キャンセル",
  onCancel,
}: DynamicFormProps) {
  const [values, setValues] = useState<Record<string, any>>(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    setValues(initialValues)
  }, [initialValues])

  const handleChange = (id: string, value: any) => {
    setValues((prev) => ({ ...prev, [id]: value }))

    // エラーをクリア
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[id]
        return newErrors
      })
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    fields.forEach((field) => {
      if (field.required && field.visible) {
        const value = values[field.id]
        if (value === undefined || value === null || value === "") {
          newErrors[field.id] = `${field.name}は必須項目です`
        }
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validate()) {
      onSubmit(values)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields
          .filter((field) => field.visible)
          .map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>
                {field.name}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>

              {field.type === "string" && !field.options && (
                <Input
                  id={field.id}
                  value={values[field.id] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className={errors[field.id] ? "border-red-500" : ""}
                />
              )}

              {field.type === "integer" && (
                <Input
                  id={field.id}
                  type="number"
                  value={values[field.id] || ""}
                  onChange={(e) => handleChange(field.id, Number.parseInt(e.target.value) || "")}
                  className={errors[field.id] ? "border-red-500" : ""}
                />
              )}

              {field.type === "float" && (
                <Input
                  id={field.id}
                  type="number"
                  step="0.01"
                  value={values[field.id] || ""}
                  onChange={(e) => handleChange(field.id, Number.parseFloat(e.target.value) || "")}
                  className={errors[field.id] ? "border-red-500" : ""}
                />
              )}

              {field.type === "boolean" && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={field.id}
                    checked={values[field.id] || false}
                    onCheckedChange={(checked) => handleChange(field.id, checked)}
                  />
                  <label
                    htmlFor={field.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {field.name}
                  </label>
                </div>
              )}

              {field.type === "date" && (
                <DatePicker
                  id={field.id}
                  value={values[field.id] ? new Date(values[field.id]) : undefined}
                  onChange={(date) => handleChange(field.id, date)}
                />
              )}

              {field.options && (
                <Select value={values[field.id] || ""} onValueChange={(value) => handleChange(field.id, value)}>
                  <SelectTrigger id={field.id} className={errors[field.id] ? "border-red-500" : ""}>
                    <SelectValue placeholder={`${field.name}を選択`} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {errors[field.id] && <p className="text-red-500 text-sm mt-1">{errors[field.id]}</p>}
            </div>
          ))}
      </div>

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            {cancelLabel}
          </Button>
        )}
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  )
}
