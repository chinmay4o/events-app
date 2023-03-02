export const tags = ["Technical", "Conference", "Developers"];

export const topMenu = [
  {
    name: "Home",
    icon: "fa-solid fa-house",
    path: "home",
  },
  {
    name: "Events",
    icon: "fa-solid fa-ticket",
    path: "events",
  },
  {
    name: "People",
    icon: "fa-solid fa-user-friends",
    path: "people",
  },
  {
    name: "Notifications",
    icon: "fa-solid fa-bell",
    path: "notifications",
  },
  {
    name: "Profile",
    icon: "fa-solid fa-user",
    path: "profile",
  },
];

export const bottomMenu = [
  {
    name: "Home",
    icon: "fa-solid fa-house",
    path: "home",
  },
  {
    name: "Event",
    icon: "fa-solid fa-ticket",
    path: "events",
  },
  {
    name: "People",
    icon: "fa-solid fa-user-friends",
    path: "people",
  },
  {
    name: "Notifications",
    icon: "fa-solid fa-bell",
    path: "notifications",
  },
  {
    name: "Profile",
    icon: "fa-solid fa-user",
    path: "profile",
  },
];

export const getTimerOptions = (interval) => {
  let timerOptions = [];
  let initialTime = 12;
  let totalTimeCount = 96;
  let timeFormat = "AM";
  let timeInterval = 0;
  for (let index = 1; index <= totalTimeCount; index++) {
    if (timeInterval === 60) {
      timeInterval = 0;
      initialTime += 1;
    }
    if (timeFormat === "AM")
      timerOptions.push({
        label: `${initialTime === 12 ? initialTime : initialTime - 12} : ${
          timeInterval === 0 ? "00" : timeInterval
        } ${timeFormat}`,
        value: `${initialTime === 12 ? initialTime : initialTime - 12} : ${
          timeInterval === 0 ? "00" : timeInterval
        } ${timeFormat}`,
      });
    if (timeFormat === "PM")
      timerOptions.push({
        label: `${initialTime === 24 ? initialTime - 12 : initialTime - 24} : ${
          timeInterval === 0 ? "00" : timeInterval
        } ${timeFormat}`,
        value: `${initialTime === 24 ? initialTime - 12 : initialTime - 24} : ${
          timeInterval === 0 ? "00" : timeInterval
        } ${timeFormat}`,
      });
    if (index === 48) timeFormat = "PM";
    if (timeInterval && timeInterval < 60) timeInterval += interval;
    if (timeInterval === 0) timeInterval += 15;
  }
  return timerOptions;
};

export const eventsTab = ["My Events", "Upcoming Events", "Past Events"];

export const eventDummyData = [
  {
    title: "NextConf 2022",
    description:
      "We aim to bring the best industry professionals together with people who believe in our future, open minds...",
    eventTime: "30 November, 2022 • 4:30 pm",
    eventTab: ["Technical", "Conference", "Developers"],
    imageLink: "/svgs/events.svg",
  },
  {
    title: "NextConf 2022",
    description:
      "We aim to bring the best industry professionals together with people who believe in our future, open minds...",
    eventTime: "30 November, 2022 • 4:30 pm",
    eventTab: ["Technical", "Conference", "Developers"],
    imageLink: "/svgs/events.svg",
  },
  {
    title: "NextConf 2022",
    description:
      "We aim to bring the best industry professionals together with people who believe in our future, open minds...",
    eventTime: "30 November, 2022 • 4:30 pm",
    eventTab: ["Technical", "Conference", "Developers"],
    imageLink: "/svgs/events.svg",
  },
  {
    title: "NextConf 2022",
    description:
      "We aim to bring the best industry professionals together with people who believe in our future, open minds...",
    eventTime: "30 November, 2022 • 4:30 pm",
    eventTab: ["Technical", "Conference", "Developers"],
    imageLink: "/svgs/events.svg",
  },
  {
    title: "NextConf 2022",
    description:
      "We aim to bring the best industry professionals together with people who believe in our future, open minds...",
    eventTime: "30 November, 2022 • 4:30 pm",
    eventTab: ["Technical", "Conference", "Developers"],
    imageLink: "/svgs/events.svg",
  },
  {
    title: "NextConf 2022",
    description:
      "We aim to bring the best industry professionals together with people who believe in our future, open minds...",
    eventTime: "30 November, 2022 • 4:30 pm",
    eventTab: ["Technical", "Conference", "Developers"],
    imageLink: "/svgs/events.svg",
  },
];

export const eventCategories = [
  // {
  //   name: "Startup conclave",
  //   image: "/svgs/food.svg",
  //   showCheck: false,
  // },
  // {
  //   name: "Exhibition",
  //   image: "/svgs/techincal.svg",
  //   showCheck: false,
  // },
  // {
  //   name: "Conference",
  //   image: "/svgs/pitch.svg",
  //   showCheck: false,
  // },
  // {
  //   name: "Tradeshow",
  //   image: "/svgs/cultural.svg",
  //   showCheck: false,
  // },
  // {
  //   name: "Seminar",
  //   image: "/svgs/group.svg",
  //   showCheck: false,
  // },
  {
    name: "In-person",
    image: "/svgs/product.svg",
    showCheck: false,
  },
  {
    name: "Virtual",
    image: "/svgs/conference.svg",
    showCheck: false,
  },
  {
    name: "Hybrid",
    image: "/svgs/techconference.svg",
    showCheck: false,
  },
];
