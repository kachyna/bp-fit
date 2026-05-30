export const SAMPLE_PORTFOLIOS = {
    'Irsko': {
        portfolio: [{ id: crypto.randomUUID(), type: 'coloc', itPower: 5, pue: 1.5, count: 2 },
                    { id: crypto.randomUUID(), type: 'training', itPower: 10, pue: 1.2, count: 1 },],
        description: "Irsko je evropským lídrem díky kombinaci daňových úlev a ideálních podmínek pro chlazení. Celkový příkon DC zde tvoří přes 20 % národní spotřeby elektřiny."
    },
    'Česká republika': {
        portfolio: [{ id: crypto.randomUUID(), type: 'coloc', itPower: 3, pue: 1.7, count: 3 },
                    { id: crypto.randomUUID(), type: 'training', itPower: 8, pue: 1.3, count: 2 },],
        description: "ČR těží ze strategické polohy ve středu Evropy a stabilní sítě. Důraz je kladen na modernizaci starších objektů a rozvoj lokálních cloudových služeb."
    },
    'Německo': {
        portfolio: [{ id: crypto.randomUUID(), type: 'coloc', itPower: 4, pue: 1.6, count: 4 },
                    { id: crypto.randomUUID(), type: 'training', itPower: 12, pue: 1.1, count: 1 },],
        description: "Německý trh, zejména v okolí Frankfurtu, je jedním z největších na světě. Klade extrémní nároky na energetickou efektivitu a přísné ekologické standardy."
    },
    'USA': {
        portfolio: [{ id: crypto.randomUUID(), type: 'coloc', itPower: 6, pue: 1.4, count: 5 },
                    { id: crypto.randomUUID(), type: 'training', itPower: 15, pue: 1.2, count: 3 },],
        description: "USA jsou globálním hráčem číslo jedna. Americká datová centra spotřebovávají téměř polovinu veškeré energie využívané tímto sektorem po celém světě."
    },
};
