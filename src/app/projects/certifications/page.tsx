'use client'

import LifesavingInputForm from "../../../components/LifesavingInputForm";
import LifesavingTable, {personCerts} from "../../../components/LifesavingTable";
import {useState} from "react";

const init_people = [
  {
    "Name": "Ethan Frigon",
    "National Lifeguard - Pool": "16-Jun-2022",
    "National Lifeguard - Waterpark": "26-May-2021",
    "CPR-C": "02-Jun-2022",
    "Standard First Aid": "02-Oct-2022",
    "AED": "02-Jun-2022",
    "Lifesaving Instructor": null
  }

  // More people...
]



const Page = () => {
  const [people, setPeople] = useState<personCerts[]>(init_people);
  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-500">Users</h1>
            <p className="mt-2 text-sm">
              A list of all the users in your account including their name, title, email and role.
            </p>
          </div>
          <LifesavingInputForm />
        </div>
        <LifesavingTable people={people} />
      </div>
    </div>
  );
};

export default Page;