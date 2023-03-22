import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useDebounce from "../../../../helper/hooks/useDebounce";
import { UPDATE_EVENT } from "../../../../redux/constants/eventConstants";
import TransactionsTable from "./TransactionsTable";
import {
  useLocation,
  useMatch,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { getRequest } from "../../../../utils/API/api.ts";
import PaginationClassic from "../../../../common/pagination/PaginationClassic";

function CheckinAttendees({ setEventTitle }) {
  const location = useLocation();
  const eventsId = useMatch("events/:eventId/*");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [total, setTotal] = useState(10);
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [next, setNext] = useState(`/attendee/${eventsId.params.eventId}`);
  const debouncedSearch = useDebounce(search, 700);
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  useEffect(() => {
    async function fetchData() {
      setNext(null);
      setShowSearchResults(true);
      const data = await getRequest(
        `/attendee/${eventsId.params.eventId}/search/attendee?name=${debouncedSearch}`
      );
      setRegistrations([...data.data.registrations.attendees]);
    }
    // setLoading(false);
    if (eventsId.params.eventId) {
      if (debouncedSearch.length > 0) {
        fetchData();
      } else {
        getAllEventAttendees(`/attendee/${eventsId.params.eventId}`);
      }
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (eventsId.params.eventId) {
      getAllEventAttendees(`/attendee/${eventsId.params.eventId}`);
    }
  }, [eventsId]);

  useEffect(() => {
    const tabs = ["Attended", "NotAttended", "CheckedIn", "CheckedOut"];
    let query = "";
    if (tabs.includes(tab)) {
      switch (tab) {
        case "Attended":
          query = "hasAttended=true";
          break;
        case "NotAttended":
          query = "hasAttended=false";
          break;
        case "CheckedIn":
          query = "hasAttended=true&isCheckedIn=true";
          break;
        case "CheckedOut":
          query = "hasAttended=true&isCheckedIn=false";
          break;
        default:
          query = "";
          break;
      }
      getFilteredAttendees(query);
    }
  }, [tab]);

  //Get all attendees that are registered for the event
  const getAllEventAttendees = async (route) => {
    setShowSearchResults(false);
    const response = await getRequest(route ?? next);

    if (
      registrations.length == 0 ||
      ((search === "" || search === " ") && response.data.attendees.length > 0)
    ) {
      setRegistrations(response.data.attendees);
    } else {
      setRegistrations([...registrations, ...response.data.attendees]);
    }
    setNext(response?.data?.next);
    setEventTitle(response?.data?.eventTitle);
    setTotal(response?.data?.totalAttendees[0].total);
    dispatch({
      type: UPDATE_EVENT,
      payload: {
        attendees: [...registrations, response.data.attendees],
      },
    });
  };

  //Get Filtered Attendees based on query provided
  const getFilteredAttendees = async (query) => {
    setShowSearchResults(false);
    const response = await getRequest(
      `attendee/${eventsId.params.eventId}/attended/?${query}`
    );
    setFilteredRegistrations(response?.data?.registrations);
  };

  return (
    <div>
      <form
        className="flex items-center my-4 "
        onSubmit={(event) => event.preventDefault()}
      >
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
              setSearch(e.target.value);
            }}
          ></input>
        </div>
        <img
          src="/svgs/qr.svg"
          alt=""
          height={40}
          width={40}
          className="mx-4 cursor-pointer"
          onClick={() => {
            navigate(`${location.pathname}/scan`);
          }}
        />
      </form>
      {/* Filters */}
      <div className="mb-5">
        <ul className="flex flex-wrap -m-1">
          <li className="m-1">
            <button
              onClick={() => {
                navigate(
                  `/events/${
                    eventsId.params.eventId
                  }/registrations?tab=${"ViewAll"}`
                );
              }}
              className={`inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border shadow-sm ${
                tab === "ViewAll"
                  ? "border-transparent  bg-primary text-white "
                  : "border-slate-200 hover:border-slate-300 bg-white text-slate-500"
              } duration-150 ease-in-out`}
            >
              View All
            </button>
          </li>
          <li className="m-1">
            <button
              onClick={() => {
                navigate(
                  `/events/${
                    eventsId.params.eventId
                  }/registrations?tab=${"Attended"}`
                );
              }}
              className={`inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border shadow-sm ${
                tab === "Attended"
                  ? "border-transparent  bg-primary text-white "
                  : "border-slate-200 hover:border-slate-300 bg-white text-slate-500"
              } duration-150 ease-in-out`}
            >
              Attended
            </button>
          </li>
          <li className="m-1">
            <button
              onClick={() => {
                navigate(
                  `/events/${
                    eventsId.params.eventId
                  }/registrations?tab=${"NotAttended"}`
                );
              }}
              className={`inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border shadow-sm ${
                tab === "NotAttended"
                  ? "border-transparent  bg-primary text-white "
                  : "border-slate-200 hover:border-slate-300 bg-white text-slate-500"
              } duration-150 ease-in-out`}
            >
              Not Attended
            </button>
          </li>
          <li className="m-1">
            <button
              onClick={() => {
                navigate(
                  `/events/${
                    eventsId.params.eventId
                  }/registrations?tab=${"CheckedIn"}`
                );
              }}
              className={`inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border shadow-sm ${
                tab === "CheckedIn"
                  ? "border-transparent  bg-primary text-white "
                  : "border-slate-200 hover:border-slate-300 bg-white text-slate-500"
              } duration-150 ease-in-out`}
            >
              Checked In
            </button>
          </li>
          <li className="m-1">
            <button
              onClick={() => {
                navigate(
                  `/events/${
                    eventsId.params.eventId
                  }/registrations?tab=${"CheckedOut"}`
                );
              }}
              className={`inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border shadow-sm ${
                tab === "CheckedOut"
                  ? "border-transparent  bg-primary text-white "
                  : "border-slate-200 hover:border-slate-300 bg-white text-slate-500"
              } duration-150 ease-in-out`}
            >
              Checked Out
            </button>
          </li>
        </ul>
      </div>

      {/* Attendee Table */}
      <TransactionsTable
        registrations={
          tab === "ViewAll" ? registrations : filteredRegistrations
        }
        showSearchResults={showSearchResults}
      />

      {/* Pagination */}
      {next && tab === "ViewAll" ? (
        <div className="mt-8">
          <PaginationClassic
            onClick={async () => {
              await getAllEventAttendees();
            }}
            total={total}
          />
        </div>
      ) : (
        []
      )}
      <br />
      <br />
      <br />
    </div>
  );
}

export default CheckinAttendees;
