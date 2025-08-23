import { useForm, type SubmitHandler } from 'react-hook-form';
import {
  CountryValues,
  type Country,
  type Genders,
  type FormData,
  ModalContext,
} from '../common/types';
import { GenderValues } from '../common/types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useFormStore } from '../common/store';
import { convertToBase64 } from '../common/utils';
import { useContext, useEffect } from 'react';
import InputWrapper from './common/InputWrapper';
import { schema } from '../common/validationSchema';
import RadioWrapper from './common/RadioWrapper';
import CheckboxWrapper from './common/CheckboxWrapper';

type FormSchema = yup.InferType<typeof schema>;

function ControlledForm() {
  const { handleClose } = useContext(ModalContext);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({ resolver: yupResolver(schema) });
  const submitData = useFormStore((state) => state.receiveData);
  const resetData = useFormStore((state) => state.resetData);

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

    reset();
    handleClose();
  };

  useEffect(() => {
    resetData('controlled-form');
  }, []);

  return (
    <>
      <h2>Controlled Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
        <InputWrapper label="Name" error={errors.name?.message}>
          <input id="name-input" {...register('name')} />
        </InputWrapper>
        <InputWrapper label="Age" error={errors.age?.message}>
          <input id="age-input" {...register('age')} />
        </InputWrapper>
        <InputWrapper label="Email" error={errors.email?.message}>
          <input id="email-input" {...register('email')} />
        </InputWrapper>
        <hr className="my-8 h-px bg-gray-300 border-0 dark:bg-gray-700"></hr>
        <InputWrapper label="Password" error={errors.password?.message}>
          <input id="pwd-input" {...register('password')} type="password" />
        </InputWrapper>
        <InputWrapper label="Confirm password" error={errors.password?.message}>
          <input
            id="pwd-conf-input"
            {...register('confirmPassword')}
            type="password"
          />
        </InputWrapper>
        <hr className="my-8 h-px bg-gray-300 border-0 dark:bg-gray-700"></hr>
        <RadioWrapper label="Gender">
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
        </RadioWrapper>
        <InputWrapper label="Picture" error={errors.picture?.message}>
          <input
            id="picture-input"
            type="file"
            accept=".png, .jpg, .jpeg"
            {...register('picture')}
          />
        </InputWrapper>
        <InputWrapper label="Country">
          <select id="country-input" {...register('country')}>
            {CountryValues.map((val) => {
              return (
                <option key={val} value={val}>
                  {val}
                </option>
              );
            })}
          </select>
        </InputWrapper>
        <CheckboxWrapper label="Accept Terms & Conditions">
          <input
            className="mr-2 leading-tight"
            id="accept-terms"
            type="checkbox"
            {...register('accepted')}
          />
        </CheckboxWrapper>

        <button className="disabled:bg-red-900 bg-blue-900" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default ControlledForm;
