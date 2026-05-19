import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

import { useModelStore } from "@/store/useModelStore"

export function ResetParamsDialog() {
    const resetParams = useModelStore((state) => state.resetParams);
    const updateAllDatacenters = useModelStore((state) => state.updateAllDatacenters);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Obnovit
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Chcete smazat parametry?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Možná jste na tlačítko kliknuli omylem. Všechny parametry (společné i scénářové) budou resetovány na své výchozí hodnoty.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Zrušit</AlertDialogCancel>
                    <AlertDialogAction onClick={() => {
                        resetParams()
                        updateAllDatacenters()
                    }}>Resetovat</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
