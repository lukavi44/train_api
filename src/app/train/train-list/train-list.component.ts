import { Component, OnInit } from '@angular/core';
import { TrainService } from 'src/app/services/train.service';
import { Station } from '../model/station';
import { Train } from '../model/train';

@Component({
  selector: 'app-train-list',
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.css']
})
export class TrainListComponent implements OnInit {

  trains: Train[] = [];
  stations: Station[] = [];

  params = {
    sort: 'name',
    sortDirection: '',
    filter: {
      from: '',
      to: ''
    },
  };

  constructor(private service: TrainService) { }

  ngOnInit() {
    this.getAllTrains();
    this.getStations();
  }

  getAllTrains(): void {
    this.service.getAllTrains(this.params).subscribe({
      next: (data: Train[]) => {
        console.log(data);
        this.trains = data;
      },
      error: (err: any) => console.log(err),
    });
  };
  
  getStations(): void {
    this.service.getStations().subscribe({
      next: (data: Station[]) => {
        console.log(data);
        this.stations = data;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

}
