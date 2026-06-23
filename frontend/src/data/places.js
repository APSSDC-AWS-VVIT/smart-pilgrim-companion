const rawPlaces = [
  { place_id: 'P001', temple_id: 'T001', place_name: 'Papavinasam Waterfalls & Dam Reservoir', place_type: 'Waterfall', distance_from_temple: '5 km', description: 'Sacred waterfall and reservoir' },
  { place_id: 'P002', temple_id: 'T001', place_name: 'Chakra Theertham', place_type: 'Sacred Site', distance_from_temple: '2.8 km', description: 'Sacred rock valley with waterfall' },
  { place_id: 'P003', temple_id: 'T001', place_name: 'Sri Venugopala Swamy Temple', place_type: 'Temple', distance_from_temple: '3.9 km', description: 'Temple dedicated to Lord Krishna' },
  { place_id: 'P004', temple_id: 'T001', place_name: 'Silathoranam', place_type: 'Natural Formation', distance_from_temple: '1 km', description: 'Natural rock arch formation' },
  { place_id: 'P005', temple_id: 'T001', place_name: 'Srivari Padaalu', place_type: 'Viewpoint', distance_from_temple: '~2 km', description: 'Highest elevation peak with sacred footprints' },
  { place_id: 'P006', temple_id: 'T001', place_name: 'Sri Govindaraja Swamy Temple', place_type: 'Temple', distance_from_temple: '0.5 km (walking distance from station area)', description: 'Central Tirupati city temple' },
  { place_id: 'P007', temple_id: 'T001', place_name: 'Sri Kapileswara Swamy Temple', place_type: 'Temple', distance_from_temple: '~3 km', description: 'Shiva temple with waterfall pool' },
  { place_id: 'P008', temple_id: 'T001', place_name: 'Sri Venkateswara Zoological Park', place_type: 'Zoo', distance_from_temple: '~10 km', description: 'Open-moat zoological park' },
  { place_id: 'P009', temple_id: 'T001', place_name: 'Sri Srinivasa Mangapuram', place_type: 'Temple', distance_from_temple: '12 km', description: 'Sacred post-wedding stay site' },
  { place_id: 'P010', temple_id: 'T001', place_name: 'Chandragiri Fort', place_type: 'Historical Site', distance_from_temple: '11 km', description: 'Vijayanagara Empire fort' },
  { place_id: 'P011', temple_id: 'T002', place_name: 'Sakshi Ganapathi', place_type: 'Temple', distance_from_temple: '3 km before town', description: 'Pilgrimage stop' },
  { place_id: 'P012', temple_id: 'T002', place_name: 'Hatakeswaram', place_type: 'Temple', distance_from_temple: '~5 km', description: 'Temple site' },
  { place_id: 'P013', temple_id: 'T002', place_name: 'Paladhara Panchadhara', place_type: 'Nature Spot', distance_from_temple: '~4 km', description: 'Forest ravine trail' },
  { place_id: 'P014', temple_id: 'T002', place_name: 'Shikharam', place_type: 'Viewpoint', distance_from_temple: '~8 km', description: 'Highest point near Srisailam' },
  { place_id: 'P015', temple_id: 'T002', place_name: 'Pathala Ganga', place_type: 'River Access', distance_from_temple: '~2 km', description: 'Krishna River access point' },
  { place_id: 'P016', temple_id: 'T002', place_name: 'Akkamahadevi Caves', place_type: 'Cave', distance_from_temple: '16 km by boat', description: 'Cave pilgrimage destination' },
  { place_id: 'P017', temple_id: 'T002', place_name: 'Chenchu Lakshmi Tribal Museum', place_type: 'Museum', distance_from_temple: '~1 km', description: 'Tribal heritage museum' },
  { place_id: 'P018', temple_id: 'T003', place_name: 'Veyilingala Kona Waterfall', place_type: 'Waterfall', distance_from_temple: '8 km', description: 'Forest eco-trail waterfall' },
  { place_id: 'P019', temple_id: 'T003', place_name: 'Bharadwaja Tirtham', place_type: 'Sacred Water Body', distance_from_temple: '~2 km', description: 'Ancient spring reservoir' },
  { place_id: 'P020', temple_id: 'T003', place_name: 'Durgambika Temple', place_type: 'Temple', distance_from_temple: '~1 km', description: 'Hilltop shrine' },
  { place_id: 'P021', temple_id: 'T003', place_name: 'Pathala Vinayaka Temple', place_type: 'Temple', distance_from_temple: 'Northern Entrance', description: 'Underground Ganesha shrine' },
];

export const places = rawPlaces.map((place) => ({
  id: place.place_id,
  templeId: place.temple_id,
  name: place.place_name,
  type: place.place_type,
  distance: place.distance_from_temple,
  description: place.description,
}));

export function getPlacesForTemple(templeId) {
  return places.filter((place) => place.templeId === templeId);
}