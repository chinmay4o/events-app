import React, { useState, useId } from "react";
import TransactionItem from "./TransactionsTableItem";

function TransactionsTable({ registrations, showSearchResults }) {
  const transactions = [
    {
      id: "0",
      image: "/speaker.png",
      name: "Form Builder CP",
      date: "22/01/2022",
      status: "Pending",
      amount: "-$1,299.22",
    },
    {
      id: "1",
      image: "/speaker.png",
      name: "Imperial Hotel ****",
      date: "22/01/2022",
      status: "Completed",
      amount: "-$1,029.77",
    },
    {
      id: "2",
      image: "/speaker.png",
      name: "Aprilynne Pills",
      date: "22/01/2022",
      status: "Pending",
      amount: "+$499.99",
    },
    {
      id: "3",
      image: "/speaker.png",
      name: "Google Limited UK",
      date: "22/01/2022",
      status: "Completed",
      amount: "-$1,029.77",
    },
    {
      id: "4",
      image: "/speaker.png",
      name: "Acme LTD UK",
      date: "22/01/2022",
      status: "Pending",
      amount: "+$2,179.36",
    },
    {
      id: "5",
      image: "/speaker.png",
      name: "Google Limited UK",
      date: "22/01/2022",
      status: "Canceled",
      amount: "-$1,029.77",
    },
    {
      id: "6",
      image: "/speaker.png",
      name: "Uber",
      date: "22/01/2022",
      status: "Completed",
      amount: "-$272.88",
    },
    {
      id: "7",
      image: "/speaker.png",
      name: "PublicOne Inc.",
      date: "22/01/2022",
      status: "Completed",
      amount: "-$199.87",
    },
    {
      id: "8",
      image: "/speaker.png",
      name: "Github Inc.",
      date: "22/01/2022",
      status: "Completed",
      amount: "-$42.87",
    },
    {
      id: "9",
      image: "/speaker.png",
      name: "Form Builder PRO",
      date: "22/01/2022",
      status: "Completed",
      amount: "-$112.44",
    },
  ];

  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  const userId = useId();

  //   const handleSelectAll = () => {
  //     setSelectAll(!selectAll);
  //     setIsCheck(list.map((li) => li.id));
  //     if (selectAll) {
  //       setIsCheck([]);
  //     }
  //   };

  return (
    <div className="bg-white">
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 border-t border-b border-slate-200">
              <tr>
                {/* <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select all</span>
                      <input
                        className="form-checkbox"
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </label>
                  </div>
                </th> */}
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Attendee</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Designation</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">email</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-right"></div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200 border-b border-slate-200">
              {registrations &&
                registrations.length > 0 &&
                registrations.map((attendee, index) => {
                  return (
                    <TransactionItem
                      key={index}
                      image={attendee.profilePicture || "/svgs/profile.svg"}
                      name={`${attendee.firstName} ${attendee.lastName}`}
                      designation={`${attendee.jobTitle}, ${attendee.organization}`}
                      // status={attendee.status}
                      email={attendee.email}
                      attendee={attendee}
                      showSearchResults={showSearchResults}
                      // isChecked={isCheck.includes(attendee._id)}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TransactionsTable;
