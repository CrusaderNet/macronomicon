import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { InsertMacroEntryRequest } from '../common/models/macro_entry';
import { ApiService } from '../common/services/api_service';

@Component({
  selector: 'app-macro-entry-form',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  providers: [ApiService],
  templateUrl: './macro_entry_form.component.html',
  styleUrl: './macro_entry_form.component.scss'
})
export class MacroEntryForm implements OnInit {
    @Output("submit") submit$: EventEmitter<void>;

    protected form = new FormGroup({
        proteins: new FormControl<number | undefined>(undefined, [Validators.required]),
        carbs: new FormControl<number | undefined>(undefined, [Validators.required]),
        fats: new FormControl<number | undefined>(undefined, [Validators.required]),
    });

  constructor(private readonly service: ApiService) {
        this.submit$ = new EventEmitter<void>();
  }

  ngOnInit(): void {
  }

  async onSubmit() {
        const values = this.form.value;
        console.log("Form Submit. Input = ", this.form.value);

        const proteins: number = values.proteins ?? 0;
        const carbs: number = values.carbs ?? 0;
        const fats: number = values.fats ?? 0;

        const entry: InsertMacroEntryRequest = {userID: 1, proteins, carbs, fats};

        this.form.disable();

        try {
            const res = await this.service.insertMacroEntry(entry);

            this.submit$.emit();
            this.form.reset();
            this.form.enable();
        } catch (err) {
            console.error("Insert Request Failed. Errror = ", err);
        }

  }
}
