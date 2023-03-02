import React, { useState, useCallback, useEffect, useContext } from "react";
import { useDropzone, ErrorCode } from "react-dropzone";
import { parse } from "papaparse";
import FileAttachedIcon from "../../../icons/FileAttachedIcon";
import FileProcessingIcon from "../../../icons/FileProcessingIcon";
import FileUploadIcon from "../../../icons/FileAttachedIcon";
import styles from "./Speakers.module.css";
import PrimaryButton from "../../../common/buttons/PrimaryButton";
import { patchRequest } from "../../../utils/API/api.ts";
import { UPDATE_EVENT } from "../../../redux/constants/eventConstants";
import { useDispatch } from "react-redux";
import { useMatch } from "react-router-dom";
// import { GlobalContext } from "../Layout/LayoutProvider";
// import Badge from "../components/Badge/Badge";

function CSVUpload({ setIsBulkUpload }) {
  const [status, setStatus] = useState("empty");
  const [error, setError] = useState();
  const [parseError, setParseError] = useState();
  const [hasIgnoredColumns, setHasIgnoredColumns] = useState(false);
  const [importedData, setImportedData] = useState({});
  const [recipients, setRecipients] = useState([]);
  const dispatch = useDispatch();
  const eventsid = useMatch("/events/:eventId");
  //   const { setImportedData } = useContext(GlobalContext);
  useEffect(() => {
    if (parseError) {
      handleUploadError("parseError", parseError);
    }
  }, [parseError]);

  const acceptedHeaders = [
    "firstName",
    "lastName",
    "email",
    "mobileNumber",
    "organization",
    "jobTitle",
    "city",
    "age",
    "bio",
  ];

  const onStatusChange = (newStatus) => {
    setStatus(newStatus);
    if (newStatus !== "success") {
      setRecipients([]);
    }
  };

  const checkHeaderValidity = (headers) => {
    let isValid = true;
    const missingColumns = [];
    for (const acceptedHeader of acceptedHeaders) {
      if (!headers.includes(acceptedHeader)) {
        isValid = false;
        missingColumns.push(acceptedHeader);
      }
    }
    return {
      isValid,
      missingColumns,
    };
  };

  const validateRecipients = (recipients) => {
    //   Check recipient data is present
    if (!recipients.length) {
      setParseError({
        type: "noRecipientData",
        message: "No Data is present in CSV File.",
      });
      return false;
    }

    // Check max limit for recipients
    if (recipients.length > 1000) {
      setParseError({
        type: "tooManyRecipients",
        message: "Too many entries are added.",
      });
      return false;
    }

    // Check recipient has "mobile_number" field, and this is a number
    const hasMobileNumber = recipients.every((recipient) => {
      const mobile_number = Number(recipient.mobileNumber);

      return (
        Number.isInteger(mobile_number) &&
        mobile_number > 0 &&
        `${mobile_number}`.length == 10
      );
    });

    if (!hasMobileNumber) {
      setParseError({
        type: "invalidMobileNumber",
        message: "Mobile Number is Invalid",
      });
      return false;
    }

    // Check that email and name are provided
    const areMandatoryFieldsProvided = recipients.every((recipient) => {
      console.log(recipient, "recipient");
      const { firstName, lastName, email, organization, mobileNumber } =
        recipient;
      return (
        firstName.length &&
        lastName.length &&
        email.length &&
        organization.length &&
        mobileNumber.length
      );
    });

    if (!areMandatoryFieldsProvided) {
      setParseError({
        type: "fieldsAreMandatory",
        message: "All fields are mandatory",
      });
      return false;
    }

    // Check if email is valid
    const invalidEmailIndexes = [];
    recipients.forEach((recipient, index) => {
      const { email } = recipient;
      const emailRegex =
        /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/i;
      if (!emailRegex.test(email) && email.length !== 0)
        invalidEmailIndexes.push(email);
    });

    if (invalidEmailIndexes.length > 0) {
      setParseError({
        type: "invalidEmails",
        message: `${"invalidEmails"} ${invalidEmailIndexes.join(", ")}`,
      });
      return false;
    }

    return recipients.map((recipient) => {
      console.log(recipient, "====recipient====");
      return {
        userEmail: recipient.email,
        data: {
          userData: {
            firstName: recipient.firstName,
            lastName: recipient.lastName,
            jobTitle: recipient.jobTitle,
            organization: recipient.organization,
            email: recipient.email,
            age: recipient.age,
          },
          eventSpecificData: {
            bio: recipient.bio,
            eventId: "63724fc15a255ca37898b9b4",
            eventSpecificRole: "speaker",
          },
        },
      };
    });
  };

  const onFileUploaded = (fileContents) => {
    parse(fileContents, {
      header: true,
      skipEmptyLines: "greedy",
      complete: (results) => {
        if (!results.errors.length) {
          console.log("11", results);
          const parsedHeaders = results.meta.fields || [];
          const parsedData = results.data;
          const headerValidity = checkHeaderValidity(parsedHeaders);
          if (headerValidity.isValid) {
            // if (true) {
            // setHeaders(acceptedHeaders);

            // Check if any columns in uploaded csv were ignored
            console.log(parsedHeaders, "parsedHeaders");
            parsedHeaders.length > 9 //To be updated when any other field is added
              ? setHasIgnoredColumns(true)
              : setHasIgnoredColumns(false);

            const validatedRecipients = validateRecipients(parsedData);

            console.log(validatedRecipients, "validatedRecipients");
            if (validatedRecipients) {
              setRecipients(validatedRecipients);
              setImportedData(validatedRecipients);
              setParseError(null);
              onStatusChange("success");
            }
          } else {
            setParseError({
              type: "missingColumns",
              message: `${"Missing Columns"} ${headerValidity.missingColumns.join(
                ", "
              )}`,
            });
          }
        } else {
          const error = results.errors[0];
          if (error.row === 0 && error.code === "TooManyFields") {
            setParseError({
              type: "instructionRowError",
              message: "Delete the instruction row before upload.",
            });
          } else {
            setParseError({
              type: "generalError",
              message: "General upload error occurred.",
            });
          }
        }
      },
    });
  };

  const handleUploadError = (errorType, error) => {
    switch (errorType) {
      case ErrorCode.FileInvalidType:
        setError({
          type: "fileInvalidType",
          message: "The file type is invalid",
        });
        break;
      case ErrorCode.TooManyFiles:
        setError({
          type: "tooManyFiles",
          message: "Too many files are uploaded.",
        });
        break;
      case ErrorCode.FileTooLarge:
        setError({
          type: "fileTooLarge",
          message: "The file is too large.",
        });
        break;
      case ErrorCode.FileTooSmall:
        setError({
          type: "fileTooSmall",
          message: "The file is too small.",
        });
        break;
      case "parseError":
        if (error) setError({ ...error });
        else
          setError({
            type: "generalError",
            message: "General parse error has occurred. Please contact admin.",
          });
        break;
      default:
        setError({
          type: "generalError",
          message: "General parse error has occurred. Please contact admin.",
        });
        break;
    }
    onStatusChange("error");
  };

  const onDropAccepted = useCallback((acceptedFiles) => {
    onStatusChange("processing");
    try {
      const reader = new FileReader();
      reader.readAsText(acceptedFiles[0]);
      reader.onabort = () => {
        handleUploadError("file reading was aborted");
      };
      reader.onerror = () => {
        handleUploadError("file reading has failed");
      };
      reader.onload = (event) => {
        const csv = event.target?.result;
        onFileUploaded(csv);
      };
      setError(null);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const onDropRejected = useCallback((fileRejections) => {
    const error = fileRejections[0].errors[0].code;
    console.log(error);
    handleUploadError(error);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "text/csv": [".csv"] },
    multiple: false,
    minSize: 1,
    maxSize: 5242880,
    onDropRejected: onDropRejected,
    onDropAccepted: onDropAccepted,
  });

  const renderWidgetIcon = (status) => {
    switch (status) {
      case "success":
        return <FileAttachedIcon />;
      case "processing":
        return <FileProcessingIcon />;
      case "empty":
      case "error":
      default:
        return <FileUploadIcon />;
    }
  };

  const renderStatusText = () => {
    let statusText;
    switch (status) {
      case "success":
        statusText = `CSV Upload Status: ${status}`;
        if (hasIgnoredColumns) {
          statusText = statusText.concat(" - ", "ignoredColumns");
        }
        break;
      case "error":
        statusText = `CSV Upload Status: ${status} - ${error?.message}`;
        break;
      default:
        return null;
    }
    return <div>{statusText}</div>;
  };

  return (
    // <div className={styles.csvContainer}>
    <div className={styles.csvContainer}>
      <div className={styles.csvInner}>
        <h3>Upload CSV</h3>
        {/* <select>
          <option>Exhibitor</option>
          <option>Volunteer</option>
          <option>Service Worker</option>
        </select> */}

        <p className={styles.docLink}>
          Please refer to the{" "}
          <a target="_blank" href="/" rel="noreferrer">
            documentation here
          </a>
          , and download{" "}
          <a className="text-primary" href="/speakersDefault.csv">
            template here
          </a>
        </p>

        <div
          {...getRootProps({
            // className: `uploadWidget`,
          })}
          className="min-h-[100px] h-[50%] w-[100px] m-auto bottom-2 border-red-500"
        >
          <input {...getInputProps()} />
          {renderWidgetIcon(status)}
          {renderStatusText(status, error, hasIgnoredColumns)}
          <p>Upload CSV</p>
        </div>
        <PrimaryButton
          btnText="Add Speakers"
          onClick={async () => {
            if (recipients.length > 0) {
              try {
                const response = await patchRequest(
                  `/event/${eventsid.params.eventId}/bulkRegister/speaker`,
                  recipients
                );
                console.log(response, "response");
                if (response) {
                  dispatch({
                    type: UPDATE_EVENT,
                    payload: {
                      speakers: response.data.message.speakers,
                    },
                  });
                  setIsBulkUpload(false);
                }
              } catch (err) {
                console.log(err);
              }
            }
            console.log("Clicked");
          }}
        />
      </div>
    </div>
  );
}

export default CSVUpload;
