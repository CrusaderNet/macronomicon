import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ApiService } from './common/services/api_service';
import { MacroEntry } from './common/models/macro_entry';
import { MacroEntryForm } from './macro_entry_form/macro_entry_form.component';

interface MacroEntryView {
    id: number;
    userID: number;
    submitTime: Date;
    proteins: number;
    carbs: number;
    fats: number;
    calories: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MacroEntryForm],
  providers: [ApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  protected macroEntries: MacroEntryView[] = [];

  constructor(private readonly service: ApiService) {}

  ngOnInit(): void {
      this.loadDependencies();
  }
  protected async loadDependencies(): Promise<void> {
    const data = await this.service.listMacroEntries(1);
    this.macroEntries = data.map((entry): MacroEntryView => ({
      ...entry,
      submitTime: new Date(entry.submitTime),
      calories: 4*(entry.proteins + entry.carbs) + 9*(entry.fats),
    }))
  }
}
