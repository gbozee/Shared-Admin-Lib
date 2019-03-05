import { useState, useEffect } from "react";
import { parseQuery } from "../shared/utils";
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

export const useSalesHook = location => {
  let { search } = location;
  let { from = "", to = "", q = "", status = "" } = parseQuery(search);
  let [dateFilter, setDateFilter] = useState({ from, to });
  let [searchParam, setSearchParam] = useState(q);
  let [filter, setFilter] = useState(status);
  let [selection, setSelection] = useState("");
  let [loading, setLoading] = useState(false);

  const serverSearch = () => {};
  return {
    state: { dateFilter, searchParam, filter, selection, loading },
    actions: {
      setDateFilter,
      setSearchParam,
      setFilter,
      setSelection,
      serverSearch
    }
  };
};
