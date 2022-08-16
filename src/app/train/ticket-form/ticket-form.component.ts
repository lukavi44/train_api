import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { TrainService } from 'src/app/services/train.service';
import { Ticket } from '../model/ticket';
import { Train } from '../model/train';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent implements OnInit {

@Input()
train: Train = new Train();
trainId: number = -1;
disabled: boolean = true;

@Input()
ticket: Ticket = new Ticket();

  constructor(private route: ActivatedRoute,
    private ticketService: TicketService,
    private trainService: TrainService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.trainId = params['id'];
    });
    this.getOne();
  }

  getOne(): void {
    this.trainService.getOneTrain(this.trainId).subscribe((data: any) => {
      this.ticket = data
    })
  }

  postRequest(): void {
    this.ticketService.postRequest(this.ticket).subscribe({
      next: (data: Ticket) => {
        if(!this.ticket.name || !this.ticket.birthDate) {
          alert("Niste uneli ime i datum rodjenja")
        }
        this.ticket.name = data.name;
        this.ticket.birthDate = data.birthDate;
      },
      error: (err: any) => alert(JSON.stringify(err)),
    });
  }
}
