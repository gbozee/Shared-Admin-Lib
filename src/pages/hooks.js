import { useState, useEffect } from "react";
import { parseQuery } from "../shared/utils";
import format from "date-fns/format";
import subMonths from "date-fns/sub_months";

export const useLoadData = ({ fetchData }) => {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchList();
  }, []);
  const fetchList = (refresh = false) => {
    setLoading(true);
    fetchData(refresh).then(result => {
      setLoading(false);
      setData(result);
    });
  };
  const refreshList = () => {
    fetchList(true);
  };
  //When a list of filters exist
  const onFilterChange = e => {
    setData([]);
    setSelection(e.target.value);
    fetchList(true);
  };
  return [
    { data, loading },
    { setData, setLoading, refreshList, onFilterChange }
  ];
};
let monthsAgo = format(subMonths(new Date(), 2), "YYYY-MM-DD");
let current = format(new Date(), "YYYY-MM-DD");
export const useSalesHook = (location = {}) => {
  let { search = "" } = location;
  let {
    from = monthsAgo,
    to = current,
    q = "",
    status = "",
    displayModal = "false"
  } = parseQuery(search);
  let [dateFilter, setDateFilter] = useState({ from, to });
  let [searchParam, setSearchParam] = useState(q);
  let [filter, setFilter] = useState(status);
  let [selection, setSelection] = useState(status);
  let [loading, setLoading] = useState(false);

  const serverSearch = () => {};
  return {
    state: {
      dateFilter,
      searchParam,
      filter,
      selection,
      loading,
      displayModal: displayModal === "true"
    },
    actions: {
      setDateFilter,
      setSearchParam,
      setFilter,
      setSelection,
      serverSearch
    }
  };
};
