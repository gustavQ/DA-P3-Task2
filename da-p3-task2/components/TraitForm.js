import React, {useState} from 'react';

const TraitForm = ({onUpdate, disable}) => {
  const [form, setForm] = useState({
    type: '',
    name: '',
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate(form);
  };

  return (
    <form className="flex flex-row mx-4 mt-4 gap-x-4 items-end" onSubmit={handleSubmit}>
      <div className="flex-1">
        <label className="block mb-2 text-left text-sm font-medium text-gray-900">Trait Type</label>
        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5"
          id="type"
          type="text"
          value={form.type}
          onChange={handleChange}
        />
      </div>
      <div className="flex-1">
        <label className="block mb-2 text-left text-sm font-medium text-gray-900">Trait Name</label>
        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5"
          id="name"
          type="text"
          value={form.text}
          onChange={handleChange}
        />
      </div>
      <button disabled={disable} className="flex-1 block h-14 w-full border bg-indigo-300 rounded-lg hover:bg-indigo-500" type="submit">Update NFT</button>
    </form>
  );
};

export default TraitForm
