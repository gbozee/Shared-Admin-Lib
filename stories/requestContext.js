//@ts-check
const actions = {
  LOAD_DATA: "LOAD_DATA",
  LOAD_REMARKS: "LOAD_REMARKS",
  LOAD_WORKING_RECORDS: "LOAD_WORKING_RECORDS",
  CHANGE_STATUS: "CHANGE_STATUS",
  UPDATE_REMARK: "UPDATE_REMARK",
  MADE_PAYMENT: "MADE_PAYMENT",
  LOAD_GROUP_LESSONS: "LOAD_GROUP_LESSONS",
  CREATE_BOOKING_FOR_CLIENT: "CREATE_BOOKING_FOR_CLIENT"
};
function getAgentRequest(params, { getAdapter, state }) {
  let { agent } = state.context.state;
  console.log("[loading]:...")
  return getAdapter().getRequestForAgent(agent, params);
}
function getRemarksByAgent(params, { getAdapter, state }) {
  let { agent } = state.context.state;
  return getAdapter().getRemarksByAgent(agent);
}
function getRequestsWorkedOnByAgent(params, { getAdapter, state }) {
  let { agent } = state.context.state;
  return getAdapter().getRequestsWorkedOn(agent);
}
function onStatusChange({ status, instance }, { getAdapter, state }) {
  return getAdapter().changeStatus(instance, status);
}
function updateRemark({ remarks, remark, instance }, { getAdapter, state }) {
  let { agent } = state.context.state;
  getAdapter().updateRequestRemark(instance, remark);
  return getAdapter().saveRemarks(agent, remarks);
}
function onMadePayment({ instance }, { getAdapter, state }) {
  console.log("Made Payment");
  return getAdapter().madePayment(instance);
}
function loadGroupLessons({ status }, { getAdapter }) {
  return getAdapter().loadGroupLessons(status);
}
function addClientToGroupClass({ instance, ...params }, { getAdapter }) {
  return getAdapter().addClientToGroupClass(instance, params);
}
const dispatch = (action, existingOptions = {}, firebaseFunc) => {
  let options = {
    [actions.LOAD_DATA]: getAgentRequest,
    [actions.LOAD_REMARKS]: getRemarksByAgent,
    [actions.LOAD_WORKING_RECORDS]: getRequestsWorkedOnByAgent,
    [actions.CHANGE_STATUS]: onStatusChange,
    [actions.UPDATE_REMARK]: updateRemark,
    [actions.MADE_PAYMENT]: onMadePayment,
    [actions.LOAD_GROUP_LESSONS]: loadGroupLessons,
    [actions.CREATE_BOOKING_FOR_CLIENT]: addClientToGroupClass,
    ...existingOptions
  };
  return options;
};
const componentDidMount = ({ state }, firebaseFunc) => {};
export default {
  componentDidMount,
  actions,
  dispatch,
  keys: {
    analytics: "request_analytics",
    storage: "request_working_data"
  }
};
