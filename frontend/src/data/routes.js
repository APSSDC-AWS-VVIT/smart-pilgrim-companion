const rawRoutes = [
  { route_id: 'R001', source: 'Hyderabad', destination: 'Tirupati', travel_mode: 'Flight', duration: '1 Hour', estimated_cost: '₹3500-₹5500', notes: '4 daily flights' },
  { route_id: 'R002', source: 'Hyderabad', destination: 'Tirupati', travel_mode: 'Train', duration: '12 Hours', estimated_cost: '₹450-₹1200', notes: 'Narayanadri Express' },
  { route_id: 'R003', source: 'Hyderabad', destination: 'Tirupati', travel_mode: 'Bus', duration: '10 Hours', estimated_cost: '₹900-₹1400', notes: 'AC Sleeper' },
  { route_id: 'R004', source: 'Vijayawada', destination: 'Tirupati', travel_mode: 'Train', duration: '6.5 Hours', estimated_cost: '₹250-₹700', notes: 'Pinakini Express' },
  { route_id: 'R005', source: 'Vijayawada', destination: 'Tirupati', travel_mode: 'Bus', duration: '8 Hours', estimated_cost: '₹600-₹950', notes: 'APSRTC Express' },
  { route_id: 'R006', source: 'Visakhapatnam', destination: 'Tirupati', travel_mode: 'Flight', duration: '1.5 Hours', estimated_cost: '₹4500-₹7000', notes: 'Direct flight' },
  { route_id: 'R007', source: 'Visakhapatnam', destination: 'Tirupati', travel_mode: 'Train', duration: '14 Hours', estimated_cost: '₹550-₹1500', notes: 'Tirumala Express' },
  { route_id: 'R008', source: 'Visakhapatnam', destination: 'Tirupati', travel_mode: 'Bus', duration: '14 Hours', estimated_cost: '₹1200-₹1800', notes: 'Multi-axle sleeper' },
  { route_id: 'R009', source: 'Hyderabad', destination: 'Srisailam', travel_mode: 'Bus', duration: '6 Hours', estimated_cost: '₹400-₹700', notes: 'APSRTC/TGSRTC' },
  { route_id: 'R010', source: 'Hyderabad', destination: 'Srisailam', travel_mode: 'Private Car', duration: '4.5 Hours', estimated_cost: '₹4500-₹6000', notes: 'Via NH765' },
  { route_id: 'R011', source: 'Vijayawada', destination: 'Srisailam', travel_mode: 'Train + Bus', duration: '7.5 Hours', estimated_cost: '₹350-₹900', notes: 'Via Guntur/Markapur' },
  { route_id: 'R012', source: 'Vijayawada', destination: 'Srisailam', travel_mode: 'Bus', duration: '8.5 Hours', estimated_cost: '₹550-₹850', notes: 'Via Macherla' },
  { route_id: 'R013', source: 'Visakhapatnam', destination: 'Srisailam', travel_mode: 'Train + Bus', duration: '15 Hours', estimated_cost: '₹750-₹1800', notes: 'Via Markapur/Kurnool' },
  { route_id: 'R014', source: 'Hyderabad', destination: 'Srikalahasti', travel_mode: 'Train', duration: '11 Hours', estimated_cost: '₹400-₹1100', notes: 'Krishna Express' },
  { route_id: 'R015', source: 'Vijayawada', destination: 'Srikalahasti', travel_mode: 'Train', duration: '6 Hours', estimated_cost: '₹200-₹650', notes: 'Via Gudur Junction' },
  { route_id: 'R016', source: 'Visakhapatnam', destination: 'Srikalahasti', travel_mode: 'Train', duration: '13 Hours', estimated_cost: '₹500-₹1400', notes: 'Via Vijayawada and Gudur' },
  { route_id: 'R017', source: 'Hyderabad', destination: 'Srikalahasti', travel_mode: 'Bus', duration: '10-12 Hours', estimated_cost: '₹600-₹1200', notes: 'APSRTC/TSRTC' },
  { route_id: 'R018', source: 'Vijayawada', destination: 'Srikalahasti', travel_mode: 'Bus', duration: '7 Hours', estimated_cost: '₹500-₹800', notes: 'APSRTC' },
  { route_id: 'R019', source: 'Hyderabad', destination: 'Srikalahasti', travel_mode: 'Private Car', duration: '10-11 Hours', estimated_cost: '₹8000-₹15000', notes: 'Approx. 630 km' },
  { route_id: 'R020', source: 'Vijayawada', destination: 'Srikalahasti', travel_mode: 'Private Car', duration: '6-7 Hours', estimated_cost: '₹4000-₹8000', notes: 'Approx. 380 km' },
  { route_id: 'R021', source: 'Chennai', destination: 'Srikalahasti', travel_mode: 'Private Car', duration: '2.5-3 Hours', estimated_cost: '₹2500-₹4500', notes: 'Approx. 120 km' },
  { route_id: 'R022', source: 'Tirupati Airport', destination: 'Srikalahasti', travel_mode: 'Taxi', duration: '30-40 Minutes', estimated_cost: '₹600-₹1200', notes: 'Approx. 25 km' },
];

const destinationTempleMap = {
  Tirupati: 'T001',
  Srisailam: 'T002',
  Srikalahasti: 'T003',
};

export const routes = rawRoutes.map((route) => ({
  id: route.route_id,
  source: route.source,
  destination: route.destination,
  templeId: destinationTempleMap[route.destination],
  mode: route.travel_mode,
  duration: route.duration,
  estimatedCost: route.estimated_cost,
  notes: route.notes,
}));

export function getRoutesForTemple(templeId) {
  return routes.filter((route) => route.templeId === templeId);
}

export function getTopRoutes(limit = 6) {
  return routes.slice(0, limit);
}