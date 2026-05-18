import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Droplet, Flame, Leaf } from "lucide-react"

export const SocialModelScreen = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Levý sloupec s KPI */}
            <div className="lg:col-span-1 flex flex-col gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Nová prac. místa</CardTitle>
                        <Users className="h-4 w-4 text-slate-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1 250</div>
                        <p className="text-xs text-slate-500">Stabilních dlouhodobých pozic</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Uhlíková stopa</CardTitle>
                        <Leaf className="h-4 w-4 text-slate-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.2 Mt CO₂e</div>
                        <p className="text-xs text-slate-500">Odpovídá 0.8% státních emisí</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Odpadní teplo</CardTitle>
                        <Flame className="h-4 w-4 text-slate-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">85 MWt</div>
                        <p className="text-xs text-slate-500">Potenciál pro 15 000 domácností</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Spotřeba vody</CardTitle>
                        <Droplet className="h-4 w-4 text-slate-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1.8 mil. m³</div>
                        <p className="text-xs text-slate-500">Pro chlazení a zvlhčování</p>
                    </CardContent>
                </Card>
            </div>

            {/* Pravý sloupec s grafy */}
            <div className="lg:col-span-3 flex flex-col gap-6">
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>Generování pracovních pozic (FTE) v čase</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Zástupný blok pro graf */}
                        <div className="h-[250px] w-full rounded-md bg-slate-50 border border-slate-200 border-dashed flex items-center justify-center text-slate-400">
                            [ Zde bude Stacked Bar Chart (Výstavba vs. Provoz IT vs. Správa) ]
                        </div>
                    </CardContent>
                </Card>
                
                <Card className="flex-1 border-emerald-100 bg-emerald-50/20">
                    <CardHeader>
                        <CardTitle>Environmentální dopady a ESG benefity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Zástupný blok pro graf */}
                        <div className="h-[250px] w-full rounded-md bg-white border border-emerald-100 border-dashed flex items-center justify-center text-emerald-600/70 font-medium">
                            [ Zde bude Radar Chart (Emise vs Teplo vs Voda) s možností srovnání scénářů ]
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}