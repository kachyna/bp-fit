import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Landmark, Wallet, CircleDollarSign } from "lucide-react"

export const EconomyModelScreen = () => {
    return (
        <div className="space-y-6">
            {/* KPI Karty */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Celkové investice (CAPEX)</CardTitle>
                        <Landmark className="h-4 w-4 text-slate-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12.8 mld. Kč</div>
                        <p className="text-xs text-slate-500">Za sledované období</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Roční provoz (OPEX)</CardTitle>
                        <Wallet className="h-4 w-4 text-slate-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2.4 mld. Kč</div>
                        <p className="text-xs text-slate-500">Průměr za sledované období</p>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-200">Nové HDP / Přidaná hodnota</CardTitle>
                        <TrendingUp className="h-4 w-4 text-emerald-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-50">+18.5 mld. Kč</div>
                        <p className="text-xs text-slate-400">Kumulovaný vliv na ekonomiku</p>
                    </CardContent>
                </Card>
            </div>

            {/* Hlavní grafy / Datové panely */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Kumulovaný Cash flow a návratnost pro stát (Kč)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Zástupný blok pro graf */}
                        <div className="h-108 w-full rounded-md bg-slate-50 border border-slate-200 border-dashed flex items-center justify-center text-slate-400 text-center p-4">
                            [ Zde bude liniový Cash Flow graf / ROI pro státní / místní rozpočty ]
                        </div>
                    </CardContent>
                </Card>
                <div className="col-span-1 space-y-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Odvedené daně a poplatky</CardTitle>
                            <CircleDollarSign className="h-4 w-4 text-slate-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">850 mil. Kč</div>
                            <p className="text-xs text-slate-500">Průměrný roční přínos do rozpočtu</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Struktura CAPEX</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Zástupný blok pro graf */}
                            <div className="h-70 w-full rounded-md bg-slate-50 border border-slate-200 border-dashed flex items-center justify-center text-slate-400 text-center p-4">
                                [ Zde bude koláčový/treemap graf - Land, Shell, IT Equipment... ]
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}