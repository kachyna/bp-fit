export const SAMPLE_PORTFOLIOS = {
    'Česká republika': {
        portfolio: [{ id: crypto.randomUUID(), type: 'coloc',       itPower: 0.45, pue: 1.7, count: 22 },
                    { id: crypto.randomUUID(), type: 'coloc',    itPower: 1.33, pue: 1.5, count: 11 },
                    { id: crypto.randomUUID(), type: 'coloc',    itPower: 3.16, pue: 1.4, count: 15 },
                    { id: crypto.randomUUID(), type: 'coloc',    itPower: 9.75, pue: 1.35, count: 4 },
                    { id: crypto.randomUUID(), type: 'training',    itPower: 0.2, pue: 1.3, count: 2 },
                    { id: crypto.randomUUID(), type: 'training',    itPower: 26, pue: 1.2, count: 2 },],
        description: "ČR těží ze strategické polohy ve středu Evropy a stabilní sítě. Celý trh je teprve v rozkvětu, nicméně plán rozvoje je jasný. Portfolio zahrnuje i DC, která jsou ve výstavbě.",
        sources: [
            "https://github.com/kachyna/bp-fit/tree/main/out/csv"
        ]
    },
    'Irsko': {
        portfolio: [{ id: crypto.randomUUID(), type: 'coloc',     itPower: 20, pue: 1.35, count: 30 },
                    { id: crypto.randomUUID(), type: 'coloc',     itPower: 10, pue: 1.60, count: 10 },
                    { id: crypto.randomUUID(), type: 'training',  itPower: 50, pue: 1.20, count: 3 },
                    { id: crypto.randomUUID(), type: 'inference', itPower: 40, pue: 1.25, count: 5 },],
        description: "Irsko je evropským lídrem díky kombinaci daňových úlev a ideálních podmínek pro chlazení. Celkový příkon DC zde tvoří přes 20 % národní spotřeby elektřiny.",
        sources: [
            "https://pages.awscloud.com/rs/112-TZM-766/images/AWS_Impact_in_Ireland_Report_JAN18.pdf",
            "https://www.dcbyte.com/wp-content/uploads/2023/11/DC-BYTE_MARKET-SPOTLIGHT_DUBLIN_Final_16Nov23.pdf",
            "https://datacenters.atmeta.com/wp-content/uploads/2025/02/Meta_s-Clonee-Data-Center.pdf",
            "https://local.microsoft.com/wp-content/uploads/2024/04/Microsoft-datacenters-in-Ireland.pdf",
            "https://assets.aboutamazon.com/84/23/c25c129f44b5942224ef49c167ba/aws-indecon-report-oct-2023-final.pdf#page=6.23",
            "https://bitpower.ie/images/Reports/2024_Q4_Market_Update_Ireland_v1-2.pdf"
        ]
    },
    'Německo': {
        portfolio: [{ id: crypto.randomUUID(), type: 'coloc',     itPower: 1, pue: 1.5, count: 800 },
                    { id: crypto.randomUUID(), type: 'coloc',     itPower: 2, pue: 1.50, count: 400 },
                    { id: crypto.randomUUID(), type: 'coloc',     itPower: 5, pue: 1.40, count: 200 },
                    { id: crypto.randomUUID(), type: 'training',  itPower: 70, pue: 1.10, count: 6 },
                    { id: crypto.randomUUID(), type: 'inference', itPower: 40, pue: 1.20, count: 9 },],
        description: "Německý trh, zejména v okolí Frankfurtu, je jedním z největších na světě. Klade extrémní nároky na energetickou efektivitu a přísné ekologické standardy.",
        sources: [
            "https://www.mordorintelligence.com/industry-reports/germany-data-center-market"
        ]
    },
    'USA': {
        portfolio: [{ id: crypto.randomUUID(), type: 'coloc',     itPower: 0.85, pue: 2.10, count: 2545 },
                    { id: crypto.randomUUID(), type: 'coloc',     itPower: 3.2,  pue: 1.85, count: 1440 },
                    { id: crypto.randomUUID(), type: 'coloc',     itPower: 18.5, pue: 1.55, count: 182 },
                    { id: crypto.randomUUID(), type: 'coloc',     itPower: 92,   pue: 1.45, count: 11 },
                    { id: crypto.randomUUID(), type: 'inference', itPower: 12,   pue: 1.50, count: 156 },
                    { id: crypto.randomUUID(), type: 'inference', itPower: 35,   pue: 1.40, count: 72 },
                    { id: crypto.randomUUID(), type: 'inference', itPower: 110,  pue: 1.30, count: 8 },
                    { id: crypto.randomUUID(), type: 'training',  itPower: 22,   pue: 1.45, count: 94 },
                    { id: crypto.randomUUID(), type: 'training',  itPower: 65,   pue: 1.35, count: 28 },
                    { id: crypto.randomUUID(), type: 'training',  itPower: 145,  pue: 1.25, count: 12 },],
        description: "USA jsou globálním hráčem číslo jedna. Americká datová centra spotřebovávají téměř polovinu veškeré energie využívané tímto sektorem po celém světě.",
        sources: [
            "https://www.mordorintelligence.com/industry-reports/united-states-data-center-market",
            "https://cleanview.co/data-centers/us",
            "https://www.holdfastprojects.com/us-datacentre-pue.md-2",
            "https://www.congress.gov/crs-product/R48646"
        ]
    },
};
