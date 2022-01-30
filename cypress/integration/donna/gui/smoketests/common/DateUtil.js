import moment from 'moment'
var tz = require("moment-timezone")
import uiHelper from "../common/UIHelper"
export default {
  getUTCDateByTimeZone: (inputDate) => {
    const timezone = "America/Vancouver";
    let aa = moment(inputDate, "MM/DD/YYYY");
    return aa.tz(timezone).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    //return moment.tz(aa, timezone).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  },
  getCurrentISODate: () => {
    return moment().toISOString();
    //return moment.tz(aa, timezone).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  },
  getUTCDate: (inputDate) => {
    const timezone = "Asia/Kolkata";
    //return moment(inputDate,"MM/DD/YYYY").utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    let aa = moment(inputDate, "MM/DD/YYYY");
    return aa.tz(timezone).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  },
  getTodaysDate: (timezone = null, useLocalTime = false) => {
    if (timezone && typeof timezone === 'string') {
      return useLocalTime ? moment().tz(timezone) : moment.utc().tz(timezone);
    }
    if (useLocalTime) {
      return moment();
    }
    return moment.utc();
  },
  filterBooked: (startOfCurrentDay, endOfCurrentDay) => key =>
    key !== 'average' && (key < endOfCurrentDay || key === startOfCurrentDay),

  filterEstimated: endOfCurrentDay => key => key !== 'average' && key >= endOfCurrentDay,

  filterStartOfDay: startOfCurrentDay => key => key !== 'average' && key !== startOfCurrentDay,
  typeofComparison: (a, b) => {
    if (typeof a === typeof b) return true;
    throw new Error(
      `The typeof the value '${a}' is different than the value '${b}', make sure that the array contains only equal type values`,
    );
  },
  sortAsc: (a, b) => (uiHelper.typeofComparison(a, b) && a > b ? 1 : -1),
  getFormattedDate: (date, format, timezone = null, useLocalTime = false) => {
    const hasTimezone = () => (useLocalTime ? parseDate(date, timezone) : getUTCDate(date, timezone));
    const dateToUse = timezone ? hasTimezone() : getDate(date);
    const DST = checkForDST(date, timezone);
    if (DST === 1 && useLocalTime) {
      dateToUse.subtract('1', 'hours');
    }
    if (DST === -1 && useLocalTime) {
      dateToUse.add('1', 'hours');
    }
    return dateToUse.format(format);
  }    
}
export const checkForDST = (date, timezone) => {
  if (date) {
    const isLocalDST = moment(date).isDST();
    const isSystemDST = getUTCDate(date, timezone).isDST();

    if (isSystemDST && !isLocalDST) return 1;
    if (!isSystemDST && isLocalDST) return -1;
  }
  return 0;
};
export const getUTCDate = (date, timezone = null, strict = false, format = undefined) => {
  const newDate = format ? moment.utc(date, format, strict) : moment.utc(date, strict);

  return timezone && typeof timezone === 'string' ? newDate.tz(timezone) : newDate;
};

export const parseDate = (date, timezone = null) =>
  (timezone ? moment.tz(date, timezone) : getDate(date));

export const getDate = (date, format = false, strict = false) =>
  (format ? moment(date, format, strict) : moment(date));