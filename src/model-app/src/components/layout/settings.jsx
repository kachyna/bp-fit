
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Settings as SettingsIcon } from 'lucide-react'
import { useUiStore } from '@/store/useUiStore'

export function SettingsMenu({ debug, onCheckboxChange }) {
    const expandAllCards = useUiStore(state => state.expandAllCards)
    const setExpandAllCards = useUiStore(state => state.setExpandAllCards)

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-800">
                    <SettingsIcon className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56">
                <div className="space-y-3">
                    <div>
                        <h4 className="font-medium leading-none text-slate-800">Nastavení</h4>
                        <p className="text-xs text-slate-500 mt-1">Dodatečné zobrazení parametrů a metrik do GUI.</p>
                    </div>
                    
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="debug-mode"
                                className="rounded border-slate-300 focus:ring-offset-0 relative flex h-4 w-4 shrink-0 overflow-hidden cursor-pointer"
                                checked={debug}
                                onChange={(e) => {onCheckboxChange(e.target.checked)}}
                            />
                            <label
                                htmlFor="debug-mode"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 cursor-pointer"
                            >
                                Povolit debug view
                            </label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="expand-all-cards"
                                className="rounded border-slate-300 focus:ring-offset-0 relative flex h-4 w-4 shrink-0 overflow-hidden cursor-pointer"
                                checked={expandAllCards}
                                onChange={(e) => {setExpandAllCards(e.target.checked)}}
                            />
                            <label
                                htmlFor="expand-all-cards"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 cursor-pointer"
                            >
                                Rozbalit všechny karty
                            </label>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}