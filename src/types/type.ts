export interface ICategory {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

export interface IProduct {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: "up" | "down" | "same";
        pct: number;
    };
    markets: IMarket[];
}

export interface IMarket {
    market: string;
    division: string;
    min: number;
    max: number;
}