export interface College {
  id: string;
  name: string;
  state: string;
  district: string;
  city: string;
  type: 'government' | 'private' | 'aided';
  courses: string[];
  annualFees: number;
  totalFees: number;
  class10CutOff?: {
    board: string;
    percentage: number;
  };
  pucCutOff?: {
    stream: string;
    percentage: number;
    subjects?: string;
  };
  affiliation: string;
  accreditation?: string;
  facilities: string[];
  established: number;
  website?: string;
}

export const courseCategories = [
  { value: 'diploma', label: 'Diploma' },
  { value: 'iti', label: 'ITI' },
  { value: 'puc-science', label: 'PUC Science' },
  { value: 'puc-commerce', label: 'PUC Commerce' },
  { value: 'puc-arts', label: 'PUC Arts' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'medical', label: 'Medical' },
  { value: 'bsc', label: 'BSc' },
  { value: 'bcom', label: 'BCom' },
  { value: 'ba', label: 'BA' },
  { value: 'bca', label: 'BCA' },
  { value: 'bba', label: 'BBA' },
];

export const states = [
  { value: 'karnataka', label: 'Karnataka' },
  { value: 'maharashtra', label: 'Maharashtra' },
  { value: 'tamil-nadu', label: 'Tamil Nadu' },
  { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
  { value: 'delhi', label: 'Delhi' },
];

export const districts: Record<string, { value: string; label: string }[]> = {
  karnataka: [
    { value: 'bangalore-urban', label: 'Bangalore Urban' },
    { value: 'mysore', label: 'Mysore' },
    { value: 'mangalore', label: 'Mangalore' },
    { value: 'hubli-dharwad', label: 'Hubli-Dharwad' },
  ],
  maharashtra: [
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'pune', label: 'Pune' },
    { value: 'nagpur', label: 'Nagpur' },
  ],
  'tamil-nadu': [
    { value: 'chennai', label: 'Chennai' },
    { value: 'coimbatore', label: 'Coimbatore' },
    { value: 'madurai', label: 'Madurai' },
  ],
  'andhra-pradesh': [
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'visakhapatnam', label: 'Visakhapatnam' },
  ],
  delhi: [
    { value: 'new-delhi', label: 'New Delhi' },
    { value: 'south-delhi', label: 'South Delhi' },
  ],
};

export const collegesData: College[] = [
  // Karnataka - Government Colleges
  {
    id: '1',
    name: 'Government Polytechnic College',
    state: 'karnataka',
    district: 'bangalore-urban',
    city: 'Bangalore',
    type: 'government',
    courses: ['diploma'],
    annualFees: 8000,
    totalFees: 24000,
    class10CutOff: { board: 'State Board', percentage: 55 },
    affiliation: 'DTE Karnataka',
    accreditation: 'AICTE Approved',
    facilities: ['Library', 'Labs', 'Hostel', 'Placement Cell'],
    established: 1965,
  },
  {
    id: '2',
    name: 'Government ITI Bangalore',
    state: 'karnataka',
    district: 'bangalore-urban',
    city: 'Bangalore',
    type: 'government',
    courses: ['iti'],
    annualFees: 5000,
    totalFees: 10000,
    class10CutOff: { board: 'Any Board', percentage: 40 },
    affiliation: 'NCVT',
    facilities: ['Workshop', 'Library', 'Hostel'],
    established: 1958,
  },
  {
    id: '3',
    name: 'Government PU College Jayanagar',
    state: 'karnataka',
    district: 'bangalore-urban',
    city: 'Bangalore',
    type: 'government',
    courses: ['puc-science', 'puc-commerce', 'puc-arts'],
    annualFees: 3000,
    totalFees: 6000,
    class10CutOff: { board: 'State Board', percentage: 70 },
    affiliation: 'PUE Karnataka',
    accreditation: 'State Government',
    facilities: ['Library', 'Labs', 'Sports'],
    established: 1972,
  },
  {
    id: '4',
    name: 'University Visvesvaraya College of Engineering',
    state: 'karnataka',
    district: 'bangalore-urban',
    city: 'Bangalore',
    type: 'government',
    courses: ['engineering'],
    annualFees: 25000,
    totalFees: 100000,
    pucCutOff: { stream: 'Science', percentage: 85, subjects: 'PCM' },
    affiliation: 'Bangalore University',
    accreditation: 'NAAC A+, NBA',
    facilities: ['Library', 'Labs', 'Hostel', 'Placement Cell', 'Research Center'],
    established: 1917,
  },
  {
    id: '5',
    name: 'Bangalore Medical College',
    state: 'karnataka',
    district: 'bangalore-urban',
    city: 'Bangalore',
    type: 'government',
    courses: ['medical'],
    annualFees: 50000,
    totalFees: 250000,
    pucCutOff: { stream: 'Science', percentage: 90, subjects: 'PCB' },
    affiliation: 'Rajiv Gandhi University of Health Sciences',
    accreditation: 'MCI Approved',
    facilities: ['Hospital', 'Library', 'Labs', 'Hostel', 'Research Center'],
    established: 1955,
  },
  // Private Colleges
  {
    id: '6',
    name: 'RV College of Engineering',
    state: 'karnataka',
    district: 'bangalore-urban',
    city: 'Bangalore',
    type: 'private',
    courses: ['engineering'],
    annualFees: 225000,
    totalFees: 900000,
    pucCutOff: { stream: 'Science', percentage: 75, subjects: 'PCM' },
    affiliation: 'VTU',
    accreditation: 'NAAC A++, NBA',
    facilities: ['Library', 'Labs', 'Hostel', 'Placement Cell', 'Sports Complex', 'Incubation Center'],
    established: 1963,
    website: 'https://rvce.edu.in',
  },
  {
    id: '7',
    name: 'Christ PU College',
    state: 'karnataka',
    district: 'bangalore-urban',
    city: 'Bangalore',
    type: 'aided',
    courses: ['puc-science', 'puc-commerce', 'puc-arts'],
    annualFees: 45000,
    totalFees: 90000,
    class10CutOff: { board: 'CBSE/ICSE', percentage: 80 },
    affiliation: 'PUE Karnataka',
    accreditation: 'NAAC A++',
    facilities: ['Library', 'Labs', 'Sports', 'Auditorium'],
    established: 1969,
  },
  {
    id: '8',
    name: 'Mount Carmel College',
    state: 'karnataka',
    district: 'bangalore-urban',
    city: 'Bangalore',
    type: 'aided',
    courses: ['bsc', 'bcom', 'ba', 'bca'],
    annualFees: 55000,
    totalFees: 165000,
    pucCutOff: { stream: 'Any', percentage: 60 },
    affiliation: 'Bangalore University',
    accreditation: 'NAAC A+',
    facilities: ['Library', 'Labs', 'Hostel', 'Sports', 'Cultural Center'],
    established: 1948,
  },
  {
    id: '9',
    name: 'BMS College of Engineering',
    state: 'karnataka',
    district: 'bangalore-urban',
    city: 'Bangalore',
    type: 'aided',
    courses: ['engineering'],
    annualFees: 180000,
    totalFees: 720000,
    pucCutOff: { stream: 'Science', percentage: 70, subjects: 'PCM' },
    affiliation: 'VTU',
    accreditation: 'NAAC A, NBA',
    facilities: ['Library', 'Labs', 'Hostel', 'Placement Cell', 'Innovation Hub'],
    established: 1946,
  },
  {
    id: '10',
    name: 'Jain University',
    state: 'karnataka',
    district: 'bangalore-urban',
    city: 'Bangalore',
    type: 'private',
    courses: ['bsc', 'bcom', 'ba', 'bca', 'bba'],
    annualFees: 120000,
    totalFees: 360000,
    pucCutOff: { stream: 'Any', percentage: 55 },
    affiliation: 'Jain University',
    accreditation: 'NAAC A++',
    facilities: ['Library', 'Labs', 'Hostel', 'Sports Complex', 'Incubation Center'],
    established: 1990,
    website: 'https://jainuniversity.ac.in',
  },
  // Mysore Colleges
  {
    id: '11',
    name: 'NIE Mysore',
    state: 'karnataka',
    district: 'mysore',
    city: 'Mysore',
    type: 'aided',
    courses: ['engineering'],
    annualFees: 150000,
    totalFees: 600000,
    pucCutOff: { stream: 'Science', percentage: 65, subjects: 'PCM' },
    affiliation: 'VTU',
    accreditation: 'NAAC A, NBA',
    facilities: ['Library', 'Labs', 'Hostel', 'Placement Cell'],
    established: 1946,
  },
  {
    id: '12',
    name: 'Government Polytechnic Mysore',
    state: 'karnataka',
    district: 'mysore',
    city: 'Mysore',
    type: 'government',
    courses: ['diploma'],
    annualFees: 7500,
    totalFees: 22500,
    class10CutOff: { board: 'State Board', percentage: 50 },
    affiliation: 'DTE Karnataka',
    facilities: ['Library', 'Labs', 'Hostel'],
    established: 1960,
  },
  // Maharashtra Colleges
  {
    id: '13',
    name: 'IIT Bombay',
    state: 'maharashtra',
    district: 'mumbai',
    city: 'Mumbai',
    type: 'government',
    courses: ['engineering'],
    annualFees: 220000,
    totalFees: 880000,
    pucCutOff: { stream: 'Science', percentage: 95, subjects: 'PCM' },
    affiliation: 'IIT',
    accreditation: 'NAAC A++',
    facilities: ['Library', 'Labs', 'Hostel', 'Research Center', 'Sports Complex', 'Innovation Hub'],
    established: 1958,
    website: 'https://iitb.ac.in',
  },
  {
    id: '14',
    name: 'Fergusson College',
    state: 'maharashtra',
    district: 'pune',
    city: 'Pune',
    type: 'aided',
    courses: ['bsc', 'bcom', 'ba'],
    annualFees: 35000,
    totalFees: 105000,
    pucCutOff: { stream: 'Any', percentage: 60 },
    affiliation: 'Savitribai Phule Pune University',
    accreditation: 'NAAC A+',
    facilities: ['Library', 'Labs', 'Sports', 'Hostel'],
    established: 1885,
  },
  {
    id: '15',
    name: 'Government ITI Pune',
    state: 'maharashtra',
    district: 'pune',
    city: 'Pune',
    type: 'government',
    courses: ['iti'],
    annualFees: 4500,
    totalFees: 9000,
    class10CutOff: { board: 'Any Board', percentage: 35 },
    affiliation: 'NCVT',
    facilities: ['Workshop', 'Library'],
    established: 1962,
  },
  // Tamil Nadu Colleges
  {
    id: '16',
    name: 'Anna University',
    state: 'tamil-nadu',
    district: 'chennai',
    city: 'Chennai',
    type: 'government',
    courses: ['engineering'],
    annualFees: 45000,
    totalFees: 180000,
    pucCutOff: { stream: 'Science', percentage: 80, subjects: 'PCM' },
    affiliation: 'Anna University',
    accreditation: 'NAAC A++',
    facilities: ['Library', 'Labs', 'Hostel', 'Research Center', 'Placement Cell'],
    established: 1978,
    website: 'https://annauniv.edu',
  },
  {
    id: '17',
    name: 'Madras Christian College',
    state: 'tamil-nadu',
    district: 'chennai',
    city: 'Chennai',
    type: 'aided',
    courses: ['bsc', 'bcom', 'ba', 'bca'],
    annualFees: 40000,
    totalFees: 120000,
    pucCutOff: { stream: 'Any', percentage: 55 },
    affiliation: 'University of Madras',
    accreditation: 'NAAC A',
    facilities: ['Library', 'Labs', 'Sports', 'Hostel', 'Chapel'],
    established: 1837,
  },
  // Delhi Colleges
  {
    id: '18',
    name: 'Delhi University - Sri Ram College of Commerce',
    state: 'delhi',
    district: 'new-delhi',
    city: 'New Delhi',
    type: 'government',
    courses: ['bcom', 'bba'],
    annualFees: 25000,
    totalFees: 75000,
    pucCutOff: { stream: 'Commerce', percentage: 95 },
    affiliation: 'Delhi University',
    accreditation: 'NAAC A++',
    facilities: ['Library', 'Labs', 'Sports', 'Auditorium'],
    established: 1926,
    website: 'https://srcc.edu',
  },
  {
    id: '19',
    name: 'Lady Shri Ram College',
    state: 'delhi',
    district: 'south-delhi',
    city: 'New Delhi',
    type: 'government',
    courses: ['ba', 'bcom', 'bsc'],
    annualFees: 22000,
    totalFees: 66000,
    pucCutOff: { stream: 'Any', percentage: 90 },
    affiliation: 'Delhi University',
    accreditation: 'NAAC A++',
    facilities: ['Library', 'Labs', 'Sports', 'Hostel', 'Cultural Center'],
    established: 1956,
  },
  {
    id: '20',
    name: 'Netaji Subhas University of Technology',
    state: 'delhi',
    district: 'new-delhi',
    city: 'New Delhi',
    type: 'government',
    courses: ['engineering'],
    annualFees: 170000,
    totalFees: 680000,
    pucCutOff: { stream: 'Science', percentage: 88, subjects: 'PCM' },
    affiliation: 'NSUT',
    accreditation: 'NAAC A+, NBA',
    facilities: ['Library', 'Labs', 'Hostel', 'Placement Cell', 'Innovation Center'],
    established: 1983,
    website: 'https://nsut.ac.in',
  },
];

export const getEligibilityStatus = (
  college: College,
  studentClass: '10' | 'puc',
  percentage: number
): 'eligible' | 'borderline' | 'not-eligible' => {
  let cutOff: number | undefined;

  if (studentClass === '10' && college.class10CutOff) {
    cutOff = college.class10CutOff.percentage;
  } else if (studentClass === 'puc' && college.pucCutOff) {
    cutOff = college.pucCutOff.percentage;
  }

  if (!cutOff) return 'not-eligible';

  if (percentage >= cutOff) return 'eligible';
  if (percentage >= cutOff - 5) return 'borderline';
  return 'not-eligible';
};

export const formatFees = (amount: number): string => {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} Lakhs`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
};
