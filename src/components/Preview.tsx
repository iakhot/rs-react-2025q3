import { type FormData } from '../common/types';
import InputWrapper from './common/InputWrapper';

const Fields = {
  name: 'Name',
  age: 'Age',
  email: 'Email',
  password: 'Password',
  gender: 'Gender',
  country: 'Country',
  picture: 'Picture',
};

function Preview({
  data,
  changedFields,
}: {
  data: FormData;
  changedFields: string[];
}) {
  return (
    <div className="card flex flex-col justify-center p-8 max-w-sm">
      {data.image !== '' && (
        <div className="md:flex justify-center mb-6">
          <img
            alt="data-image"
            src={data.image}
            width={100}
            className={
              changedFields.includes(Fields.picture.toLowerCase())
                ? 'border-purple-500 py-1 px-2'
                : 'py-1 px-2'
            }
          />
        </div>
      )}
      <InputWrapper label={Fields.name}>
        <input
          name={Fields.name}
          type="text"
          value={data.name}
          disabled
          className={
            changedFields.includes(Fields.name.toLowerCase())
              ? 'border-purple-500 '
              : ''
          }
        />
      </InputWrapper>
      <InputWrapper label={Fields.age}>
        <input
          name={Fields.age}
          type="text"
          value={data.age}
          disabled
          className={
            changedFields.includes(Fields.age.toLowerCase())
              ? 'border-purple-500'
              : 'bg-green-200'
          }
        />
      </InputWrapper>
      <InputWrapper label={Fields.email}>
        <input
          name={Fields.email}
          type="text"
          value={data.email}
          disabled
          className={
            changedFields.includes(Fields.email.toLowerCase())
              ? 'border-purple-500'
              : 'bg-green-200'
          }
        />
      </InputWrapper>
      <InputWrapper label={Fields.password}>
        <input
          name={Fields.password}
          type="password"
          value={data.password}
          disabled
          className={
            changedFields.includes(Fields.password.toLowerCase())
              ? 'border-purple-500'
              : 'bg-green-200'
          }
        />
      </InputWrapper>
      <InputWrapper label={Fields.gender}>
        <input
          name={Fields.gender}
          type="text"
          value={data.gender}
          disabled
          className={
            changedFields.includes(Fields.gender.toLowerCase())
              ? 'border-purple-500'
              : 'bg-green-200'
          }
        />
      </InputWrapper>
      <InputWrapper label={Fields.country}>
        <input
          name={Fields.country}
          type="text"
          value={data.country}
          disabled
          className={
            changedFields.includes(Fields.country.toLowerCase())
              ? 'border-purple-500'
              : 'bg-green-200'
          }
        />
      </InputWrapper>
    </div>
  );
}

export default Preview;
