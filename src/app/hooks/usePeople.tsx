import {useEffect, useState} from "react";
import {personCerts} from "../../components/LifesavingTable";

const init_people = [
  {
    "Name": "Ethan Frigon",
    "National Lifeguard - Pool": "16-Jun-2022",
    "National Lifeguard - Waterpark": "26-May-2021",
    "CPR-C": "02-Jun-2022",
    "Standard First Aid": "02-Oct-2022",
    "AED": "02-Jun-2022",
    "Lifesaving Instructor": null,
    "ID": "FRE96F"
  }

  // More people...
];

const backup_data =
  [{
    "Name": "Ethan Frigon",
    "National Lifeguard - Pool": "16-Jun-2022",
    "National Lifeguard - Waterpark": "26-May-2021",
    "CPR-C": "02-Jun-2022",
    "Standard First Aid": "02-Oct-2022",
    "AED": "02-Jun-2022",
    "Lifesaving Instructor": null,
    "ID": "FRE96F"
  }, {
    "Name": "Griffin Bennett",
    "National Lifeguard - Pool": null,
    "National Lifeguard - Waterpark": null,
    "CPR-C": "24-Jul-2021",
    "Standard First Aid": "18-Oct-2020",
    "AED": "18-Oct-2020",
    "Lifesaving Instructor": null,
    "ID": "BEG92L"
  }];
export default function usePeople(memberIds: string[]) {
  const [people, setPeople] = useState<{ data: personCerts[], loading: boolean }>({data: init_people, loading: false});
  useEffect(() => {
    if (memberIds.length === 0) {
      return;
    }
    const params = {
      method: 'POST',
      body: JSON.stringify({"member_ids": memberIds})
    };
    setPeople({data: people.data, loading: true});
    fetch("http://localhost:5000/api/certification", params)
      .then((res) =>
        res.json())
      .then((data) => {
        console.log(data);
        setPeople({data: data, loading: false});
      }).catch((err) => {
      console.log(err);
      setPeople({data: backup_data, loading: false});
    });

  }, [memberIds, people.data]);

  return people;


}