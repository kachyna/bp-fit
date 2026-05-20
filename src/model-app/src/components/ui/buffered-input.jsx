import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export const BufferedInput = ({ value, onChange, validate, error, ...props }) => {
    const [localValue, setLocalValue] = useState(value === 0 ? "" : String(value));

    useEffect(() => {
        setLocalValue(value === 0 ? "" : String(value));
    }, [value])

    const handleCommit = () => {
        const numericValue = localValue === "" ? 0 : Number(localValue);

        // Validate either returns the original value, or a fall back
        const savedValue = validate(numericValue)

        if (savedValue !== numericValue) {
            // Fallback value
            onChange(savedValue);
            setLocalValue(String(savedValue));
            toast.warning("Neplatná hodnota", {
                position: "top-center",
                description: error,
            });
        } else onChange(savedValue);
    }

    return (
        <Input
            {...props}
            type="number"
            className={`h-8 text-sm ${props.className || ''}`}
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onBlur={handleCommit}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.currentTarget.blur();
                }
                props.onKeyDown?.(e);
            }}
        />
    )
}