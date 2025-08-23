import * as yup from 'yup';
export const schema = yup
  .object({
    name: yup
      .string()
      .matches(/^[A-Z]/, 'Name must start with an uppercase letter'),
    age: yup
      .number()
      .typeError('Age should be a number')
      .positive('Age should be positive'),
    email: yup.string().email('Invalid email format'),
    password: yup
      .string()
      .min(4, 'Password should be at least 4 characters long')
      .matches(/[A-Z]/, 'Password should contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password should contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password should contain at least one number')
      .matches(
        /[^a-zA-Z0-9]/,
        'Password should contain at least one special character'
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Passwords should match'),
    picture: yup
      .mixed()
      .test('fileFormat', 'File extension should be png or jpeg', (value) => {
        const files = value as FileList;
        if (files.length == 0) return true;
        return ['image/jpeg', 'image/jpg', 'image/png'].includes(files[0].type);
      })
      .test('fileSize', 'File size should be less than 1.5MB', (value) => {
        const files = value as FileList;
        if (files.length == 0) return true;
        return files[0] && files[0].size <= 1_500_000;
      })
      .optional(),
    gender: yup.string().optional(),
    country: yup.string().optional(),
    accepted: yup
      .boolean()
      .test('AcceptT&C', 'Please, accept T&C', (value) => value)
      .required(),
  })
  .required();
