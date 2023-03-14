'use client';
import React from 'react';

type LifesavingInputFormProps = {
  setMemberIds: (memberIds: string[]) => void;
}

const LifesavingInputForm = (prop: LifesavingInputFormProps) => {
  const {setMemberIds} = prop;


  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let inputs = (document.getElementById('member-ids') as HTMLInputElement)?.value;
    const newMemberIds = inputs?.replace(/\s/g, ' ').trim().split(' ');
    setMemberIds(newMemberIds);
    alert('A name was submitted: ' + newMemberIds);
  }

  return (
    <form onSubmit={handleSubmit} className={`sm:flex-auto`}>
      <div className={'relative sm:w-64'}>
        <label htmlFor="member-ids" className="sr-only">
          Add Lifesaving Society Codes
        </label>
        <div className="mt-2">
            <textarea
              rows={3}
              name="member-ids"
              id="member-ids"
              className="block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 bg-zinc-800/90 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 text-sm sm:leading-6"
              defaultValue={''}
              placeholder="Add your Member IDs here..."
            />
          <div className="flex-shrink-0">
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 mt-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </form>

  );
};

export default LifesavingInputForm;