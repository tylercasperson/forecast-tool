import {
  min,
  max,
  eachYearOfInterval,
  eachQuarterOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  differenceInDays,
} from 'date-fns';

export const monthList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const daysPerMonth = {
  January: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31,
  ],
  February: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28,
  ],
  FebruaryLeapYear: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29,
  ],
  March: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31,
  ],
  April: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30,
  ],
  May: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31,
  ],
  June: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30,
  ],
  July: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31,
  ],
  August: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31,
  ],
  September: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30,
  ],
  October: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31,
  ],
  November: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30,
  ],
  December: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31,
  ],
};

export const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const monthCode = {
  January: 5,
  February: 1,
  March: 1,
  April: 4,
  May: 6,
  June: 2,
  July: 4,
  August: 0,
  September: 3,
  October: 5,
  November: 1,
  December: 3,
};

export const centuryCode = {
  1800: 3,
  1900: 1,
  2000: 0,
  2100: 5,
  2200: 3,
  2300: 1,
  2400: 0,
};
export const digityearCode = {
  0: ['05', '11', '16', '22', '23', '39', '44', '50', '61', '67', '72', '78', '89', '95'],
  1: ['00', '06', '17', '23', '28', '34', '45', '51', '56', '62', '73', '79', '84', '90'],
  2: ['01', '07', '12', '18', '29', '35', '40', '46', '57', '63', '68', '74', '85', '91', '96'],
  3: ['02', '13', '19', '24', '30', '41', '47', '52', '58', '69', '75', '80', '86', '97'],
  4: ['03', '08', '14', '25', '31', '36', '42', '53', '59', '64', '70', '81', '87', '92', '98'],
  5: ['09', '15', '20', '26', '37', '43', '48', '54', '65', '71', '76', '82', '93', '99'],
  6: ['04', '10', '21', '27', '32', '38', '49', '55', '60', '66', '77', '83', '88', '94'],
};

export const dateFormat = (date) => {
  let dateParts = date.split('T')[0].split('-');
  let month = dateParts[1][0] === '0' ? dateParts[1][1] : dateParts[1];
  let day = dateParts[2][0] === '0' ? dateParts[2][1] : dateParts[2];
  let year = dateParts[0];

  return month + '/' + day + '/' + year;
};

export const groupFrequency = (firstLetter, startDate, endDate) => {
  const firstDate = min([new Date(startDate), new Date(endDate)]);
  const secondDate = max([new Date(startDate), new Date(endDate)]);
  let dateRange = { start: firstDate, end: secondDate };
  let occurrences;

  switch (firstLetter) {
    case 'Y':
    case 'y':
      occurrences = eachYearOfInterval(dateRange).length;
      break;
    case 'Q':
    case 'q':
      occurrences = eachQuarterOfInterval(dateRange).length;
      break;
    case 'M':
    case 'm':
      occurrences = eachMonthOfInterval(dateRange).length;
      break;
    case 'W':
    case 'w':
      occurrences = eachWeekOfInterval(dateRange).length;
      break;
    default:
      occurrences = differenceInDays(secondDate, firstDate).length;
      break;
  }
  let dayEquivalent = Math.ceil(differenceInDays(secondDate, firstDate) / occurrences);

  return { occurrences, dayEquivalent };
};
