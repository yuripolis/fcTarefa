import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import Address from "../value-object/address";
import { CustomerAddressChangedEvent } from "./customer-address-changed.event";
import { CustomerCreatedEvent } from "./customer-created.event";
import { EnviaConsoleLog1Handler } from "./handlers/envia-console-log-1.handler";
import { EnviaConsoleLog2Handler } from "./handlers/envia-console-log-2.handler";
import { EnviaConsoleLogHandler } from "./handlers/envia-console-log-endereco.handler";

describe("Customer Domain Events", () => {
  let dispatcher: EventDispatcher;

  beforeEach(() => {
    dispatcher = new EventDispatcher();
  });

it("dispara ambos handlers no evento CustomerCreated", () => {
  const spy = jest.spyOn(console, "log").mockImplementation((msg) => {
    process.stdout.write(msg + "\n");
  });

  dispatcher.register("CustomerCreatedEvent", new EnviaConsoleLog1Handler());
  dispatcher.register("CustomerCreatedEvent", new EnviaConsoleLog2Handler());

  const customer = new Customer("123", "John Doe");
  dispatcher.notify(new CustomerCreatedEvent({ id: customer.id, name: customer.name }));

  expect(spy).toHaveBeenCalledWith("Esse é o primeiro console.log do evento: CustomerCreated");
  expect(spy).toHaveBeenCalledWith("Esse é o segundo console.log do evento: CustomerCreated");

  spy.mockRestore();
});

 it("dispara handler no evento CustomerAddressChanged", () => {
  const spy = jest.spyOn(console, "log").mockImplementation((msg) => {
    process.stdout.write(msg + "\n");
  });

  dispatcher.register("CustomerAddressChangedEvent", new EnviaConsoleLogHandler());

  const customer = new Customer("123", "John Doe");
  const address = new Address("Rua A", 123, "Cidade", "00000-000");
  customer.changeAddress(address);

  dispatcher.notify(new CustomerAddressChangedEvent({
    id: customer.id,
    name: customer.name,
    address: address.toString(),
  }));

  expect(spy).toHaveBeenCalledWith(
    `Endereço do cliente: 123, John Doe alterado para: ${address.toString()}`
  );

  spy.mockRestore();
});

});
