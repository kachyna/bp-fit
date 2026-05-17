import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"

export function SelectDatacenter({label, description, name, placeholder, array, ...props}) {
  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
        <Select {...props}>
        <SelectTrigger className="w-full max-w-48">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{name}</SelectLabel>
            {array.map((item) => (
              <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {description && (
        <FieldDescription>
          {description}
        </FieldDescription>
      )}
    </Field>
  )
}
