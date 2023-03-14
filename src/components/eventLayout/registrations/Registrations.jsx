import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_EVENT } from "../../../redux/constants/eventConstants";
import { getRequest } from "../../../utils/API/api.ts";
import AttendeeCSVUpload from "./BulkUploadAttendee";
import { useMatch } from "react-router-dom";
import Modal from "../../../common/modals/Modal";
import PrimaryButton from "../../../common/buttons/PrimaryButton";
import PaginationClassic from "../../../common/pagination/PaginationClassic";

function Registrations() {
  const eventsid = useMatch("/events/:eventId");
  const [isBulkUpload, setIsBulkUpload] = useState(false);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [searchedRegistrations, setSearchedRegistrations] = useState([]);
  const [attendedRegistrations, setAttendedRegistrations] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [next, setNext] = useState(`/attendee/${eventsid.params.eventId}`);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [tab, setTab] = useState("Registered");
  const [badge, setBadge] = useState("hide");
  const event = useSelector((state) => state.eventData);
  const searchValue = useSelector((state) => state.searchRegistration);
  const targetRef = useRef([]);
  // UseEffect for initial registrations fetching
  useEffect(() => {
    if (eventsid.params.eventId && !isBulkUpload && event?.title) {
      getAllEventAttendees(`/attendee/${eventsid.params.eventId}`);
    }
  }, [eventsid, isBulkUpload, event?.title]);

  //UseEffect for search related functionality
  useEffect(() => {
    async function fetchData() {
      setNext(null);
      const data = await getRequest(
        `/attendee/${eventsid.params.eventId}/search/attendee?name=${searchValue.value}`
      );
      setRegistrations([...data.data.registrations.attendees]);
    }
    // setLoading(false);
    if (searchValue.value) {
      fetchData();
    } else if (searchValue.value === "" || searchValue.value === " ") {
      getAllEventAttendees(`/attendee/${eventsid.params.eventId}`);
    }
  }, [searchValue.value]);

  const getAllEventAttendees = async (route) => {
    const response = await getRequest(route || next);
    if (
      registrations.length === 0 &&
      (searchValue.value === "" || searchValue.value === " ")
    ) {
      const allAttendees = [...registrations, ...response.data.attendees];
      const uniqueData = allAttendees.filter(
        (value, index, self) =>
          self.findIndex((t) => t.email === value.email) === index
      );
      setRegistrations(uniqueData);
    } else {
      const allAttendees = [...registrations, ...response.data.attendees];
      const uniqueData = allAttendees.filter(
        (value, index, self) =>
          self.findIndex((t) => t.email === value.email) === index
      );
      setRegistrations(uniqueData);
    }

    setNext(response?.data?.next);
    setTotal(response?.data?.totalAttendees[0]?.total);
    dispatch({
      type: UPDATE_EVENT,
      payload: {
        attendees: [...registrations, response.data.attendees],
      },
    });
  };
  const getAttendedAttendees = async () => {
    const response = await getRequest(
      `attendee/${eventsid.params.eventId}/attended/?hasAttended=true`
    );
    setAttendedRegistrations(response?.data?.registrations);
  };

  const showBadge = (index) => {
    targetRef.current[index].style.display = "block";
  };

  const hideBadge = (index) => {
    targetRef.current[index].style.display = "none";
  };

  console.log(total);

  const handleDownload = () => {
    const fields = ["firstName", "lastName", "email", "organization"];
    const headerRow = fields.join(",");
    const dataRows = registrations.map((row) =>
      fields.map((field) => row[field]).join(",")
    );
    const csvContent =
      "data:text/csv;charset=utf-8," + [headerRow, ...dataRows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "RegisteredUser.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="md:ml-[0px] md:mt-[15px] md:w-[900px] pb-12">
      <div className="py-0">
        {/* <div className="flex justify-between items-center w-[335px] md:w-[422px] mx-auto md:mx-0">
          <span className="text-[22px] w-[267px] pt-2.5 md:pt-0 md:w-[314px] font-[600]">
            {event.title}
          </span>
        </div> */}
        <div className="font-[600] w-[335px] md:w-full text-[24px] pt-2.5 text-black flex justify-between items-center">
          <div>Registrations</div>
          <div className="flex">
            <button
              className="bg-primary text-white h-8 py-1 px-2 text-[14px] ml-4 my-1 font-semibold rounded-sm w-[167px] h-[35px]"
              onClick={handleDownload}
              // onClick={() => {
              //   window.open("/attendeeDefault.csv");
              // }}
            >
              Download
            </button>
            <button
              className="bg-gray-200 text-gray-800 h-8 py-1 px-2 text-[14px] ml-4 my-1 font-semibold rounded-sm w-[167px]  h-[35px]"
              // btnText="Download"
              onClick={() => {
                setIsBulkUpload(true);
              }}
            >
              Upload CSV
            </button>
          </div>
        </div>
        <form className="flex md:hidden w-[340px] mx-auto items-center my-4">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full ">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
              placeholder="Search"
              required={true}
              onChange={(e) => {
                if (e.target.value) {
                  setSearch(e.target.value);
                } else {
                  setRegistrations([]);
                  getAllEventAttendees(`/attendee/${eventsid.params.eventId}`);
                }
              }}
            ></input>
          </div>
        </form>
        <div className="w-[335px] md:w-[422px] mt-2">
          {/* <div className="flex justify-between text-[#C5C5C7]">
            <p className="cursor-pointer">
              By Name <img src="/svgs/sort_by_alpha.svg" alt="sort"></img>
            </p>
            <p className="cursor-pointer">By Date</p> 
          </div> */}
          {/* <div className="mt-2">
            <SecondaryButton
              btnText={"Download registrations"}
              onClick={() => {}}
            />
          </div> */}
        </div>

        <div className="flex flex-row items-center w-[340px] md:w-[900px] mt-2  text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 justify-between">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2" onClick={() => setTab("Registered")}>
              <a
                href="#"
                className={`inline-block px-0 py-4 ${
                  tab === "Registered"
                    ? "text-primary border-primary underline underline-offset-8	 decoration-2"
                    : ""
                } rounded-t-lg border-b-2 border-transparent dark:hover:text-gray-300 text-[15px] `}
              >
                Registered
              </a>
            </li>
            <li className="mr-2" onClick={() => setTab("Attended")}>
              <a
                href="#"
                className={`inline-block px-4 py-4 ${
                  tab === "Attended"
                    ? "text-primary border-primary underline underline-offset-8	 decoration-2"
                    : ""
                } rounded-t-lg border-b-2 border-transparent dark:hover:text-gray-300 text-[15px]`}
                onClick={() => {
                  getAttendedAttendees();
                }}
              >
                Attended
              </a>
            </li>
          </ul>
          <div className="text-[13px]">
            Showing {registrations.length} of {total} results
          </div>
          {/* <div className="inline text-[#C5C5C7] ">
            <p className="cursor-pointer">
              By Name{" "}
              <img src="/svgs/sort_by_alpha.svg" className="inline" alt="sort"></img>
            </p>
          </div> */}
          {/* <a
            className="text-primary text-[13px] block"
            href="/attendeeDefault.csv"
          >
            template here
          </a> */}
          {/* <button
            className="bg-gray-200 text-gray-800 h-8 py-1 px-2 text-[12px] ml-4 my-1 font-semibold rounded-sm w-[30%]"
            onClick={handleDownload}
            // onClick={() => {
            //   window.open("/attendeeDefault.csv");
            // }}
          >
            Download
          </button>
          <button
            className="bg-gray-200 text-gray-800 h-8 py-1 px-2 text-[12px] ml-4 my-1 font-semibold rounded-sm w-[30%]"
            // btnText="Download"
            onClick={() => {
              setIsBulkUpload(true);
            }}
          >
            Upload CSV
          </button> */}
        </div>

        <div className="overflow-y-auto w-[335px] md:w-full min-h-[270px] scrollbar">
          {tab === "Registered" && registrations && registrations.length > 0 ? (
            <table className="table-auto md:w-[900px]">
              <thead className="">
                <tr className="">
                  <th className="text-[12px] font-[500] text-left leading-[45px] w-[200px]">
                    User
                  </th>
                  <th className="text-[12px] font-[500] text-left leading-[45px] w-[230px]">
                    Contact Info
                  </th>
                  <th className="text-[12px] font-[500] text-left leading-[45px] w-[195px]">
                    Registration date
                  </th>
                  <th className="text-[12px] font-[500] text-left leading-[45px] w-[100px]">
                    Role
                  </th>
                  <th className="text-[12px] font-[500] leading-[45px] text-center w-[90px]">
                    Badge
                  </th>
                </tr>
              </thead>

              <tbody className="">
                {registrations.map((attendee, index) => {
                  return (
                    <>
                      <tr className="h-[55px] border-b">
                        <td className="text-[12px] font-[500]]">
                          <div className="grid grid-cols-[45px_1fr] gap-[1px]">
                            {attendee.profilePicture ? (
                              <img
                                src={attendee.profilePicture}
                                className="w-[32px] h-[32px] rounded-[50%] object-cover"
                              />
                            ) : (
                              <div
                                className={`sm:w-[32px] sm:h-[32px] w-[32px] h-[32px] rounded-full bg-${
                                  ["red", "green", "blue", "yellow", "indigo"][
                                    Math.floor(Math.random() * 5)
                                  ]
                                }-500 flex items-center justify-center mr-2 text-white text-sm font-medium uppercase`}
                              >
                                {attendee.firstName.slice(0, 1)}
                                {attendee.lastName.slice(0, 1)}
                              </div>
                            )}
                            {/* <img
                              src={`${
                                attendee.profilePicture || "/svgs/profile.svg"
                              }`}
                              className="w-[32px] h-[32px] rounded-[50%] object-cover"
                            /> */}
                            <p className="text-[12px] font-[400] grid grid-rows-2">
                              <p>
                                {attendee.firstName.charAt(0).toUpperCase() +
                                  attendee.firstName.slice(
                                    1,
                                    attendee.firstName.length
                                  )}{" "}
                                {attendee.lastName}
                              </p>
                              <p className="text-[10px] text-slate-500">
                                {attendee.jobTitle && attendee.jobTitle},{" "}
                                {attendee.organization && attendee.organization}
                              </p>
                            </p>
                          </div>
                        </td>
                        <td className="text-[12px] font-[500]">
                          <p className="text-[12px] font-[400] grid grid-rows-2">
                            <p>{attendee.email && attendee.email}</p>
                            <p className="text-[10px] text-slate-500">
                              {attendee.mobile && attendee.mobile}
                            </p>
                          </p>
                        </td>
                        {attendee.attendee[0] === undefined
                          ? attendee.attendee?.eventSpecificData.map(
                              (ele, index) => {
                                if (ele.eventId === eventsid.params.eventId) {
                                  const xmas95 = new Date(ele.timeStamp);
                                  const optionsFull = { dateStyle: "full" }; // imp gets Friday, November 18, 2022
                                  return (
                                    <td className="text-[12px] font-[400]">
                                      {ele?.timeStamp
                                        ? new Intl.DateTimeFormat(
                                            "en-US",
                                            optionsFull
                                          ).format(xmas95)
                                        : "N/A"}
                                    </td>
                                  );
                                }
                              }
                            )
                          : attendee.attendee[0]?.eventSpecificData.map(
                              (ele, index) => {
                                if (ele.eventId === eventsid.params.eventId) {
                                  const xmas95 = new Date(ele.timeStamp);
                                  const optionsFull = { dateStyle: "full" }; // imp gets Friday, November 18, 2022
                                  return (
                                    <td className="text-[12px] font-[400]">
                                      {ele?.timeStamp
                                        ? new Intl.DateTimeFormat(
                                            "en-US",
                                            optionsFull
                                          ).format(xmas95)
                                        : "N/A"}
                                    </td>
                                  );
                                }
                              }
                            )}

                        {attendee.attendee[0] === undefined
                          ? attendee.attendee?.eventSpecificData.map(
                              (ele, ind) => {
                                if (ele.eventId === eventsid.params.eventId) {
                                  return (
                                    <td
                                      className="text-[12px] font-[400] relative left-[0px]"
                                      id={ind}
                                    >
                                      <p
                                        className={`${
                                          ele.highestRole === "attendee"
                                            ? "bg-[#2D9CDB]"
                                            : ele.highestRole === "speaker"
                                            ? "bg-[#27AE60]"
                                            : ele.highestRole === "organiser"
                                            ? "bg-[#F2994A]"
                                            : "bg-primary"
                                        } rounded-[12px] p-[4px] text-white grid place-items-center w-[85%]`}
                                      >
                                        {ele.highestRole
                                          .charAt(0)
                                          .toUpperCase() +
                                          ele.highestRole.slice(
                                            1,
                                            ele.highestRole.length
                                          )}
                                      </p>
                                    </td>
                                  );
                                }
                              }
                            )
                          : attendee.attendee[0]?.eventSpecificData.map(
                              (ele, ind) => {
                                if (ele.eventId === eventsid.params.eventId) {
                                  return (
                                    <td
                                      className="text-[12px] font-[400] relative left-[0px]"
                                      id={ind}
                                    >
                                      <p
                                        className={`${
                                          ele.highestRole === "attendee"
                                            ? "bg-[#2D9CDB]"
                                            : ele.highestRole === "speaker"
                                            ? "bg-[#27AE60]"
                                            : ele.highestRole === "organiser"
                                            ? "bg-[#F2994A]"
                                            : "bg-primary"
                                        } rounded-[12px] p-[4px] text-white grid place-items-center w-[85%]`}
                                      >
                                        {ele.highestRole
                                          .charAt(0)
                                          .toUpperCase() +
                                          ele.highestRole.slice(
                                            1,
                                            ele.highestRole.length
                                          )}
                                      </p>
                                    </td>
                                  );
                                }
                              }
                            )}

                        <td className="text-center">
                          <div
                            ref={(element) => {
                              targetRef.current[index] = element;
                            }}
                            className="absolute z-10 inline-block px-3 py-1 shadow-s ml-10 mt-0 bg-transparent hidden bottom-[20px] "
                            onMouseEnter={() => showBadge(index)}
                            onMouseLeave={() => hideBadge(index)}
                          >
                            {attendee.attendee[0] === undefined
                              ? attendee.attendee.eventSpecificData.map(
                                  (items) => {
                                    if (
                                      items.eventId === eventsid.params.eventId
                                    ) {
                                      return (
                                        <img
                                          className="w-[250px] border rounded-t-xl register_img"
                                          src={items.badgeUrl}
                                        />
                                      );
                                    }
                                  }
                                )
                              : attendee.attendee[0]?.eventSpecificData.map(
                                  (items) => {
                                    if (
                                      items.eventId === eventsid.params.eventId
                                    ) {
                                      return (
                                        <img
                                          className="w-[250px] border rounded-t-xl register_img"
                                          src={items.badgeUrl}
                                        />
                                      );
                                    }
                                  }
                                )}

                            <div className=" flex justify-evenly text-white">
                              <button
                                onClick={() => {
                                  let win = window.open("");
                                  attendee.attendee[0] === undefined
                                    ? win.document.write(
                                        '<html><head><style>img { display: block; margin: 0 auto; }</style></head><body><img src="' +
                                          attendee.attendee
                                            ?.eventSpecificData[0].badgeUrl +
                                          '" onload="window.print();window.close()" /></body></html>'
                                      )
                                    : win.document.write(
                                        '<html><head><style>img { display: block; margin: 0 auto; }</style></head><body><img src="' +
                                          attendee.attendee[0]
                                            ?.eventSpecificData[0].badgeUrl +
                                          '" onload="window.print();window.close()" /></body></html>'
                                      );

                                  win.focus();
                                }}
                                title="ImageName"
                                className="w-[100%] bg-primary h-[30px] mr-2 rounded-bl-lg"
                              >
                                Print
                              </button>
                              <button
                                className="w-[100%] bg-primary h-[30px] rounded-br-lg"
                                onClick={() =>
                                  window.open(
                                    `${attendee.attendee[0]?.eventSpecificData[0].badgeUrl}`,
                                    "_blank"
                                  )
                                }
                              >
                                Preview
                              </button>
                            </div>
                          </div>
                          <img
                            src="/svgs/IDCard.svg"
                            alt="IDCard"
                            onMouseEnter={() => showBadge(index)}
                            onMouseLeave={() => hideBadge(index)}
                            className="ml-[30px] cursor-pointer"
                          />
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          ) : // </table>
          tab === "Attended" &&
            attendedRegistrations &&
            attendedRegistrations.length > 0 ? (
            attendedRegistrations.map((attendee, index) => {
              return (
                <div className="my-4 flex justify-between">
                  <div className="flex w-[80%]">
                    <div
                      className={`sm:w-[50px] sm:h-[50px] w-[50px] h-[50px] rounded-full bg-${
                        ["red", "green", "blue", "yellow", "indigo"][
                          Math.floor(Math.random() * 5)
                        ]
                      }-500 flex items-center justify-center mr-2 text-white text-lg font-medium uppercase`}
                    >
                      {attendee.firstName.slice(0, 1)}
                      {attendee.lastName.slice(0, 1)}
                    </div>
                    {/* <img
                      src="/svgs/profile.svg"
                      className="w-[50px] h-[50px] rounded-full"
                    /> */}
                    {/* <i className="fa-light fa-user w-[50px] h-[50px]"></i> */}
                    <div className="pl-2 w-[240px]">
                      <div className="text-xs font-semibold py-1">
                        {attendee.firstName} {attendee.lastName}
                      </div>
                      <div className="text-xs font-medium py-1 text-gray-500">
                        {attendee.jobTitle}, {attendee.organization}
                      </div>
                    </div>
                    <div className="text-xs font-medium text-gray-500 self-center">
                      {attendee.email}
                    </div>
                  </div>
                  <div className="flex mr-2 self-center">
                    <div className="text-primary text-[10px] mr-2">
                      View Badge
                    </div>
                    {/* <img
                      src="/svgs/Edit.svg"
                      alt="edit"
                      className="w-6 h-6 cursor-pointer mr-2"
                    />
                    <img
                      src="/svgs/Delete.svg"
                      alt="delete"
                      className="w-6 h-6 cursor-pointer"
                    /> */}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="grid w-full place-items-center h-[250px]">
              <div>
                <img
                  src="/svgs/nullState.svg"
                  alt=""
                  className="w-[200px] h-[200px]"
                />
                <p className="text-[15px] font-[500] text-[#717171]  text-center">
                  Nothing here...
                </p>
              </div>
            </div>
          )}

          <div className="">
            <Modal isOpen={isBulkUpload} setIsOpen={setIsBulkUpload}>
              <AttendeeCSVUpload setIsBulkUpload={setIsBulkUpload} />
            </Modal>
          </div>
        </div>
        {registrations.length >= total ||
        (searchValue.value !== "" && searchValue.value !== " ") ? (
          <></>
        ) : (
          <div
            className="text-center mt-3 cursor-pointer text-primary"
            onClick={async () => {
              await getAllEventAttendees();
            }}
          >
            Load More...
          </div>
        )}

        {/* {(registrations && registrations.length > 0) || next ? (
          <div className="mt-8">
            <PaginationClassic
              onClick={async () => {
                await getAllEventAttendees();
              }}
              // page={next ? next[next.indexOf("page=") + 5] : "1"}
              // total={total}
            />
          </div>
        ) : (
          []
        )} */}
        {/* <div className="w-[335px] md:w-[340px] mx-auto mt-[30px]">
          <PrimaryButton
            btnText={"Invite more users"}
            onClick={() => {
              setOpen(true);
            }}
          />
        </div>
        <div className="w-[335px] md:w-[340px] mx-auto">
          <PrimaryButton
            btnText={"Upload CSV"}
            onClick={() => {
              setIsBulkUpload(true);
            }}
          />
        </div> */}
        {/* <div className="w-[335px] mx-auto md:w-[340px] pb-20 ">
          <span className="text-primary font-normal text-sm cursor-pointer">
            <a href="/speakersDefault.csv">
              Download the CSV format for adding new entries
            </a>
          </span>
        </div> */}
        {/* <InvitePeople open={open} setOpen={setOpen} event={event} /> */}
      </div>
    </div>
  );
}

export default Registrations;
