import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TrainService } from 'src/app/services/train.service';
import { Train } from '../model/train';

@Component({
  selector: 'app-train-details',
  templateUrl: './train-details.component.html',
  styleUrls: ['./train-details.component.css']
})
export class TrainDetailsComponent implements OnInit {

  train: Train = new Train();
  trainId: number = -1;

  constructor(private route: ActivatedRoute,
    private service: TrainService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params : Params) => {
      this.trainId = params['id'];
    })
    this.getOneTrain();
  }

  getOneTrain(): void {
    this.service.getOneTrain(this.trainId).subscribe({
      next: (data: Train) => {
        console.log(data);
        this.train = data;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
