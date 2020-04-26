import { Component, OnInit, ViewChild } from '@angular/core';
import { SuppliesService } from '../../services/suppplies.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

export interface PeriodicElement {
  position: number;
  nombre: string;
  direccion: string;
  distancia: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, nombre: 'Hospital 1', direccion: 'Mitre 747', distancia: '300 mts'},
  {position: 2, nombre: 'Hospital 2', direccion:  'San Luis 987', distancia:'1200 mts'},
];

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'direccion', 'distancia'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  supplies: any;
  showMe: boolean = false
  order: string;
  ordersDataChecked = [];
  constructor(public json: SuppliesService) {
      this.json.getSupplies('https://abc-back.herokuapp.com/api/supplies').subscribe((res:any) => {
      this.supplies = res;
      console.log(this.supplies);
    })
   }

  ngOnInit(): void {
  }
  onCheckboxChange(option, event) {
    if ( event.target.checked ) { }
      this.ordersDataChecked.push(event.target); 
   console.log(this.ordersDataChecked);
   console.log(event.target);
 }
}