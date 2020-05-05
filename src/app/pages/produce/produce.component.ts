import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { ProducerService } from 'src/app/services/producer.service';


@Component({
  selector: 'app-produce',
  templateUrl: './produce.component.html',
  styleUrls: ['./produce.component.css'],
  providers: [ProducerService]
})

export class ProduceComponent implements OnInit {
  
  displayedColumns: string[] = ['nombre','insumos', 'ciudad'];
  dataSource: any = [];
  

  @ViewChild(MatSort) sort: MatSort;
 
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private serviceGetProducers: ProducerService) { }

  ngOnInit(): void {
    this.getProducers();
  }

  private getProducers() {
    this.serviceGetProducers.getProducersRequest().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      console.log(res);
    })
  }

}