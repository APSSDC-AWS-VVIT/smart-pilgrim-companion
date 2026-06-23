import { getTempleImage } from './imagePaths';

const rawTemples = [
  {
    temple_id: 'T001',
    temple_name: 'Tirumala',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    location: 'Tirumala Hills',
    description: 'Major Hindu pilgrimage destination centered around Sri Venkateswara Swamy Temple',
    history: 'Ancient Vaishnavite pilgrimage center',
    opening_time: '2:30 AM',
    closing_time: '1:00 AM',
    best_visit_time: 'Early Morning',
    speciality: 'Lord Venkateswara Temple, Arjitha Sevas, Laddu Prasadam',
    contact_info: '155257',
    website: 'https://www.tirumala.org',
    notes: 'Temple details from PDF; timings/contact/website from official sources',
  },
  {
    temple_id: 'T002',
    temple_name: 'Srisailam',
    state: 'Andhra Pradesh',
    district: 'Nandyal',
    location: 'Nallamala Hill Range',
    description: 'Pilgrimage destination located atop the Nallamala Hills',
    history: 'Ancient Shaivite pilgrimage center',
    opening_time: '4:30 AM',
    closing_time: '10:00 PM',
    best_visit_time: 'Morning',
    speciality: 'Sri Mallikarjuna Jyotirlinga and Bhramaramba Devi Temple',
    contact_info: '8333901351',
    website: 'https://www.srisailadevasthanam.org',
    notes: 'Temple details from PDF; timings/contact/website from official sources',
  },
  {
    temple_id: 'T003',
    temple_name: 'Srikalahasti',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    location: 'Srikalahasti',
    description: 'Accessible Shaivite pilgrimage destination in South India',
    history: 'Famous temple associated with Rahu-Ketu worship',
    opening_time: '5:30 AM',
    closing_time: '9:00 PM',
    best_visit_time: 'Morning',
    speciality: 'Rahu-Ketu Puja, Vayu Linga (Panchabhoota Sthalam)',
    contact_info: '08578-222240',
    website: 'https://srikalahasthitemple.org',
    notes: 'Temple details from PDF; timings/contact/website from official sources',
  },
];

export const temples = rawTemples.map((temple) => ({
  id: temple.temple_id,
  name: temple.temple_name,
  state: temple.state,
  district: temple.district,
  location: temple.location,
  description: temple.description,
  history: temple.history,
  openingTime: temple.opening_time,
  closingTime: temple.closing_time,
  bestVisitTime: temple.best_visit_time,
  speciality: temple.speciality,
  contactInfo: temple.contact_info,
  website: temple.website,
  notes: temple.notes,
  image: getTempleImage(temple.temple_id),
}));

export function getTempleById(templeId) {
  return temples.find((temple) => temple.id === templeId) || null;
}