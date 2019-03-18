//@ts-check
const actions = {
  LOAD_DATA: "LOAD_DATA",
  LOAD_REMARKS: "LOAD_REMARKS",
  LOAD_WORKING_RECORDS: "LOAD_WORKING_RECORDS"
};
function getAgentRequest(params, { getAdapter, state }) {
  let { agent } = state.context.state;
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
const dispatch = (action, existingOptions = {}, firebaseFunc) => {
  let options = {
    [actions.LOAD_DATA]: getAgentRequest,
    [actions.LOAD_REMARKS]: getRemarksByAgent,
    [actions.LOAD_WORKING_RECORDS]: getRequestsWorkedOnByAgent,
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
