export interface MacroEntry {
    id: number;
    userID: number;
    submitTime: string;
    proteins: number;
    carbs: number;
    fats: number;
}

export interface InsertMacroEntryRequest {
    userID: number;
    proteins: number;
    carbs: number;
    fats: number;
}