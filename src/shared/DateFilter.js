/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Box, Flex, Button } from "@rebass/emotion";
import React from "react";
import { Input } from "./LoginPage";
import format from "date-fns/format";
import subMonths from "date-fns/sub_months";

function currentMonth() {
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return {
    from: format(firstDay, "YYYY-MM-DD"),
    to: format(lastDay, "YYYY-MM-DD")
  };
}
let monthsAgo = format(subMonths(new Date(), 2), "YYYY-MM-DD");
class FromTo extends React.Component {
  state = this.props.value || {
    from: monthsAgo,
    to: currentMonth().to
  };
  //   static getDerivedStateFromProps(props, state) {
  //     let { value = { from: "", to: "" } } = props;
  //     if (value.from !== state.from || value.to !== state.to) {
  //       return value;
  //     }
  //     return null;
  //   }
  onChange = key => {
    return e => {
      this.setState({ [key]: e.target.value }, () => {
        this.props.onChange(this.state);
      });
    };
  };
  render() {
    return (
      <Flex>
        <Input
          label="From"
          type="date"
          name="from"
          isValid
          value={this.state.from}
          onChange={this.onChange("from")}
        />
        <Input
          value={this.state.to}
          label="To"
          type="date"
          name="to"
          isValid
          onChange={this.onChange("to")}
        />
        <Button
          py="4px"
          mt="24px"
          onClick={() => {
            let today = currentMonth();

            this.setState(today, () => {
              this.props.onChange(this.state);
            });
          }}
          css={css`
            height: 36px;
            align-self: center;
            margin-top: 26px;
            border-radius: 0;
          `}
        >
          {this.props.buttonText || "Reset"}
        </Button>
      </Flex>
    );
  }
}

export const DateFilter = ({
  onChange,
  onSearchChange,
  displayDate = true,
  searchValue,
  onKeyDown = () => {},
  onFilterChange = () => {},
  filterOptions = [],
  dateValue = {
    from: "",
    to: ""
  },
  selection,
  placeholder = "Search either email or order",
  buttonText,
  searchButton = {},
  filters = [],
  filterOptionsLabel,
  children
}) => {
  return (
    <Flex
      css={css`
        flex: 1;
      `}
      justifyContent="space-between"
    >
      {onSearchChange ? (
        <Box
          w={1}
          pr={4}
          css={css`
            flex: 1;
            align-self: flex-end;
          `}
        >
          <Input
            onChange={onSearchChange}
            onKeyDown={onKeyDown}
            value={searchValue}
            isValid
            placeholder={placeholder}
          />
        </Box>
      ) : null}
      {filters.length > 0 && (
        <Box
          pr={4}
          css={css`
            align-self: flex-end;
          `}
        >
          {filters.map(filter => (
            <select
              css={css`
                height: 36px;
                align-self: flex-end;
                margin-bottom: 16px;
                margin-left: 20px;
                // width: 100%;
              `}
              value={filter.selection}
              onChange={onFilterChange}
            >
              {filter.options.map(option => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ))}
        </Box>
      )}

      {onChange ? (
        <Flex flexDirection="column">
          <FromTo
            buttonText={buttonText}
            value={dateValue}
            onChange={onChange}
          />
        </Flex>
      ) : null}
      {filterOptions.length > 0 ? (
        <Box
          css={css`
            align-self: flex-end;
          `}
        >
          {filterOptionsLabel}
          <select
            css={css`
              height: 36px;
              align-self: flex-end;
              margin-bottom: 16px;
              margin-left: 20px;
            `}
            value={selection}
            onChange={onFilterChange}
          >
            {filterOptions.map(option => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Box>
      ) : null}
      {searchButton.display ? (
        <Button
          mt="24px"
          ml="10px"
          css={css`
            height: 40px;
            align-self: center;
            ${searchButton.styles || ""};
          `}
          onClick={searchButton.onClick}
        >
          {searchButton.text || "Search"}
        </Button>
      ) : null}
      {children}
    </Flex>
  );
};
