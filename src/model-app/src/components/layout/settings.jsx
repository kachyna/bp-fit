
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Settings as SettingsIcon } from 'lucide-react'
import { useUiStore } from '@/store/useUiStore'

const styles = {
    checkbox: "rounded border-slate-300 focus:ring-offset-0 relative flex h-4 w-4 shrink-0 overflow-hidden cursor-pointer",
    label: "text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 cursor-pointer"
}

export function SettingsMenu() {

    /**
     * If checked, all tailwind groups will be removed.
     * This means that all cards will be expanded.
     */
    const expandAllCards = useUiStore(state => state.expandAllCards)
    const setExpandAllCards = useUiStore(state => state.setExpandAllCards)

    /**
     * If checked, the debug card will be displayed.
     * Users can see raw calculated values, maybe if they want to check if the model is working correctly
     * or calcualte their own custom metrics.
     */
    const showDebugCard = useUiStore(state => state.showDebugCard)
    const setShowDebugCard = useUiStore(state => state.setShowDebugCard)

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-800">
                    <SettingsIcon className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56">
                <div className="space-y-3">
                    <h4 className="font-medium leading-none text-slate-800">Nastavení</h4>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="debug-mode"
                                className={styles.checkbox}
                                checked={showDebugCard}
                                onChange={(e) => { setShowDebugCard(e.target.checked) }}
                            />
                            <label htmlFor="debug-mode" className={styles.label}>
                                Povolit debug view
                            </label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="expand-all-cards"
                                className={styles.checkbox}
                                checked={expandAllCards}
                                onChange={(e) => { setExpandAllCards(e.target.checked) }}
                            />
                            <label htmlFor="expand-all-cards" className={styles.label}>
                                Rozbalit všechny karty
                            </label>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}