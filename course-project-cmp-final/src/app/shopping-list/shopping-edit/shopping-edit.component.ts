import { Component, OnInit, ElementRef, ViewChild, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput')  nameInputRef: ElementRef;
  @ViewChild('amountInput')  amountInputRef: ElementRef;
  ingredientAdded = new EventEmitter<{name: string, amount: number}>();

  constructor() { }

  ngOnInit() {
  }

  onAddItem() {

  }

}

//
