import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { HelpCircle, Zap, Activity } from "lucide-react"

const styles = {
    section: "space-y-6",
    sectionTitle: "font-bold text-sm uppercase tracking-wider text-slate-400 mb-2",
    metricGroup: "space-y-2",
    metricHeader: "flex items-center gap-2 text-slate-900 font-semibold text-sm",
    metricText: "text-xs text-slate-600 leading-relaxed pl-6",
    metricTextExtra: "text-xs text-slate-600 leading-relaxed pl-6 mt-2",
    indentedContainer: "pl-6 pt-1",
    cardLabel: "text-[10px] uppercase font-bold block mb-0.5",
    cardValue: "font-semibold",
}

const DcTypeCard = ({
    title,
    description,
    dotColorClass,
    cardBgClass,
    labelColorClass,
    valueColorClass,
    stats,
}) => (
    <div className="space-y-2">
        <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${dotColorClass}`} />
            <h3 className="font-bold text-sm text-slate-900">{title}</h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed pl-4">{description}</p>
        <div className={`grid grid-cols-3 gap-2 p-2.5 rounded-lg border text-xs ml-4 ${cardBgClass}`}>
            <div>
                <span className={`${styles.cardLabel} ${labelColorClass}`}>Příkon / Rack</span>
                <span className={`${styles.cardValue} ${valueColorClass}`}>{stats.power}</span>
            </div>
            <div>
                <span className={`${styles.cardLabel} ${labelColorClass}`}>Cílové PUE</span>
                <span className={`${styles.cardValue} ${valueColorClass}`}>{stats.pue}</span>
            </div>
            <div>
                <span className={`${styles.cardLabel} ${labelColorClass}`}>Chlazení</span>
                <span className={`${styles.cardValue} ${valueColorClass}`}>{stats.cooling}</span>
            </div>
        </div>
    </div>
)

export function DcTypesInfoDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 text-xs">
                    <HelpCircle className="size-3.5" />
                    Vysvětlení vstupních hodnot
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-137.5 bg-white text-slate-900 border-slate-200">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Metriky a typologie datacenter</DialogTitle>
                    <DialogDescription className="text-xs text-slate-500">
                        Průvodce základními pojmy a přehled specifikací jednotlivých typů.
                    </DialogDescription>
                </DialogHeader>

                {/* SCROLLOVACÍ OBSAH */}
                <div className="-mx-4 no-scrollbar max-h-[60vh] overflow-y-auto px-4 space-y-6 pt-2">

                    {/* SEKCE: ZÁKLADNÍ POJMY */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>
                            Co znamenají klíčové metriky?
                        </h3>

                        {/* IT Příkon */}
                        <div className={styles.metricGroup}>
                            <div className={styles.metricHeader}>
                                <Zap className="size-4 text-amber-500 fill-amber-500/10" />
                                <h4>IT Příkon (IT Load / IT Power)</h4>
                            </div>
                            <p className={styles.metricText}>
                                Čistý elektrický výkon vyhrazený <strong>výhradně pro napájení výpočetního hardwaru</strong> (servery, disková pole, síťové prvky, GPU). Nezahrnuje spotřebu klimatizací, osvětlení budovy ani ztráty v transformátorech. Udává se buď v kW na jeden rack, nebo v MW pro celkovou kapacitu datacentra.
                            </p>

                            {/* TABULKA TYPICKÝCH PŘÍKONŮ */}
                            <div className={styles.indentedContainer}>
                                <div className="border border-slate-200 rounded-lg overflow-hidden">
                                    <table className="w-full text-left text-xs border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                                                <th className="p-2.5">Typ datacentra</th>
                                                <th className="p-2.5">Hustota na rack</th>
                                                <th className="p-2.5">Celkový výkon komplexu</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 text-slate-600">
                                            <tr>
                                                <td className="p-2.5 font-medium text-slate-900">Colocation (Tradiční DC)</td>
                                                <td className="p-2.5">5 – 15 kW</td>
                                                <td className="p-2.5">10 – 50 MW</td>
                                            </tr>
                                            <tr>
                                                <td className="p-2.5 font-medium text-slate-900">AI Training Cluster</td>
                                                <td className="p-2.5">40 – 100+ kW</td>
                                                <td className="p-2.5">20 – 100+ MW</td>
                                            </tr>
                                            <tr>
                                                <td className="p-2.5 font-medium text-slate-900">AI Inference Node</td>
                                                <td className="p-2.5">20 – 40 kW</td>
                                                <td className="p-2.5">5 – 30 MW</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <p className={styles.metricTextExtra}>
                                V České republice se zatím nacházejí výhradně kolokační datová centra, nicméně na konci roku 2026 a v průběhu 2027 se mají postavit i spcializovaná AI datová centra s vyšším příkonem. Projekt Prague Gatewy DC má mít v počáteční fázi instalovaný IT příkon 25 MW (plánuje se rozšíření na více než 70 MW), zatímco plánované DC v Kanicích u Brna 4 MW (s možností rozšíření na 26 MW).
                            </p>
                        </div>

                        {/* PUE */}
                        <div className={`${styles.metricGroup} pt-2`}>
                            <div className={styles.metricHeader}>
                                <Activity className="size-4 text-emerald-500" />
                                <h4>PUE (Power Usage Effectiveness)</h4>
                            </div>
                            <p className={styles.metricText}>
                                Globální standard pro měření energetické účinnosti datacentra. Vyjadřuje poměr mezi celkovou energií, která do budovy vstupuje, a energií, která se reálně využije na provoz IT hardwaru.
                            </p>

                            <div className={styles.indentedContainer}>
                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex items-center justify-center gap-3 my-1 font-medium text-xs sm:text-sm">
                                    <span className="font-bold text-slate-900 text-base">PUE =</span>

                                    <div className="flex flex-col items-center text-center">
                                        <span className="pb-1 border-b border-slate-300 w-full text-slate-700">
                                            Celková energie vstupující do budovy
                                        </span>
                                        <span className="pt-1 w-full text-slate-700">
                                            Energie spotřebovaná IT hardwarem
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className={styles.metricTextExtra}>
                                Ideální hodnota je 1,0 (veškerá energie jde do serverů).
                                Pokud je PUE 1,5, na každých 1 kW výkonu pro servery musíme spotřebovat dalších 0,5 kW na chlazení a režii budovy.
                                Čím nižší číslo, tím je datacentrum efektivnější a ekologičtější.
                                Momentálně se nejnižší hodnoty pohybují kolem 1,05, nicméně postavit takové DC je velmi nákladné. Průměrná moderní zařízení dosahují PUE mezi 1,3 a 1,5.
                            </p>
                        </div>
                    </div>

                    {/* SEKCE: TYPY DC */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>
                            Typy datových center v modelu
                        </h3>

                        <div className="space-y-6">
                            <DcTypeCard
                                title="Colocation (Tradiční DC)"
                                description="Pronájem fyzického prostoru (sálů, klecí, racků) a sdílené podpůrné infrastruktury pro servery externích zákazníků. Zákazník si dodává vlastní hardware, zatímco operátor garantuje konektivitu, napájení a chlazení."
                                dotColorClass="bg-slate-400"
                                cardBgClass="bg-slate-50 border-slate-100"
                                labelColorClass="text-slate-400"
                                valueColorClass="text-slate-800"
                                stats={{
                                    power: "5 – 15 kW",
                                    pue: "1.30 – 1.50",
                                    cooling: "Klasické vzduchové"
                                }}
                            />

                            <DcTypeCard
                                title="AI Training Cluster"
                                description="Specializovaný superpočítačový cluster navržený pro trénování komplexních LLM a neuronových sítí. Propojuje tisíce špičkových GPU akcelerátorů pomocí ultra-rychlé síťové architektury s nízkou latencí (např. InfiniBand)."
                                dotColorClass="bg-amber-500"
                                cardBgClass="bg-amber-50/30 border-amber-100/50"
                                labelColorClass="text-amber-600/70"
                                valueColorClass="text-amber-900"
                                stats={{
                                    power: "40 – 100+ kW",
                                    pue: "1.10 – 1.20",
                                    cooling: "Kapalinové (D2C)"
                                }}
                            />

                            <DcTypeCard
                                title="AI Inference Node"
                                description="Produkční servery optimalizované pro provoz již vytrénovaných modelů v reálném čase. Architektura je stavěná na okamžité odbavování uživatelských dotazů (generování textu, obrázků) přes API s důrazem na minimální latenci."
                                dotColorClass="bg-sky-500"
                                cardBgClass="bg-sky-50/30 border-sky-100/50"
                                labelColorClass="text-sky-600/70"
                                valueColorClass="text-sky-900"
                                stats={{
                                    power: "20 – 40 kW",
                                    pue: "1.15 – 1.30",
                                    cooling: "Hybridní (Dynamicky)"
                                }}
                            />
                        </div>
                    </div>

                </div>

                {/* FIXNÍ FOOTER */}
                <DialogFooter className="border-t border-slate-100 pt-3">
                    <DialogClose asChild>
                        <Button variant="outline" className="w-full sm:w-auto">
                            Rozumím
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
