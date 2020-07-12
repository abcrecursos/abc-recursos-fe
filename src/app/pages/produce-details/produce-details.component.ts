import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProducerService } from 'src/app/services/producer.service';

@Component({
  selector: 'app-produce-details',
  templateUrl: './produce-details.component.html',
  styleUrls: ['./produce-details.component.css'],
  providers: [ProducerService]
})
export class ProduceDetailsComponent implements OnInit {
  todoId: null;
  data:any;

  constructor(private route: ActivatedRoute, private serviceGetProducers: ProducerService) { }

  ngOnInit(): void {
    this.todoId = this.route.snapshot.params['id'];
    console.log(this.todoId);
    this.getProducers();
  }
  private getProducersById(todoId) {
    this.serviceGetProducers.getProducersRequest().subscribe((res: any) => {
    })
  }
  private getProducers() {
    this.serviceGetProducers.getProducersRequest().subscribe((res: any) => {
      res.forEach(element => {
        console.log(element._id);
        if(element._id == this.todoId){
          this.data = element;
          console.log(this.data);
        }
    });
    })
  }


}
