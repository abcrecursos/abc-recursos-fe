import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  pyme: string;
  insumos: string;
  position: number;
  telefono: string;
  localidad: string;
  provincia: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, pyme: 'Pyme 1', insumos: 'Batas, Barbijos', telefono: '+ 54 341 2667189', localidad: 'Rosario', provincia: 'Santa Fe'},
  {position: 2, pyme: 'Pyme 2', insumos:  'Barbijos', telefono:'+ 54 341 2667189', localidad: 'Rosario', provincia: 'Santa Fe'},
  {position: 3, pyme: 'Pyme 3', insumos:  'Guantes', telefono: '+ 54 341 2667189', localidad: 'Rosario', provincia: 'Santa Fe'},
  {position: 4, pyme: 'Pyme 4', insumos: 'Barbijos', telefono: '+ 54 341 2667189', localidad: 'Rosario', provincia: 'Santa Fe'},
  {position: 5, pyme: 'Pyme 5', insumos:  'Guantes, Barbijos, Batas', telefono: '+ 54 341 2667189', localidad: 'Rosario', provincia: 'Santa Fe'},
  {position: 6, pyme: 'Pyme 6', insumos:  'Barbijos', telefono: '+ 54 341 2667189', localidad: 'Rosario', provincia: 'Santa Fe'},
  {position: 7, pyme: 'Pyme 7', insumos:  'Barbijos', telefono: '+ 54 341 2667189', localidad: 'Rosario', provincia: 'Santa Fe'},
  {position: 8, pyme: 'Pyme 8', insumos:  'Barbijos', telefono: '+ 54 341 2667189', localidad: 'Rosario', provincia: 'Santa Fe'},
  {position: 9, pyme: 'Pyme 9', insumos: 'Barbijos', telefono: '+ 54 341 2667189', localidad: 'Rosario', provincia: 'Santa Fe'},
  {position: 10,pyme: 'Pyme 10', insumos:  'Guantes', telefono: '+ 54 341 2667189', localidad: 'Rosario', provincia: 'Santa Fe'},
];

@Component({
  selector: 'app-produce',
  templateUrl: './produce.component.html',
  styleUrls: ['./produce.component.css']
})

export class ProduceComponent implements OnInit {

  displayedColumns: string[] = ['pyme', 'insumos', 'telefono', 'ubicacion'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); 
  }

  constructor() { }

  ngOnInit(): void {
  }

}
