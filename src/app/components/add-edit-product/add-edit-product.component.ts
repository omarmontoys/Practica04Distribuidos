import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      Dateofbirth: ['', Validators.required],
      
    })
  }
  ngOnInit(): void { 
    
  }
  addEmpleado() {
    //console.log(this.form.value.name);
    //console.log(this.form.get('name')?.value);
    const empleados: Product = {
      name: this.form.value.name,
      lastname: this.form.value.lastname,
      Dateofbirth: this.form.value.Dateofbirth
    }
    console.log(empleados);
  }

}
