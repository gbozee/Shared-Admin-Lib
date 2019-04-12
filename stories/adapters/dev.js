//@ts-check
import {
  testData,
  testDataTransactions,
  hiredData,
  defaultWorkingdata,
  sampleTutorDetailData,
  tutorList,
  getTutorDetail,
  testDataBookings,
  testDataGetBooking,
  filterBookingsByStatus,
  bookingData,
  skillData,
  searchAllBookings,
  requestsData,
  remarks,
  generateSlug
} from "./test_data";
import { saveFragment } from "../../src/shared/localStorage";
import { filterHelper } from ".";
let token = "TESTDATATOKEN";

function login(email, password) {
  return new Promise(resolve => resolve(token));
}

function authenticate(token) {
  return new Promise(resolve => resolve(true));
}

function getAllWithdrawals() {
  return new Promise(resolve => resolve(testData()));
}

function getTransactions(withrawalOrder) {
  return new Promise(resolve => resolve(testDataTransactions()));
}

function deleteTransaction(order) {
  return new Promise(resolve => resolve({}));
}

function deleteWithdrawal(order) {
  return new Promise(resolve => resolve());
}

function getBookingTransaction(transactionOrder) {
  return new Promise(resolve =>
    resolve({
      amount: "N2000",
      status: "TUTOR_HIRE",
      date: "2018-10-10 9:20:33",
      order: "AA101"
    })
  );
}

function makePayment(order) {
  return new Promise(resolve => resolve({}));
}

function getHiredTransactions(props, filterFunc) {
  //props could be dateFilter, searchParam
  if (Object.keys(props).length === 0) {
    return new Promise(resolve => resolve(hiredData));
  }
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(filterHelper(hiredData, props, filterFunc));
    }, 2000)
  );
}

function getTransactionDetail(props) {
  return new Promise(resolve =>
    resolve(hiredData.find(x => x.order.toLowerCase() === props.toLowerCase()))
  );
}

function saveVerifications(verifications) {
  saveFragment({
    VERIFICATIONS: verifications
  });
}

function getTutorVerificationWorkedOn(agent) {
  return new Promise(resolve => resolve(defaultWorkingdata));
}

function getAllUnverifiedTutors({ selection }) {
  let options = {
    new_applicant: x => x.verified === false,
    verified_tutors: x => x.verified === true
  };
  let filterFunc = options[selection];
  let result = filterFunc ? tutorList.filter(filterFunc) : tutorList;
  return new Promise(resolve => resolve(result));
}

function fetchTutorDetail(props) {
  let key = Object.keys(props).find(x => props[x] !== undefined);
  let result = getTutorDetail(key, props[key]);
  return new Promise(resolve => resolve(result));
}

function approveTutor(email, approved = false, verified = false) {
  let newTutor = { ...sampleTutorDetailData, verified: approved };
  return new Promise(resolve => resolve(newTutor));
}

function notifyTutorAboutEmail(email) {
  return new Promise(resolve => resolve());
}

function approveTutorEmail(email) {
  return new Promise(resolve => resolve());
}

function rejectProfilePic(email) {
  return new Promise(resolve => resolve());
}

function approveIdentification(email) {
  return new Promise(resolve => resolve());
}

function rejectIdentification(email) {
  return new Promise(resolve => resolve());
}

function uploadProfilePicEmail(email) {
  return new Promise(resolve => resolve());
}

function uploadVerificationIdEmail(email) {
  return new Promise(resolve => resolve());
}

const getAllBookings = params => {
  return new Promise(resolve => resolve(testDataBookings));
};

const getBooking = order => {
  return new Promise(resolve => resolve(testDataGetBooking(order)));
};

const filterBookings = status => {
  return new Promise(resolve => resolve(filterBookingsByStatus(status)));
};

const searchBookings = search => {
  return new Promise(resolve => resolve(searchAllBookings(search)));
};

const getAllBookingsFilter = ({ q }) => {
  let result = bookingData;
  if (q) {
    result = searchAllBookings(q, "not");
  }
  return new Promise(resolve => resolve(result));
};
const getTutorSkills = params => {
  return new Promise(resolve => resolve(skillData));
};
function skillAdminAction({ skill, email, action }) {
  let result = skill;
  if (["active", "modification", "deniend"].includes(action)) {
    result.status = action;
  }
  return new Promise(resolve => resolve(result));
}
function getRequestForAgent(agent, { dateFilter, selection, searchParam }) {
  let result = requestsData;
  console.log({ selection, dateFilter, searchParam, result });
  if (searchParam) {
    result = result.filter(
      x =>
        x.email.toLowerCase().includes(searchParam.toLowerCase()) ||
        x.slug.toLowerCase().includes(searchParam.toLowerCase())
    );
  }
  if (selection && selection !== "working") {
    result = result.filter(x => x.status === selection);
  }
  if (dateFilter && dateFilter.from && dateFilter.to) {
    result = result.filter(x => {
      let recordAsDate = new Date(x.created).getTime();
      let fromDate = new Date(dateFilter.from).getTime();
      let toDate = new Date(dateFilter.to).getTime();
      return recordAsDate >= fromDate && recordAsDate <= toDate;
    });
  }
  return new Promise(resolve => resolve(result));
}
function getRemarksByAgent(agent, data) {
  return new Promise(resolve => resolve(remarks));
}
//Todo: Implement
function getRequestsWorkedOn(agent) {
  return new Promise(resolve => resolve([{ slug: "ABCDESDDESS" }]));
}
//Todo: implement
function changeStatus(instance, status) {
  return new Promise(resolve => resolve({ ...instance, status }));
}
function saveRemarks(agent, data) {
  return new Promise(resolve => resolve(data));
}
function updateRequestRemark(instance, remark) {
  return new Promise(resolve => resolve());
}
function madePayment(instance) {
  return new Promise(resolve => resolve());
}
function loadGroupLessons(status) {
  let data = [
    {
      skill: "IELTS",
      no_of_students: 20,
      amount: 200000,
      status: "scheduled",
      schedule: "January Standard Class Ikeja",
      first_session: "2019-01-10",
      last_session: "2019-01-31",
      tutor: { first_name: "Chidiebere" },
      order: "AADDESSDES",
      created: "2019-01-10"
    },
    {
      skill: "IELTS",
      no_of_students: 20,
      amount: 200000,
      status: "completed",
      schedule: "January Weekend Class Ikeja",
      first_session: "2019-01-10",
      last_session: "2019-01-31",
      tutor: { first_name: "Chidiebere" },
      order: generateSlug(),
      created: "2019-01-10"
    },
    {
      skill: "IELTS",
      no_of_students: 20,
      amount: 200000,
      status: "initialized",
      schedule: "January Standard Class Gbagada",
      first_session: "2019-01-10",
      last_session: "2019-01-31",
      tutor: { first_name: "Chidiebere" },
      order: generateSlug(),
      created: "2019-01-10"
    },
    {
      skill: "IELTS",
      no_of_students: 20,
      amount: 200000,
      status: "scheduled",
      schedule: "January Weekend Class Gbagada",
      first_session: "2019-01-10",
      last_session: "2019-01-31",
      tutor: { first_name: "Chidiebere" },
      order: generateSlug(),
      created: "2019-01-01"
    },
    {
      skill: "IELTS",
      no_of_students: 20,
      amount: 200000,
      status: "scheduled",
      schedule: "Febuary Standard Class Ikeja",
      first_session: "2019-01-10",
      last_session: "2019-01-31",
      tutor: { first_name: "Chidiebere" },
      order: generateSlug(),
      created: "2019-02-10"
    }
  ];
  let result = data;
  if (status == "active") {
    result = result.filter(x => x.status === "scheduled");
  }
  return new Promise(resolve => resolve(result));
}
function addClientToGroupClass(
  instance,
  { full_payment, amount, class_group, class_text }
) {
  return new Promise(resolve => resolve());
}
function saveRequestInfo(instance, create = false) {
  let { schedule, skill, ...rest } = instance;
  let result = Boolean(instance.slug)
    ? instance
    : {
        ...rest,
        slug: "CREATEDSLUG",
        created: "2018-10-12 14:10:33",
        request_type: 5,
        full_name: `${instance.first_name} ${instance.last_name}`,
        request_subjects: [skill],
        request_info: {
          request_details: { schedule: { summary: schedule } }
        }
      };
  return new Promise(resolve => resolve(result));
}
export default {
  login,
  authenticate,
  //payment data
  getAllWithdrawals,
  getTransactions,
  getBookingTransaction,
  deleteTransaction,
  deleteWithdrawal,
  makePayment,
  getHiredTransactions,
  getTransactionDetail,
  saveVerifications,
  //tutor verification
  getTutorVerificationWorkedOn,
  getAllUnverifiedTutors,
  fetchTutorDetail,
  approveTutor,
  notifyTutorAboutEmail,
  approveTutorEmail,
  rejectProfilePic,
  rejectIdentification,
  approveIdentification,
  uploadProfilePic: uploadProfilePicEmail,
  uploadVerificationId: uploadVerificationIdEmail,
  // booking followup
  getAllBookings,
  getAllBookingsFilter,
  skillAdminAction,
  getTutorSkills,
  getBooking,
  filterBookings,
  searchBookings,
  // sales
  getRequestForAgent,
  getRemarksByAgent,
  getRequestsWorkedOn,
  changeStatus,
  saveRemarks,
  updateRequestRemark,
  madePayment,
  loadGroupLessons,
  addClientToGroupClass,
  saveRequestInfo
};
