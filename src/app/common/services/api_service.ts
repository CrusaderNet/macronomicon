import { Injectable } from "@angular/core";
import { InsertMacroEntryRequest } from "../models/macro_entry";
import { MacroEntry } from "../models/macro_entry";
import { User } from "../models/user";

@Injectable()
export class ApiService {
    constructor() {}

    listMacroEntries(userID: number): Promise<MacroEntry[]> {
        return fetch(`http://localhost:8080/macro_entries?userID=${userID}`).then(response => response.json() as Promise<MacroEntry[]>);
    }

    listUsers(): Promise<User[]> {
        return fetch('http://localhost:8080/users').then(response => response.json() as Promise<User[]>);
    }

    insertMacroEntry(entry: InsertMacroEntryRequest) {
        return fetch('http://localhost:8080/macro_entry', {method: 'POST', body: JSON.stringify(entry)});
    }
}