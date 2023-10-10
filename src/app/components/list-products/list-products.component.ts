import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  listProducts: Product[] = [
    { id:1, name: "Juan", lastname: 'Gomez', Dateofbirth:         "20 / 12 / 2002" },
    { id:2, name: "Jesus", lastname: 'Guijarro', Dateofbirth:     "25 / 1  / 2002" },
    { id:3, name: "Hector", lastname: 'Isaac', Dateofbirth:       "2  / 2  / 2002" },
    { id:4, name: "Francisco", lastname: 'Escobedo', Dateofbirth: "23 / 6  / 2002"},
    { id:5, name: "Ana", lastname: 'Rebolloso', Dateofbirth:      "12 / 4  / 2002" },
    { id:6, name:"Evely", lastname:'Hernandez', Dateofbirth:      "30 / 8  / 2002"}
  ];
  constructor() {
    
  }
  ngOnInit(): void {
      
    }
}
