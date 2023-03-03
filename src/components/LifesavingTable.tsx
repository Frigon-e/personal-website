export type personCerts = {
  Name: string | null;
  "National Lifeguard - Pool": string | null;
  "National Lifeguard - Waterpark": string | null;
  "CPR-C": string | null;
  "Standard First Aid": string | null;
  AED: string | null;
  "Lifesaving Instructor": string | null;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type props = {
  people: personCerts[];
}

const LifesavingTable = (props : props) => {
  const { people } = props;
  return (
      <div className="mt-8 flow-root">
        <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
              <tr className={'text-center'}>
                <th
                  scope="col"
                  className="sticky top-0 z-10 border-b border-gray-300 text-white py-3.5 pl-4 pr-3 text-sm font-semibold backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="sticky top-0 z-10 hidden border-b border-gray-300 text-white px-3 py-3.5 text-sm font-semibold backdrop-blur backdrop-filter sm:table-cell"
                >
                  National Lifeguard - Pool
                </th>
                <th
                  scope="col"
                  className="sticky top-0 z-10 hidden border-b border-gray-300 text-white px-3 py-3.5 text-sm font-semibold backdrop-blur backdrop-filter lg:table-cell"
                >
                  National Lifeguard - Waterpark
                </th>
                <th
                  scope="col"
                  className="sticky top-0 z-10 border-b border-gray-300 text-white px-3 py-3.5 text-sm font-semibold backdrop-blur backdrop-filter"
                >
                  CPR-C
                </th>

                <th
                  scope="col"
                  className="sticky top-0 z-10 border-b border-gray-300 text-white px-3 py-3.5 text-sm font-semibold backdrop-blur backdrop-filter"
                >
                  Standard First Aid
                </th>

                <th
                  scope="col"
                  className="sticky top-0 z-10 border-b border-gray-300 text-white px-3 py-3.5 text-sm font-semibold backdrop-blur backdrop-filter"
                >
                  AED
                </th>

                <th
                  scope="col"
                  className="sticky top-0 z-10 border-b border-gray-300 text-white px-3 py-3.5 text-sm font-semibold backdrop-blur backdrop-filter"
                >
                  Lifesaving Instructor
                </th>
              </tr>
              </thead>
              <tbody>
              {people.map((person, personIdx) => (
                <tr key={personIdx} className={'text-center'}>
                  <td
                    className={classNames(
                      personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                      'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6 lg:pl-8'
                    )}
                  >
                    {person.Name}
                  </td>
                  <td
                    className={classNames(
                      personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                      'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-400 sm:table-cell'
                    )}
                  >
                    {person['National Lifeguard - Pool']}
                  </td>
                  <td
                    className={classNames(
                      personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                      'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-400 lg:table-cell'
                    )}
                  >
                    {person['National Lifeguard - Waterpark']}
                  </td>
                  <td
                    className={classNames(
                      personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                      'whitespace-nowrap px-3 py-4 text-sm text-gray-400'
                    )}
                  >
                    {person['CPR-C']}
                  </td>

                  <td
                    className={classNames(
                      personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                      'whitespace-nowrap px-3 py-4 text-sm text-gray-400'
                    )}
                  >
                    {person['Standard First Aid']}
                  </td>
                  <td
                    className={classNames(
                      personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                      'whitespace-nowrap px-3 py-4 text-sm text-gray-400'
                    )}
                  >
                    {person['AED']}
                  </td>
                  <td
                    className={classNames(
                      personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                      'whitespace-nowrap px-3 py-4 text-sm text-gray-400'
                    )}
                  >
                    {person['Lifesaving Instructor']}
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
};

export default LifesavingTable;