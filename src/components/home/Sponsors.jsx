import { useSearchParams } from "react-router-dom";
import RandomImageGenerator from "../../common/image/RandomImageGenerator";

const SponsorsTab = ({ exhibitors }) => {
  const [searchParams] = useSearchParams();
  return (
    <div className="flex flex-col">
      {exhibitors && exhibitors.length > 0 ? (
        exhibitors.map((exhibitor, index) => (
          <>
            <div className="mt-5 flex items-center">
              {exhibitor.profilePicture ? (
                <img
                  src={exhibitor.profilePicture}
                  className="h-[50px] w-[50px] rounded-[50%] object-cover"
                />
              ) : (
                <RandomImageGenerator name={exhibitor.firstName} />
              )}
              <div className="pl-2.5 flex flex-col">
                <p className="font-[500] text-[14px]">
                  {
                    exhibitor.exhibitorAndSponsor.eventSpecificData.filter(
                      (ele, id) => {
                        return (
                          ele.eventId.toString() === searchParams.get("eventId")
                        );
                      }
                    )[0].companyName
                  }
                </p>
                <p className="font-[500] text-[13px] text-[#8d8d8d]">
                  {
                    exhibitor.exhibitorAndSponsor.eventSpecificData.filter(
                      (ele, id) => {
                        return (
                          ele.eventId.toString() === searchParams.get("eventId")
                        );
                      }
                    )[0].industry
                  }
                </p>
                <span className="font-medium text-sm text-black text-opacity-50">
                  {exhibitor.jobTitle}
                  {exhibitor.jobTitle && exhibitor.organization ? ", " : ""}
                  {exhibitor.organization}
                </span>
              </div>
            </div>
            <div className="w-full mt-2.5 bg-[#CFCFCF]">
              <hr />
            </div>
          </>
        ))
      ) : (
        <img
          src="/svgs/nullState.svg"
          height={250}
          width={250}
          className="py-5 pt-10 mb-12"
        />
      )}
    </div>
  );
};

export default SponsorsTab;
