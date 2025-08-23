import { type FormData } from '../common/types';
import InputWrapper from './common/InputWrapper';

function Preview({ data }: { data: FormData }) {
  return (
    <div className="card flex flex-col justify-center p-8 max-w-sm">
      {data.image !== '' && (
        <div className="md:flex justify-center mb-6">
          <img
            alt="data-image"
            src={data.image}
            width={100}
            className=" border-2 
              border-gray-200
              rounded
              py-1
              px-2"
          />
        </div>
      )}
      <InputWrapper label="Name">
        <input type="text" value={data.name} disabled />
      </InputWrapper>
      <InputWrapper label="Age">
        <input type="text" value={data.age} disabled />
      </InputWrapper>
      <InputWrapper label="Email">
        <input type="text" value={data.email} disabled />
      </InputWrapper>
      <InputWrapper label="Gender">
        <input type="text" value={data.gender} disabled />
      </InputWrapper>
      <InputWrapper label="Country">
        <input type="text" value={data.country} disabled />
      </InputWrapper>
    </div>
  );
}

export default Preview;
