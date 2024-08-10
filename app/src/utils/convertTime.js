
import moment from 'moment';

export const formatDate = (timestamp) => {
  return moment(new Date(timestamp)).fromNow();
};

