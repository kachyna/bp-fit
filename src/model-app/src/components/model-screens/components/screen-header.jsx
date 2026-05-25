export const ScreenHeader = ({ title, subtitle, analyzedData, pulseColor = "bg-emerald-500" }) => {
    const portfolioCount = analyzedData?.portfolioCount || 0
    const portfolioPower = analyzedData?.portfolioTotalPower || 0

    return (
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between pb-2">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-800">{title}</h2>
                {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
            </div>
            {/* Live Portfolio Badge/Summary */}
            <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-xs self-start md:self-auto">
                <div className={`h-2 w-2 rounded-full ${pulseColor} animate-pulse`} />
                <span className="text-xs font-semibold text-slate-600">
                    Aktivní portfolio: <span className="text-slate-900 font-bold">{portfolioCount}</span> DC ({portfolioPower.toLocaleString("cs-CZ")} MW)
                </span>
            </div>
        </div>
    )
}
