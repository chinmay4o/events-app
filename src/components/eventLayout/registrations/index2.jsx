import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../../helper/hooks/useDebounce";
import PrimaryButton from "../../../common/Buttons/PrimaryButton";
import SecondaryButton from "../../../common/Buttons/SecondaryButton";
import Modal from "../../../common/Modals/Modal";
import { UPDATE_EVENT } from "../../../redux/constants/eventConstants";
import { getRequest } from "../../../utils/API/api";
import InvitePeople from "./InvitePeople";
import styles from "../Events.module.css";
import AttendeeCSVUpload from "./BulkUploadAttendee";
import PaginationClassic from "../../../common/Pagination";

function index() {
  const [isBulkUpload, setIsBulkUpload] = useState(false);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [searchedRegistrations, setSearchedRegistrations] = useState([]);
  const [attendedRegistrations, setAttendedRegistrations] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [next, setNext] = useState(`/attendee/${eventsId.params.eventId}`);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [tab, setTab] = useState("Registered");

  const event = useSelector((state) => state.eventData);
  const searchValue = useSelector((state) => state.searchRegistration);

  // UseEffect for initial registrations fetching
  useEffect(() => {
    if (eventsId.params.eventId && !isBulkUpload && event?.title) {
      getAllEventAttendees(`/attendee/${eventsId.params.eventId}`);
    }
  }, [eventsId, isBulkUpload, event?.title]);

  //UseEffect for search related functionality
  useEffect(() => {
    async function fetchData() {
      setNext(null);
      const data = await getRequest(
        `/attendee/${eventsId.params.eventId}/search/attendee?name=${searchValue.value}`
      );
      setRegistrations([...data.data.registrations.attendees]);
      console.log([...data.data.registrations.attendees]);
    }
    // setLoading(false);
    if (searchValue.value) {
      fetchData();
    } else if (searchValue.value === "" || searchValue.value === " ") {
      getAllEventAttendees(`/attendee/${eventsId.params.eventId}`);
    }
  }, [searchValue.value]);

  const getAllEventAttendees = async (route) => {
    const response = await getRequest(route || next);

    if (
      registrations.length == 0 &&
      (searchValue.value === "" || searchValue.value === " ")
    ) {
      setRegistrations(response.data.attendees);
    } else {
      setRegistrations(response.data.attendees);
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
      `attendee/${eventsId.params.eventId}/attended/?hasAttended=true`
    );
    setAttendedRegistrations(response?.data?.registrations);
    console.log(response);
  };

  return (
    <div className="w-full md:w-[422px] md:ml-[30px] md:mt-[30px]">
      <div className="py-0">
        <div className="flex justify-between items-center w-[335px] md:w-[422px] mx-auto md:mx-0">
          <span className="text-[22px] w-[267px] pt-2.5 md:pt-0 md:w-[314px] font-[600]">
            {event.title}
          </span>
        </div>
        <div className="font-[600] w-[335px] mx-auto md:w-[422px] text-[19px] pt-2.5  text-[#585858]">
          Registrations
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
                  getAllEventAttendees(`/attendee/${eventsId.params.eventId}`);
                }
              }}
            ></input>
          </div>
        </form>
        <div className="w-[335px] md:w-[422px] mt-2 mx-auto">
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

        <div className="flex flex-row items-center w-[340px] md:w-[480px] mt-2 mx-auto text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2" onClick={() => setTab("Registered")}>
              <a
                href="#"
                className={`inline-block px-4 py-4 ${
                  tab === "Registered" ? "text-primary border-primary" : ""
                } rounded-t-lg border-b-2 border-transparent dark:hover:text-gray-300`}
              >
                Registered
              </a>
            </li>
            <li className="mr-2" onClick={() => setTab("Attended")}>
              <a
                href="#"
                className={`inline-block px-4 py-4 ${
                  tab === "Attended" ? "text-primary border-primary" : ""
                } rounded-t-lg border-b-2 border-transparent dark:hover:text-gray-300`}
                onClick={() => {
                  getAttendedAttendees();
                }}
              >
                Attended
              </a>
            </li>
          </ul>
          {/* <div className="inline text-[#C5C5C7] ">
            <p className="cursor-pointer">
              By Name{" "}
              <img src="/svgs/sort_by_alpha.svg" className="inline" alt="sort"></img>
            </p>
          </div> */}
          <button
            className="bg-gray-200 text-gray-800 h-8 py-1 px-2 text-[12px] ml-4 my-1 font-semibold rounded-sm w-[30%]"
            // btnText="Download"
            onClick={() => {
              console.log("Clicked");
            }}
          >
            Download
          </button>
        </div>

        <div className="overflow-y-auto w-[335px] mx-auto md:w-[480px] min-h-[270px] max-h-[360px] scrollbar">
          {tab === "Registered" && registrations && registrations.length > 0 ? (
            registrations.map((attendee, index) => {
              return (
                <div className="my-4 flex justify-between">
                  <div className="flex w-[80%]">
                    <img
                      src={`${attendee.profilePicture || "/svgs/profile.svg"}`}
                      className="w-[50px] h-[50px] rounded-full"
                    />
                    {/* <i className="fa-light fa-user w-[50px] h-[50px]"></i> */}
                    <div className="pl-2 w-[240px]">
                      <div className="text-xs font-semibold py-1">
                        {/* {attendee.firstName === "Exhibitor" ? attendee.email :  `${attendee.firstName} ${attendee.lastName}`} */}
                        {attendee.firstName} {attendee.lastName}
                      </div>
                      <div className="text-xs font-medium py-1 text-gray-500">
                        {attendee.jobTitle ? (
                          <>
                            {attendee.jobTitle}, {attendee.organization}
                          </>
                        ) : null}
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
          ) : tab === "Attended" &&
            attendedRegistrations &&
            attendedRegistrations.length > 0 ? (
            attendedRegistrations.map((attendee, index) => {
              return (
                <div className="my-4 flex justify-between">
                  <div className="flex w-[80%]">
                    <img
                      src="/svgs/profile.svg"
                      className="w-[50px] h-[50px] rounded-full"
                    />
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
          {/* {next && tab === "Registered" ? (
            <span
              style={{ cursor: "pointer" }}
              onClick={async () => {
                await getAllEventAttendees();
              }}
              className="cursor-pointer m-auto block w-[100px] bg-blue-100 text-blue-800 text-[14px] font-medium  px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
            >
              Load More
            </span>
          ) : (
            []
          )} */}

          <div className="">
            <Modal isOpen={isBulkUpload} setIsOpen={setIsBulkUpload}>
              <AttendeeCSVUpload setIsBulkUpload={setIsBulkUpload} />
            </Modal>
          </div>
        </div>
        {(registrations && registrations.length > 0) || next ? (
          <div className="mt-8">
            <PaginationClassic
              onClick={async () => {
                await getAllEventAttendees();
              }}
              page={next ? next[next.indexOf("page=") + 5] : "1"}
              total={total}
            />
          </div>
        ) : (
          []
        )}
        <div className="w-[335px] md:w-[340px] mx-auto mt-[30px]">
          <PrimaryButton
            btnText={"Invite more users"}
            onClick={() => {
              setOpen(true);
            }}
          />
        </div>
        <div className="w-[335px] md:w-[340px] mx-auto">
          <SecondaryButton
            btnText={"Upload CSV"}
            onClick={() => {
              setIsBulkUpload(true);
            }}
          />
        </div>
        <div className="w-[335px] mx-auto md:w-[340px] pb-20 ">
          <span className="text-primary font-normal text-sm cursor-pointer">
            <a href="/speakersDefault.csv">
              Download the CSV format for adding new entries
            </a>
          </span>
        </div>
        <InvitePeople open={open} setOpen={setOpen} event={event} />
      </div>
    </div>
  );
}

export default index;
