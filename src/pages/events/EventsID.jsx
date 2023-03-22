import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
// import Loader from "../../../src/common/Loader/Loader";
import { getSingleEvent } from "../../redux/actions/eventActions";
import ScanIcon from "../../common/scanIcon/ScanIcon";
import SingleEvent from "../../components/events/SingleEvent";

function EventsId() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, isLoading] = useState(false);
  const eventsId = useMatch("events/:eventId/*");
  useEffect(() => {
    let pp = new Promise(async (resolve, reject) => {
      isLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        alert("Please Login!!");
        navigate("/login");
      }
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      if (!data) {
        alert("something went wrong!");
      } else {
        if (data.savedUserConfig?.organizer.events.length > 0) {
          let verifiedEventOrganizer = undefined;
          verifiedEventOrganizer = data.savedUserConfig?.organizer.events.find(
            (ele, index) => {
              return ele.toString() === eventsId.params.eventId;
            }
          );
          if (verifiedEventOrganizer) {
            resolve("verified");
          } else {
            reject("can't verify organizer");
          }
        } else {
          alert("Unauthorized!");
        }
      }
      if (data.error) {
        console.log(data.error);
      }
    })
      .then(() => {
        dispatch(getSingleEvent({ eventId: eventsId.params.eventId }));
        isLoading(false);
      })
      .catch(() => {
        alert("Unauthorized");
        navigate("/events");
      });
  }, []);

  if (loading) {
    return (
      <div className="fixed left-[0px] w-full h-full bg-[#dcdcdc1d]">
        <div className="text-center h-[100%] w-[100%]">
          <div className="h-[100vh] w-full grid place-items-center">
            <svg
              className="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <ScanIcon />
      </>
    );
  }
}

export default EventsId;
