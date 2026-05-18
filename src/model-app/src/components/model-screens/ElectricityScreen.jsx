import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Battery, Zap, Globe, Gauge } from "lucide-react"

export const ElectricityModelScreen = () => {
    return (
        <div className="space-y-6">
            {/* KPI Karty */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="md:col-span-1 bg-amber-50 border-amber-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium text-amber-900 flex items-center gap-2">
                            <Zap className="h-5 w-5" />
                            Celková spotřeba (10 let)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-amber-950 mt-4">14.2 TWh</div>
                        <p className="text-sm text-amber-700 mt-2">Agregovaná spotřeba za modelové období</p>
                    </CardContent>
                </Card>

                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Špičkový odběr</CardTitle>
                            <Gauge className="h-4 w-4 text-slate-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">450 MW</div>
                            <p className="text-xs text-slate-500">V nejnáročnější špičce sítě</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Obnovitelné zdroje</CardTitle>
                            <Globe className="h-4 w-4 text-slate-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">48 %</div>
                            <p className="text-xs text-slate-500">Z celkového energetického mixu</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">PUE úspora</CardTitle>
                            <Battery className="h-4 w-4 text-slate-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1.5 TWh</div>
                            <p className="text-xs text-slate-500">Oproti standardu sítě</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Hlavní grafy / Datové panely */}
            <Card>
                <CardHeader>
                    <CardTitle>Predikce spotřeby vs. Kapacita Sítě (TWh)</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Zástupný blok pro graf */}
                    <div className="h-65 w-full rounded-md bg-slate-50 border border-slate-200 border-dashed flex items-center justify-center text-slate-400">
                        [ Zde bude vrstvený plošný graf (Area chart) spotřeby elektřiny s hraniční kapacitou sítě ]
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Skladba energetického mixu zapojených DC</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Zástupný blok pro graf */}
                    <div className="h-50 w-full rounded-md bg-slate-50 border border-slate-200 border-dashed flex items-center justify-center text-slate-400">
                        [ Zde bude Stacked Bar Chart distribuující zdroje (Plyn, Jádro, Slunce, Vítr) v čase ]
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}