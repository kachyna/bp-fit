import { HelpCircle } from "lucide-react"

export const ComparisonData = ({ sources, className, children }) => (
    <div className="flex justify-left gap-2 items-center">
        <div className="flex items-center gap-1">
            <div className="flex items-center gap-1">
                <a href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        sources.forEach(source => window.open(source, "_blank"));
                    }}
                    className={className}
                    title="Zdroje dat">
                    <div className="flex flex-row gap-1 items-center">
                        {sources && sources.length > 0 && <HelpCircle className="h-3 w-3" />}
                    </div>
                </a>
            </div>
            {children}
        </div>
    </div>
)