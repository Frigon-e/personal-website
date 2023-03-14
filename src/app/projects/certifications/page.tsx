'use client'

import LifesavingInputForm from "../../../components/LifesavingInputForm";
import LifesavingTable from "../../../components/LifesavingTable";
import {useState} from "react";
import usePeople from "../../hooks/usePeople";




const Page = () => {
  const [memberIds, setMemberIds] = useState<string[]>([]);
  const people = usePeople(memberIds);
  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-500">Members</h1>
            <p className="mt-2 text-sm pr-2">
              This will fetch data bulk data from Lifesaving Society then create a list of that data. It will display all current certifications.
            </p>
          </div>
          <LifesavingInputForm setMemberIds={setMemberIds}/>
        </div>
        <LifesavingTable people={people.data} />
      </div>
    </div>
  );
};

export default Page;