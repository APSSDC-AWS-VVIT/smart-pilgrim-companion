const rawSchedules = [
  { schedule_id: 'S001', temple_id: 'T001', activity: 'Sri Govindaraja Swamy Temple', start_time: '8:00 AM', end_time: '9:30 AM', notes: 'Day 1 Tirupati tour' },
  { schedule_id: 'S002', temple_id: 'T001', activity: 'Sri Kapileswara Swamy Temple', start_time: '9:45 AM', end_time: '11:15 AM', notes: 'Day 1 Tirupati tour' },
  { schedule_id: 'S003', temple_id: 'T001', activity: 'Sri Venkateswara Zoological Park', start_time: '11:35 AM', end_time: '2:35 PM', notes: 'Day 1 Tirupati tour' },
  { schedule_id: 'S004', temple_id: 'T001', activity: 'Sri Srinivasa Mangapuram', start_time: '2:50 PM', end_time: '4:20 PM', notes: 'Day 1 Tirupati tour' },
  { schedule_id: 'S005', temple_id: 'T001', activity: 'Chandragiri Fort & Laser Show', start_time: '4:30 PM', end_time: '8:00 PM', notes: 'Day 1 Tirupati tour' },
  { schedule_id: 'S006', temple_id: 'T001', activity: 'Papavinasam Waterfalls', start_time: '8:00 AM', end_time: '9:30 AM', notes: 'Day 3 sightseeing' },
  { schedule_id: 'S007', temple_id: 'T001', activity: 'Chakra Theertham', start_time: '9:45 AM', end_time: '11:00 AM', notes: 'Day 3 sightseeing' },
  { schedule_id: 'S008', temple_id: 'T001', activity: 'Sri Venugopala Swamy Temple', start_time: '11:05 AM', end_time: '11:50 AM', notes: 'Day 3 sightseeing' },
  { schedule_id: 'S009', temple_id: 'T001', activity: 'Silathoranam', start_time: '11:55 AM', end_time: '12:40 PM', notes: 'Day 3 sightseeing' },
  { schedule_id: 'S010', temple_id: 'T001', activity: 'Srivari Padaalu', start_time: '12:55 PM', end_time: '2:00 PM', notes: 'Day 3 sightseeing' },
  { schedule_id: 'S011', temple_id: 'T002', activity: 'Sakshi Ganapathi', start_time: '9:00 AM', end_time: '9:00 AM', notes: 'Day 1' },
  { schedule_id: 'S012', temple_id: 'T002', activity: 'Hatakeswaram', start_time: '10:00 AM', end_time: '11:30 AM', notes: 'Day 1' },
  { schedule_id: 'S013', temple_id: 'T002', activity: 'Paladhara Panchadhara', start_time: '10:47 AM', end_time: '12:45 PM', notes: 'Day 1' },
  { schedule_id: 'S014', temple_id: 'T002', activity: 'Shikharam', start_time: '12:30 PM', end_time: '2:00 PM', notes: 'Day 1' },
  { schedule_id: 'S015', temple_id: 'T002', activity: 'Pathala Ganga', start_time: '7:00 AM', end_time: '8:00 AM', notes: 'Day 2' },
  { schedule_id: 'S016', temple_id: 'T002', activity: 'Krishna River Motorboat Cruise', start_time: '8:00 AM', end_time: '9:00 AM', notes: 'Day 2' },
  { schedule_id: 'S017', temple_id: 'T002', activity: 'Akkamahadevi Caves', start_time: '9:00 AM', end_time: '11:30 AM', notes: 'Day 2' },
  { schedule_id: 'S018', temple_id: 'T002', activity: 'Return Cruise & Ascent', start_time: '11:30 AM', end_time: '12:30 PM', notes: 'Day 2' },
  { schedule_id: 'S019', temple_id: 'T002', activity: 'Lunch', start_time: '12:45 PM', end_time: '1:45 PM', notes: 'Day 2' },
  { schedule_id: 'S020', temple_id: 'T002', activity: 'Chenchu Lakshmi Tribal Museum', start_time: '2:00 PM', end_time: '3:00 PM', notes: 'Day 2' },
  { schedule_id: 'S021', temple_id: 'T002', activity: 'Checkout', start_time: '3:00 PM', end_time: '3:30 PM', notes: 'Day 2' },
  { schedule_id: 'S022', temple_id: 'T003', activity: 'Veyilingala Kona Waterfall', start_time: '9:00 AM', end_time: '11:30 AM', notes: 'Day 1' },
  { schedule_id: 'S023', temple_id: 'T003', activity: 'Bharadwaja Tirtham', start_time: '12:00 PM', end_time: '1:00 PM', notes: 'Day 1' },
  { schedule_id: 'S024', temple_id: 'T003', activity: 'Lunch & Market Walk', start_time: '1:10 PM', end_time: '2:30 PM', notes: 'Day 1' },
  { schedule_id: 'S025', temple_id: 'T003', activity: 'Durgambika Temple', start_time: '2:45 PM', end_time: '4:00 PM', notes: 'Day 1' },
  { schedule_id: 'S026', temple_id: 'T003', activity: 'Pathala Vinayaka Temple', start_time: '4:15 PM', end_time: '5:15 PM', notes: 'Day 1' },
  { schedule_id: 'S027', temple_id: 'T003', activity: 'Ticket Verification', start_time: '6:30 AM', end_time: '7:00 AM', notes: 'Day 2' },
  { schedule_id: 'S028', temple_id: 'T003', activity: 'Rahu-Ketu Puja', start_time: '7:00 AM', end_time: '8:30 AM', notes: 'Day 2' },
  { schedule_id: 'S029', temple_id: 'T003', activity: 'Sri Kalahasteeswara Darshan', start_time: '8:30 AM', end_time: '9:30 AM', notes: 'Day 2' },
  { schedule_id: 'S030', temple_id: 'T003', activity: 'Gnana Prasunambika Darshan', start_time: '9:30 AM', end_time: '10:15 AM', notes: 'Day 2' },
  { schedule_id: 'S031', temple_id: 'T003', activity: 'Temple Exit', start_time: '10:30 AM', end_time: '10:30 AM', notes: 'Day 2' },
];

export const schedules = rawSchedules.map((schedule) => ({
  id: schedule.schedule_id,
  templeId: schedule.temple_id,
  activity: schedule.activity,
  startTime: schedule.start_time,
  endTime: schedule.end_time,
  notes: schedule.notes,
}));

export function getSchedulesForTemple(templeId) {
  return schedules.filter((schedule) => schedule.templeId === templeId);
}