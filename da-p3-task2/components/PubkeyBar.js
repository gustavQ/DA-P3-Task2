import {PublicKey} from '@solana/web3.js';
import React, {useState} from 'react'; 

const inputValid = /^[0-9a-zA-Z]{44}$/

const PubkeyBar = ({onAddress}) => {
  const [invalid, setInvalid] = useState(false);

  const handleAddress = (event) => {
    const address = event.target.value; 
    if(inputValid.test(address)) {
      setInvalid(false);
      onAddress(address);
    } else {
      setInvalid(true);
    }
  };

  return (
    <div className="mx-4"> 
      <label className="block mb-2 mt-4 text-left text-sm font-medium text-gray-900">NFT Address</label> 
      <input type="text" onChange={handleAddress} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" placeholder="" />
      { invalid && <label className="block mt-2 text-fet text-xs font-medium text-red-500">Invalid Address</label> }
    </div>
  );
};

export default PubkeyBar;
