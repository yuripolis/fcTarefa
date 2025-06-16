import EventInterface from "../../@shared/event/event.interface";

export class CustomerAddressChangedEvent implements EventInterface {
  dateTimeOccurred: Date;
  eventData: { id: string; name: string; address: string };

  constructor(eventData: { id: string; name: string; address: string }) {
    this.dateTimeOccurred = new Date();
    this.eventData = eventData;
  }
  }