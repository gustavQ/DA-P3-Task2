import React, {useState} from 'react';
import TraitDisplay from '../components/TraitDisplay';

const Traits = () => { 
   return (
    <div className="my-10 w-full h-[600px]">
      <h1 className="mb-5 text-2xl font-bold">Traits</h1>
      <div className="flex flex-col gap-y-4 pb-5 rounded-lg bg-indigo-100"> 
        <TraitDisplay />
      </div>
    </div>
  );
}

export default Traits
