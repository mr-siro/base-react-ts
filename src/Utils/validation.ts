import * as Yup from 'yup';

export const maxMsg = (max: number) => `Vui lòng nhập tối đa ${max} kí tự`;
//* regex email
export const MailRegExp = /^[\w-.+]+@([\w-]+\.)+[\w-]{2,4}$/g;

export const stringRequiredTrim = ({ required = 'required' }) =>
  Yup.string().required(required).trim(required);

export const stringRequired = ({ required = 'required' }) =>
  Yup.string().required(required);

export const emailValidation = ({
  email = 'Vui lòng nhập địa chỉ email hợp lệ',
  required = 'required',
}) => stringRequiredTrim({ required }).email(email).max(100, maxMsg(100)).matches(MailRegExp, email);