const cardsData = [
  {
    id: 1,
    icon: "⭕️",
    status: "open",
    title: "Human Interest Form",
    content: "Fill out human interest distribution form",
  },
  {
    id: 2,
    icon: "⭕️",
    status: "done",
    title: "Purchase present",
    content: "Get an anniversary gift",
  },
  {
    id: 3,
    icon: "⭕️",
    status: "in review",
    title: "Invest in investments",
    content: "Call the bank to talk about investments",
  },
  {
    id: 4,
    icon: "⭕️",
    status: "in progress",
    title: "Daily reading",
    content: "Finish reading Intro to UI/UX",
  },
];

const statuses = [
  {
    status: "open",
    icon: "⭕️",
    color: "#EB5A46",
  },
  {
    status: "in progress",
    icon: "🔆️",
    color: "#00C2E0",
  },
  {
    status: "in review",
    icon: "📝",
    color: "#C377E0",
  },
  {
    status: "done",
    icon: "✅",
    color: "#3981DE",
  },
];

export { cardsData, statuses };
