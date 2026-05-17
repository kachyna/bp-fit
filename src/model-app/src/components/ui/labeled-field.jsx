import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"

export function InputField( {id, label = "Label", description = "", ...props } ) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        {...props}
      />
      {description && (
        <FieldDescription>
          {description}
        </FieldDescription>
      )}
    </Field>
  )
}