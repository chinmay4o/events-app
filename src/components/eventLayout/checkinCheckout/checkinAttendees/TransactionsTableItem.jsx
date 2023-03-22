import React, { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import { patchRequest } from "../../../../utils/API/api.ts";

function TransactionsTableItem(props) {
  const [btnText, setBtnText] = useState("Check In");
  const eventsId = useMatch("events/:eventId/*");
  useEffect(() => {
    let btnText = "Check In";
    if (props?.showSearchResults) {
      btnText =
        props?.attendee?.attendee?.eventSpecificData.filter(
          (data) =>
            data.eventId === eventsId.params.eventId &&
            data.isCheckedIn === true
        ).length > 0
          ? "Check Out"
          : "Check In";
    } else {
      btnText =
        props?.attendee?.attendee[0]?.eventSpecificData.filter(
          (data) =>
            data.eventId === eventsId.params.eventId &&
            data.isCheckedIn === true
        ).length > 0
          ? "Check Out"
          : "Check In";
    }

    setBtnText(btnText);
  }, [props.attendee]);

  const checkInAttendee = async (attendeeId) => {
    try {
      const res = await patchRequest(
        `attendee/${attendeeId}/${eventsId.params.eventId}`,
        {}
      );
      const isCheckedIn =
        res.data.data.eventSpecificData.filter(
          (data) =>
            data.eventId == eventsId.params.eventId && data.isCheckedIn == true
        ).length > 0;
      setBtnText(isCheckedIn ? "Check Out" : "Check In");
      console.log(res, "Ressss");
    } catch (err) {
      console.log(err, "Something Went Wrong");
    }
  };

  return (
    <tr>
      {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="flex items-center">
          <label className="inline-flex">
            <span className="sr-only">Select</span>
            <input
              id={props.id}
              className="form-checkbox"
              type="checkbox"
              onChange={props.handleClick}
              checked={props.isChecked}
            />
          </label>
        </div>
      </td> */}
      <td className="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap ">
        <div className="flex items-center">
          <div className="w-9 h-9 shrink-0 mr-2 sm:mr-3">
            <img src={props.image} className="rounded-full w-[34px] h-[34px]" />
          </div>
          <div className="font-medium text-slate-800">{props.name}</div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
        <div className="text-left">{props.designation}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
        <div className="text-left">{props.email}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
        <button
          className={`h-[30px] w-[90px] ${
            btnText === "Check Out" ? "bg-danger" : "bg-primary"
          } font-[500]  text-white
           rounded-[4px]`}
          onClick={async () => {
            if (Array.isArray(props.attendee.attendee)) {
              await checkInAttendee(props.attendee.attendee[0]._id);
              console.log("Clicked");
            } else {
              await checkInAttendee(props.attendee.attendee._id);
              console.log("Clicked");
            }
          }}
        >
          {btnText}
        </button>
        {/* <PrimaryButton
          btnText={btnText}
          onClick={async () => {
            await checkInAttendee(props.attendee.attendee[0]._id);
            console.log("Clicked");
          }}
        /> */}
      </td>
      {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">
          <div
            className={`text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 ${statusColor(
              props.status
            )}`}
          >
            {props.status}
          </div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className={`text-right font-medium `}>{props.amount}</div>
      </td> */}
    </tr>
  );
}

export default TransactionsTableItem;
