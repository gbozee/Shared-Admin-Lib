/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Flex } from "@rebass/emotion";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../shared/DataContext";
import { Button } from "../shared/primitives";
import { SectionListPage } from "../shared/reusables";
import { DateFilter } from "../shared/DateFilter";
import { Link } from "react-router-dom";

export const VTransactionPage = ({ detailPageUrl }) => {
  let { dispatch, actions } = useContext(DataContext);
  let [selection, setSelection] = useState("");
  let [searchParams, setSearchParams] = useState("");
  let [data, setData] = useState([]);
  useEffect(() => {
    dispatch({ type: actions.FETCH_TUTOR_WORKING_DATA }).then(dd => {
      setData(dd);
    });
  }, []);
  function getFilteredResult() {
    let result = selection
      ? data.filter(x => x.actions.includes(selection))
      : data;
    result =
      Boolean(searchParams) && searchParams.length > 2
        ? result.filter(x => x.email.includes(searchParams))
        : result;
    return result;
  }
  const onSearch = e => {
    setSearchParams(e.target.value);
  };

  const onKeyDown = e => {
    if (e.keyCode === 13) {
    }
  };
  const saveProgress = () => {
    dispatch({ type: actions.SAVE_PROGRESS });
  };
  const dropdown_actions = {
    EMAIL_VERIFICATION: "email_verification",
    ID_VERIFICATION: "id_verification",
    PROFILE_VERIFICATION: "profile_verification"
  };
  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column">
        <DateFilter
          onSearchChange={onSearch}
          onKeyDown={onKeyDown}
          displayDate={false}
          selection={selection}
          onFilterChange={e => setSelection(e.target.value)}
          placeholder="Search by email"
          filterOptions={[
            { value: "", label: "All" },
            {
              value: dropdown_actions.EMAIL_VERIFICATION,
              label: "Email Verification"
            },
            {
              value: dropdown_actions.ID_VERIFICATION,
              label: "ID Verification"
            },
            {
              value: dropdown_actions.PROFILE_VERIFICATION,
              label: "Profile Pic Verification"
            }
          ]}
        />
      </Flex>
      <Button
        width={1 / 4}
        css={css`
          :active {
            opacity: 0.7;
          }
          :hover {
            cursor: pointer;
          }
        `}
        onClick={saveProgress}
      >
        Save Progress
      </Button>
      <Flex flexDirection="column">
        <SectionListPage
          data={getFilteredResult()}
          callback={record => ({
            heading: record.full_name,
            subHeading: record.email,
            rightSection: record.actions.map((x, i) => (
              <div key={`${x}-${i}`}>{x}</div>
            )),
            to: detailPageUrl(record.email)
          })}
          LinkComponent={Link}
        />
      </Flex>
    </Flex>
  );
};

export default VTransactionPage;
