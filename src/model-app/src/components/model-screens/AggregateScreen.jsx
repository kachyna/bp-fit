import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Zap, Server, Building } from "lucide-react"

export const AggregateModelScreen = () => {
    return (
        <div className="space-y-6">
            {/* KPI Karty */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Agregat</CardTitle>
                        <Zap className="h-4 w-4 text-slate-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">128 MW</div>
                        <p className="text-xs text-slate-500">+14 % oproti původnímu plánu</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Počet datacenter</CardTitle>
                        <Building className="h-4 w-4 text-slate-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-slate-500">2 v provozu, 3 ve výstavbě</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Průměrné PUE</CardTitle>
                        <Activity className="h-4 w-4 text-slate-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1.24</div>
                        <p className="text-xs text-slate-500">-0.05 oproti referenční hodnotě</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Odhad serverů</CardTitle>
                        <Server className="h-4 w-4 text-slate-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24 500</div>
                        <p className="text-xs text-slate-500">Kapacita zaplněna na 90 %</p>
                    </CardContent>
                </Card>
            </div>

            {/* Hlavní grafy / Datové panely */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Roční predikce růstu spotřeby (TWh)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Zástupný blok pro graf */}
                        <div className="h-[300px] w-full rounded-md bg-slate-50 border border-slate-200 border-dashed flex items-center justify-center text-slate-400">
                            [ Zde bude sloupcový / liniový graf růstu spotřeby ]
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Rozložení výkonu dle typu DC</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Zástupný blok pro graf */}
                        <div className="h-[300px] w-full rounded-md bg-slate-50 border border-slate-200 border-dashed flex items-center justify-center text-slate-400">
                            [ Zde bude koláčový graf ]
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}