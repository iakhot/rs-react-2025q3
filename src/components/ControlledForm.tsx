import { useForm, type SubmitHandler } from 'react-hook-form';
import {
  CountryValues,
  type Country,
  type Genders,
  type FormData,
} from '../types';
import { GenderValues } from '../types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useFormStore } from '../store';
import { convertToBase64 } from '../utils';

const schema = yup
  .object({
    name: yup
      .string()
      .matches(/^[A-Z]/, 'Name must start with an uppercase letter'),
    age: yup.number().positive('Age should be positive'),
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

type FormSchema = yup.InferType<typeof schema>;

function ControlledForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormSchema>({ resolver: yupResolver(schema) });
  const submitData = useFormStore((state) => state.receiveData);
  const result = useFormStore((state) => state.forms);

  const onSubmit: SubmitHandler<FormSchema> = async (data: FormSchema) => {
    //console.log(data);
    let encodedImg = '';
    if (data.picture) {
      const file = (data.picture as FileList).item(0);
      if (file) {
        encodedImg = await convertToBase64(file);
      }
    }
    const newData: FormData = {
      name: data.name,
      age: data.age,
      password: data.password, /// TODO: encrypt
      email: data.email,
      gender: data.gender as Genders,
      country: data.country as Country,
      image: encodedImg,
    };
    submitData('controlled-form', newData);
  };

  return (
    <>
      {isSubmitSuccessful ? <p>Submitted! {JSON.stringify(result)}</p> : null}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
        <div className=" md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label htmlFor="name-input">Name: </label>
          </div>
          <div className="md:w-2/3">
            <input id="name-input" {...register('name')} />
            <p>{errors.name?.message}</p>
          </div>
        </div>
        <div className=" md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label htmlFor="age-input">Age: </label>
          </div>
          <div className="md:w-2/3">
            <input id="age-input" {...register('age')} />
            <p>{errors.age?.message}</p>
          </div>
        </div>
        <div className=" md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label htmlFor="email-input">E-mail: </label>
          </div>
          <div className="md:w-2/3">
            <input id="email-input" {...register('email')} />
            <p>{errors.email?.message}</p>
          </div>
        </div>
        <hr className="my-8 h-px bg-gray-300 border-0 dark:bg-gray-700"></hr>
        <div className=" md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label htmlFor="pwd-input">Password: </label>
          </div>
          <div className="md:w-2/3">
            <input id="pwd-input" {...register('password')} />
            <p>{errors.password?.message}</p>
          </div>
        </div>
        <div className=" md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label htmlFor="pwd-conf-input">Confirm Password: </label>
          </div>
          <div className="md:w-2/3">
            <input id="pwd-conf-input" {...register('confirmPassword')} />
            <p>{errors.confirmPassword?.message}</p>
          </div>
        </div>
        <hr className="my-8 h-px bg-gray-300 border-0 dark:bg-gray-700"></hr>
        <div className=" md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label htmlFor="gender-input">Gender: </label>
          </div>
          <div id="gender-input" className="md:w-2/3 flex">
            {GenderValues.map((val) => {
              return (
                <div key={val}>
                  <input
                    type="radio"
                    {...register('gender')}
                    value={val}
                    className="mr-2 leading-tight"
                  />
                  <span className="mr-2">{val}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className=" md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label htmlFor="pwd-conf-input">Picture: </label>
          </div>
          <div className="md:w-2/3">
            <input
              id="picture-input"
              type="file"
              accept=".png, .jpg, .jpeg"
              {...register('picture')}
            />
            <p>{errors.picture?.message}</p>
          </div>
        </div>
        <div className=" md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label htmlFor="country-input">Country: </label>
          </div>
          <div className="md:w-2/3">
            <select id="country-input" {...register('country')}>
              {CountryValues.map((val) => {
                return (
                  <option key={val} value={val}>
                    {val}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className=" md:flex md:items-center mb-6">
          <label
            htmlFor="accept-terms"
            className="md:w-2/3 block text-gray-500 font-bold"
          >
            <input
              className="mr-2 leading-tight"
              id="accept-terms"
              type="checkbox"
              {...register('accepted')}
            />
            <span className="text-sm">Accept Terms and Conditions</span>
          </label>
        </div>

        <button className="disabled:bg-red-900 bg-blue-900" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default ControlledForm;
