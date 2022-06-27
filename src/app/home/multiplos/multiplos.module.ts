import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CardsComponent } from './cards/cards.component';
import { FormsComponent } from './forms/forms.component';

@NgModule({
  declarations: [CardsComponent, FormsComponent],
  imports: [CommonModule, FormsModule],
  exports: [CardsComponent, FormsComponent],
})
export class MultiplosModule {}
