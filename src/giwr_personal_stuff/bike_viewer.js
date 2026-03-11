import React from 'react';
import { useLocation } from 'react-router-dom';

const BikeDetails = () => {
  const location = useLocation();
  const { bike } = location.state;

  return (
    <div className="p-10">
      <h1 className="text-4xl mb-6">{bike.name}</h1>
      <img src={bike.image} alt={bike.name} className="w-full h-auto mb-6" />
      <p className="text-lg mb-4">{bike.description}</p>
      <ul className="list-disc pl-6">
        <li>Price: {bike.price}</li>
        <li>Range: {bike.range}</li>
        <li>Max Speed: {bike.maxSpeed}</li>
        <li>Charging Time: {bike.chargingTime}</li>
        <li>Dimension: {bike.dimension}</li>
        <li>Wheelbase: {bike.wheelbase}</li>
        <li>Weight: {bike.weight}</li>
        <li>Packing Weight: {bike.packing_weight}</li>
        <li>Ground Clearance: {bike.ground_clearance}</li>
        <li>Sitting Height: {bike.sitting_height}</li>
        <li>Fuel Tank Capacity: {bike.fuel_tank_capacity}</li>
        <li>Start Mode: {bike.start_mode}</li>
        <li>Gear Number: {bike.gear_number}</li>
        <li>Fuel Consumption: {bike.fuel_consumption}</li>
        <li>Brake System: {bike.brake_system}</li>
        <li>Tire Size: {bike.tire_size}</li>
        <li>Extra Stuff: {bike.extra_stuff}</li>
        <li>Features:</li>
        <ul className="list-disc pl-6">
          {bike.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </ul>
      <h1 className="text-4xl mb-6">{bike.extra_stuff}</h1>
      <img src={bike.extra_image}className="w-full h-auto mb-6" />
    </div>
  );
};

export default BikeDetails;