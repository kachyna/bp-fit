import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, Globe } from "lucide-react";
import { useModelStore } from "@/store/useModelStore";
import { SAMPLE_PORTFOLIOS } from "@/constants/sample-portfolios";
import { Card, CardContent } from "@/components/ui/card";

const CountryIcons = {
    'Irsko': '🇮🇪',
    'Česká republika': '🇨🇿',
    'Německo': '🇩🇪',
    'USA': '🇺🇸',
};


export const PortfolioManager = () => {
    const setPortfolio = useModelStore((state) => state.setPortfolio);

    return (
        <div className="flex flex-col gap-2 w-full">

            <Alert className="mb-1 shadow-sm border-slate-200">
                <InfoIcon className="size-4" />
                <AlertTitle className="text-sm font-semibold">Vzorová portfolia</AlertTitle>
                <AlertDescription className="text-xs text-slate-500 leading-relaxed">
                    Kliknutím na jednu z karet níže načteš předdefinované portfolio datacenter.
                    <br /><span className="font-semibold text-slate-700">Pozor!</span> Dojde k přepsání tvého aktuálního nastavení.
                </AlertDescription>
            </Alert>
            <Alert className="mb-1 shadow-sm border-slate-200">
                <InfoIcon className="size-4" />
                <AlertTitle className="text-sm font-semibold">Jak portfolia interpretovat?</AlertTitle>
                <AlertDescription className="text-xs text-slate-500 leading-relaxed">
                    Vzorová portfolia reprezentují reálné situace v různých zemích podle veřejných dat.
                    V kontextu modelu odpovídají na otázku &#8222;Co by se stalo, kdyby se v ČR postavila datová centra jako v zemi X?&#8220; Mění se tak <strong>pouze vstupní hodnoty</strong>, nikoliv parametry modelu.
                </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 gap-3">
                {Object.entries(SAMPLE_PORTFOLIOS).map(([country, data]) => (
                    <Card
                        key={country}
                        className="cursor-pointer shadow-sm border-slate-200 hover:shadow-md hover:border-slate-300 transition-all duration-200"
                        onClick={() => setPortfolio(data.portfolio)}
                    >
                        <CardContent className="px-4 flex flex-col gap-1">
                            <div className="flex items-center gap-3">
                                <div className="size-8 bg-slate-50 rounded-md transition-colors flex items-center justify-center shrink-0 border border-slate-100">
                                    <span className="text-xl leading-none select-none">
                                        {CountryIcons[country] || '🏳️'}
                                    </span>
                                </div>
                                <span className="text-sm font-semibold transition-colors">
                                    {country}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 leading-normal">
                                {data.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}