import EventInterface from "../../@shared/event/event.interface";


export class CustomerCreatedEvent implements EventInterface {
  dateTimeOccurred: Date;
  eventData: any;

  constructor(data: any) {
    this.dateTimeOccurred = new Date();
    this.eventData = data;
  }
}