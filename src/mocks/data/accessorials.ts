import { Accessorial } from "../../services/accessorialsApi";

export const accessorials: Accessorial[] = [
  {
    chargeDescription: "Appointment Fee",
    charge: 21.0,
    unit: "$/Shipment",
    min: 0.0,
    max: 0.0,
  },
  {
    chargeDescription: "Inside Pickup or Delivery",
    charge: 4.5,
    unit: "$/CWT",
    min: 60.0,
    max: 400.0,
  },
  {
    chargeDescription: "Lift Gate Pickup or Delivery",
    charge: 4.0,
    unit: "$/CWT",
    min: 60.0,
    max: 250.0,
  },
  {
    chargeDescription: "Limited Access Pickup or Delivery",
    charge: 4.5,
    unit: "$/CWT",
    min: 100.0,
    max: 450.0,
  },
  {
    chargeDescription: "Residential Delivery",
    charge: 4.5,
    unit: "$/CWT",
    min: 60.0,
    max: 400.0,
  },
  {
    chargeDescription: "Sort and Segregate",
    charge: 0.7,
    unit: "$/Piece",
    min: 50.0,
    max: 99999.99,
  },
  {
    chargeDescription: "Flat Accessorial 1",
    charge: 0.0,
    unit: "$/Shipment",
    min: 0.0,
    max: 0.0,
  },
  {
    chargeDescription: "Flat Accessorial 2",
    charge: 0.0,
    unit: "$/Shipment",
    min: 0.0,
    max: 0.0,
  },
  {
    chargeDescription: "% Based Accessorial 1",
    charge: 0.0,
    unit: "%/Net",
    min: 0.0,
    max: 0.0,
  },
  {
    chargeDescription: "% Based Accessorial 2",
    charge: 0.0,
    unit: "%/Net",
    min: 0.0,
    max: 0.0,
  },
];
