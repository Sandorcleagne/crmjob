export const scheduledCandidateInfo = (
  candidateInfo,
  candidateScheduleList,
  cdDaata
) => [
  // {
  //   id: 1,
  //   label: "Candidate Name",
  //   name: "candidateName",
  //   div_class: "col-12 col-md-6 col-xxl-4",
  //   id: "candidateName",
  //   value: candidateInfo.candidateName,
  //   type: "text",
  // },
  // {
  //   id: 2,
  //   label: "Candidate Profile",
  //   name: "condidateProfile",
  //   div_class: "col-12 col-md-6 col-xxl-4",
  //   id: "condidateProfile",
  //   value: candidateInfo.condidateProfile,
  //   type: "text",
  // },
  // {
  //   id: 3,
  //   label: "Interview Round",
  //   name: "interviewRound",
  //   div_class: "col-12 col-md-6 col-xxl-4",
  //   id: "interviewRound",
  //   value: candidateInfo.interviewRound,
  //   type: "text",
  // },
  // {
  //   id: 4,
  //   label: "Status",
  //   name: "status",
  //   div_class: "col-12 col-md-6 col-xxl-4",
  //   id: "status",
  //   value: candidateInfo.status,
  //   type: "text",
  // },
  {
    id: 5,
    label: "Interview Round",
    name: "interviewRound",
    div_class: "col-12 col-md-6 col-xxl-4",
    id: "interviewRound",
    value: candidateScheduleList.length === 0 ? "Round 1" : cdDaata[0],
    placeholder: candidateScheduleList.length === 0 ? "Round 1" : cdDaata[0],
    type: "text",
  },

  {
    id: 6,
    label: "Interviewer Name",
    name: "interviewerName",
    div_class: "col-12 col-md-6 col-xxl-4",
    id: "interviewerName",
    value: candidateInfo.interviewerName,
    placeholder: "Interviewer Name",
    type: "text",
    required: true,
  },
  // {
  //   id: 7,
  //   label: "Interview Date",
  //   name: "dateAndTimeOfInterview",
  //   div_class: "col-12 col-md-6 col-xxl-4",
  //   id: "dateAndTimeOfInterview",
  //   value: candidateInfo.dateAndTimeOfInterview,
  //   placeholder: "Interview Date",
  //   type: "datetime-local",
  // },
];
