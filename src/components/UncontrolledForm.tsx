import {
  CountryValues,
  GenderValues,
  ModalContext,
  type Country,
  type Genders,
} from '../common/types';
import { schema, type FormSchema } from '../common/validationSchema';
import CheckboxWrapper from './common/CheckboxWrapper';
import InputWrapper from './common/InputWrapper';
import type { FormData, FormErrors } from '../common/types';
import { useContext, useRef, useState, type FormEvent } from 'react';
import { convertToBase64 } from '../common/utils';
import RadioWrapper from './common/RadioWrapper';
import { useFormStore } from '../common/store';

const country_placeholder = 'Choose country';

function UncontrolledForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const pwdConfirmRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const acceptRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [errors, setErrors] = useState<FormErrors>({});
  const submitData = useFormStore((state) => state.receiveData);
  const { handleClose } = useContext(ModalContext);

  const handleReset = () => {
    if (nameRef.current) nameRef.current.value = '';
    if (ageRef.current) ageRef.current.value = '';
    if (pwdRef.current) pwdRef.current.value = '';
    if (pwdConfirmRef.current) pwdConfirmRef.current.value = '';
    if (emailRef.current) emailRef.current.value = '';
    if (countryRef.current) countryRef.current.value = '';
  };

  const prepareSubmit = async (data: FormSchema): Promise<FormData> => {
    let encodedImg = '';
    if (data.picture) {
      const file = (data.picture as FileList).item(0);
      if (file) {
        encodedImg = await convertToBase64(file);
      }
    }
    const country =
      data.country == country_placeholder ? undefined : data.country;
    const newData: FormData = {
      name: data.name,
      age: data.age,
      password: data.password,
      email: data.email,
      gender: data.gender as Genders,
      country: country as Country,
      image: encodedImg,
    };
    return newData;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    if (formRef.current) {
      const form = new FormData(formRef.current);
      const gender = form.get('gender');

      const newData: FormSchema = {
        name: nameRef.current?.value,
        age: ageRef.current ? Number(ageRef.current.value) : undefined,
        password: pwdRef.current?.value, /// TODO: encrypt
        email: emailRef.current?.value,
        gender: gender as Genders,
        country: countryRef.current?.value as Country,
        picture: pictureRef.current?.files
          ? pictureRef.current?.files
          : undefined,
        accept: acceptRef.current ? acceptRef.current.checked : false,
      };

      await schema
        .validate(newData, { abortEarly: false })
        .then(async (validatedData) => {
          const update = await prepareSubmit(validatedData);
          submitData('uncontrolled-form', update);
          console.log(update);

          handleReset();
          handleClose();
        })
        .catch(async (errors) => {
          const messages = errors.errors as string[];
          console.log(`Validation errors: ${errors}`);
          if (messages) {
            const parsed: FormErrors = {};
            for (const key in newData) {
              const message = messages
                .filter((m: string) => m.toLowerCase().startsWith(key))
                .join('\r\n');
              parsed[key as keyof FormErrors] = { message: message };
            }
            setErrors(parsed);
          }
        });
    }
  };
  return (
    <>
      <h2 className="mb-6 font-medium">Uncontrolled Form</h2>
      <form
        onSubmit={onSubmit}
        ref={formRef}
        aria-label="uncontrolled-form"
        className="w-full max-w-sm"
      >
        <InputWrapper label="Name" error={errors.name?.message}>
          <input id="name-input" ref={nameRef} />
        </InputWrapper>
        <InputWrapper label="Age" error={errors.age?.message}>
          <input id="age-input" ref={ageRef} />
        </InputWrapper>
        <InputWrapper label="Email" error={errors.email?.message}>
          <input id="email-input" ref={emailRef} />
        </InputWrapper>
        <hr className="my-8 h-px bg-gray-300 border-0 dark:bg-gray-700"></hr>
        <InputWrapper label="Password" error={errors.password?.message}>
          <input id="pwd-input" type="password" ref={pwdRef} />
        </InputWrapper>
        <InputWrapper
          label="Confirm password"
          error={errors.confirmPassword?.message}
        >
          <input id="pwd-conf-input" type="password" ref={pwdConfirmRef} />
        </InputWrapper>
        <hr className="my-8 h-px bg-gray-300 border-0 dark:bg-gray-700"></hr>
        <RadioWrapper label="Gender" error={errors.gender?.message}>
          <div ref={genderRef} className="flex flex-row">
            {GenderValues.map((val) => {
              return (
                <div key={val}>
                  <input
                    name="gender"
                    type="radio"
                    value={val}
                    className="mr-2 leading-tight"
                  />
                  <span className="mr-2">{val}</span>
                </div>
              );
            })}
          </div>
        </RadioWrapper>
        <InputWrapper label="Picture" error={errors.picture?.message}>
          <input
            id="picture-input"
            type="file"
            accept=".png, .jpg, .jpeg"
            ref={pictureRef}
          />
        </InputWrapper>
        <InputWrapper label="Country">
          <select id="country-input" ref={countryRef}>
            <option key="empty" value={undefined} disabled selected hidden>
              {country_placeholder}
            </option>
            {CountryValues.map((val) => {
              return (
                <option key={val} value={val}>
                  {val}
                </option>
              );
            })}
          </select>
        </InputWrapper>
        <CheckboxWrapper
          label="Accept Terms & Conditions"
          error={errors.accept?.message}
        >
          <input
            className="mr-2 leading-tight"
            id="accept-terms"
            type="checkbox"
            ref={acceptRef}
          />
        </CheckboxWrapper>

        <button className="disabled:bg-red-900 bg-blue-900" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default UncontrolledForm;
