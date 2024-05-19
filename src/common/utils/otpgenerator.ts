import * as moment from 'moment';

export const GenerateOtp = () => {
  const otp = '123456';
  // const otp = Math.floor(100000 + Math.random() * 900000);
  let expiry = moment().add(10, 'm').toDate();

  return { otp, expiry };
};
