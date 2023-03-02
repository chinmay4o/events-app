const GoogleCalendar = ({ singleEvent, setGoogleCal }) => {
  setGoogleCal(false);
  let gapi = window.gapi;
  let DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  let SCOPES = "https://www.googleapis.com/auth/calendar.events";

  gapi.load("client:auth2", () => {
    gapi.client.init({
      apiKey: process.env.REACT_APP_API_KEY,
      clientId: process.env.REACT_APP_CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
      plugin_name: "Warpbay",
    });

    gapi.client.load("calendar", "v3");

    gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(() => {
        const event = {
          summary: singleEvent.title,
          location: singleEvent.location?.city,
          description: singleEvent.shortDescription,
          start: {
            dateTime: singleEvent.startDate,
          },
          end: {
            dateTime: singleEvent.endDate,
          },
          attachments: [
            {
              fileUrl: singleEvent.coverImage,
            },
          ],
          reminders: {
            useDefault: false,
            overrides: [
              { method: "popup", minutes: 30 }, //30 min before event
              { method: "popup", minutes: 300 }, //5 hours before event
              { method: "popup", minutes: 1440 }, //24 hours before event
            ],
          },
        };

        let request = gapi.client.calendar.events.insert({
          calendarId: "primary",
          resource: event,
        });

        request.execute((event) => {
          window.open(event.htmlLink);
        });
      });
  });
};

export default GoogleCalendar;
