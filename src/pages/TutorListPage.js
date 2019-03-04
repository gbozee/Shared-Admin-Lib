/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Flex, Button } from "@rebass/emotion";
import { useState, useEffect, useContext } from "react";
import { ListItem } from "../shared/reusables";
import { Link } from "react-router-dom";
import { DataContext } from "../shared/DataContext";
import { SpinnerContainer } from "../shared/primitives/Spinner";

import { DateFilter } from "../shared/DateFilter";
function determineAge(date) {
  let year = new Date(date).getFullYear();

  return new Date().getFullYear() - year;
}
const TutorListPage = ({ detailPageUrl = () => {} }) => {
  const context = useContext(DataContext);
  let [tutors, setTutors] = useState([]);
  let [selection, setSelection] = useState("");
  let [searchParams, setSearchParams] = useState("");
  useEffect(() => {
    fetchList(true);
  }, []);
  const workedOn = slug => {};
  const onSearch = e => {
    setSearchParams(e.target.value);
  };
  const onKeyDown = e => {
    if (e.keyCode === 13) {
    }
  };
  const fetchList = (refresh = false) => {
    let { dispatch, actions } = context;
    dispatch({
      type: actions.GET_UNVERIFIED_TUTORS,
      value: { refresh, selection: selection }
    }).then(data => {
      setTutors(data);
    });
  };
  const refreshList = () => {
    fetchList(true);
  };
  const getState = (location = []) => {
    if (location) {
      let result = location[0] || {};
      return result.state;
    }
  };
  return (
    <SpinnerContainer condition={tutors.length === 0}>
      <Flex flexDirection="column">
        <Flex
          flexDirection="row-reverse"
          justifyContent="space-between"
          pr={2}
          pb={3}
          width={1}
        >
          <Button
            css={css`
              :active {
                opacity: 0.7;
              }
              :hover {
                cursor: pointer;
              }
            `}
            onClick={refreshList}
          >
            Fetch More Records
          </Button>
          <Flex
            flexDirection="column"
            css={css`
              flex: 1;
            `}
          >
            <DateFilter
              displayDate={false}
              onKeyDown={onKeyDown}
              onSearchChange={onSearch}
              selection={selection}
              onFilterChange={e => {
                setTutors([]);
                setSelection(e.target.value);
                fetchList(true);
              }}
              placeholder="Search by email"
              filterOptions={[
                { value: "", label: "All" },
                {
                  value: "new_applicants",
                  label: "New Applicants Only"
                },
                { value: "verified_tutors", label: "Verified Tutors" }
              ]}
            />
          </Flex>
        </Flex>
        <Flex flexDirection="column">
          {tutors.map(tutor => (
            <ListItem
              key={tutor.slug}
              date={`Age (${determineAge(tutor.dob)})`}
              heading={tutor.full_name}
              subHeading={getState(tutor.locations)}
              gender={tutor.gender}
              rightSection={tutor.email_verified}
              to={detailPageUrl(tutor.slug)}
              verified={tutor.verified}
              Link={Link}
            />
          ))}
        </Flex>
      </Flex>
    </SpinnerContainer>
  );
};
export default TutorListPage;
