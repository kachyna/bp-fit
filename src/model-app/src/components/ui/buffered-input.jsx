import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"

export const BufferedInput = ({ value, onChange, ...props }) => {
    const [localValue, setLocalValue] = useState(value === 0 ? "" : String(value));

    useEffect(() => {
        setLocalValue(value === 0 ? "" : String(value));
    }, [value])

    const handleCommit = () => {
        const numericValue = localValue === "" ? 0 : Number(localValue);
        if (!isNaN(numericValue)) {
            onChange(numericValue);
        }
    }

    return (
        <Input 
            {...props} 
            type="number"
            className={`h-8 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${props.className || ''}`}
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