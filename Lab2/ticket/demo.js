const myMod = require("./modules/module.js");

let MyInfo = myMod.FlightTickets;

let passenger1 = new MyInfo();
let passenger2 = new MyInfo();

passenger1.addItem(1, 4000, "SWE", "USA", "05/04/2021");
passenger2.addItem(2, 6000, "Ksa", "EGY", "01/05/2021");

passenger1.updateTicketInfo(1, {
  deptAirport: "Egypt",
  arrivalAirport: "KSA",
  travelDate: "01/05/2021",
});

console.log(passenger1.getFlightInfo());
