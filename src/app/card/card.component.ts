import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

export class CardComponent {
  card = {
    userName: null,
    cardNumber: null,
    expDateMonth: null,
    expDateYear: null,
    cvc: null
  };

  cardForm!: FormGroup;

  ngOnInit(): void {
    this.cardForm = new FormGroup({
      userName: new FormControl(this.card.userName, [Validators.required, Validators.minLength(4)]),
      cardNumber: new FormControl(this.card.cardNumber, [Validators.required, Validators.minLength(19), Validators.maxLength(19), Validators.pattern("[0-9 ]+")]),
      expDateMonth: new FormControl(this.card.expDateMonth, [Validators.required, Validators.pattern("[0-9]+")]),
      expDateYear: new FormControl(this.card.expDateYear, [Validators.required, Validators.pattern("[0-9]+")]),
      cvc: new FormControl(this.card.cvc, [Validators.required, Validators.maxLength(3), Validators.minLength(3), Validators.pattern("[0-9]+")
      ])
    });
  }

  submitApplicationOnConsole(name: string, cardNumber: string, expDateMonth: string, expDateYear: string, cvc: number) {
    console.log(`My card is: firstName: ${name}, card numer: ${cardNumber}, exp date month: ${expDateMonth},exp date year: ${expDateYear}, CVC: ${cvc}..`);
  }

  submitApplication() {
    this.submitApplicationOnConsole(
      this.cardForm.value.userName ?? '',
      this.cardForm.value.cardNumber ?? 0,
      this.cardForm.value.expDateMonth ?? '',
      this.cardForm.value.expDateYear ?? '',
      Number(this.cardForm.value.cvc) ?? 0
    );
  }

  formatCardNumber(event: any) {
    let input = event.target.value.split(' ').join(''); // Remove existing spaces
    if (input.length > 16) {
      input = input.substr(0, 16); // Limit to 16 digits
    }

    // Add spaces every 4 digits
    input = input.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');

    event.target.value = input.trim(); // Update the input field
  }

  get userName() {
    return this.cardForm.get('userName');
  }
  get cardNumber() {
    return this.cardForm.get('cardNumber');
  }
  get expDateMonth() {
    return this.cardForm.get('expDateMonth');
  }
  get expDateYear() {
    return this.cardForm.get('expDateYear');
  }
  get cvc() {
    return this.cardForm.get('cvc');
  }
}