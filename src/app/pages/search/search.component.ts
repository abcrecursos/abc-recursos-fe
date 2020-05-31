import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TrackingService } from '../../services/tracking.service';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Effector } from 'src/app/models/effector-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {


  text: string;
  displayedColumns = ['cod', 'effectorId', 'priority', 'donations'];
  dataSource = new MatTableDataSource<Effector>();
  _tracking: any = {
    order: {}
  };
  existTrackingNumber = false;


  constructor(private activatedRoute: ActivatedRoute, private router: Router, private location: Location, private _trackingService: TrackingService) {
    this.dataSource.data.push(this.router.getCurrentNavigation().extras.state?.text);
    console.log(this.dataSource.data);
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {

    this._trackingService.getHealthCenter(Effector, this.dataSource.data).subscribe(
      tracking => {
        this._tracking = tracking;
        if (this._tracking.order.length != 0) {
          this.existTrackingNumber = true;
        }
        console.log(this._tracking);
      }
    );

  }
}
