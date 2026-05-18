import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"

import { useModelStore } from "@/store/useModelStore"

export function RecalculateWithParams() {
    const updateAllDatacenters = useModelStore((state) => state.updateAllDatacenters);

    return (
        <Button variant="confirm" onClick={updateAllDatacenters}>
            <Calculator className="mr-2 h-4 w-4" />
            Přepočítat
        </Button>
    )
}
