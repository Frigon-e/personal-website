'use client'
import React from 'react';


const LifesavingInputForm = () => {

  function handleSubmit(event : React.FormEvent<HTMLFormElement>) {
    alert('A name was submitted: ' + document.getElementById("member-ids")?.textContent);
    event.preventDefault();
  }
  return (
      <form onSubmit={handleSubmit}>
    <div className={'relative sm:w-64'}>
        <label htmlFor="member-ids" className="sr-only">
          Add Lifesaving Society Codes
        </label>
        <div className="mt-2">
            <textarea
              rows={4}
              name="member-ids"
              id="member-ids"
              className="block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 bg-zinc-800/90 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
              defaultValue={''}
              placeholder="Add your Member IDs here..."
            />
          <div className="flex-shrink-0">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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