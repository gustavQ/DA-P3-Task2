import React, {useState} from 'react';
import TraitDisplay from '../components/TraitDisplay';

const inputValid = /^[0-9a-zA-Z]{32,44}$/

const Traits = () => {
  const [address, setAddress] = useState('');
  const [valid, setValid] = useState(false);
  
  function handleAddress(event) {
    if(inputValid.test(event.target.value)){ 
      setValid(true); 
      setAddress(event.target.value);
    } else { setValid(false); }
  } 
  
  return (
    <div className="my-10 w-full h-[600px]">
      <h1 className="mb-5 text-2xl font-bold">Traits</h1>
      <div> 
        <label className="block mb-2 text-left text-sm font-medium text-gray-900">Address</label> 
        <input type="text" onChange={handleAddress} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" placeholder="" /> 
      </div>
      <div className="mt-10 min-w-full h-auto rounded-md bg-indigo-100">
        { valid && <TraitDisplay address={address} />}
      </div>
    </div>
  );
}

export default Traits
