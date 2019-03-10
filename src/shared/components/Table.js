/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import styled from "@emotion/styled";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { color } from "../design-systems/color";
import Spinner from "../primitives/Spinner";
import { Text } from "@rebass/emotion";
import { Icon } from "../primitives/Icon";
import { Button } from "../primitives";
import { font_family } from "../design-systems/font";
import selectTableHOC from "react-table/lib/hoc/selectTable";

const StyledTable = styled.div`
  padding: 30px;
  height: calc(100vh - 128px);
  overflow: auto;
  background-color: ${color.gray.ui_03};

  .Chakra-Table__Wrapper {
    overflow: auto;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 4px,
      rgba(0, 0, 0, 0.06) 0px 2px 12px;
  }

  .Chakra-Table__Row {
    ${props => props.tableRowCSS};
  }

  .Chakra-Table__Head {
    ${props => props.tableHeadCSS}
  }
`;
const SelectTable = selectTableHOC(ReactTable);
const Table = ({
  isLoading,
  onPageChange,
  onClickRow,
  onPageSizeChange,
  pageSize,
  currentPage,
  showPagination,
  totalPages,
  tableRowStyle,
  tableRowCSS,
  tableHeadCSS,
  hasError,
  onRefresh,
  errorText,
  data,
  columns,
  tableWrapperCSS,
  adminActions,
  ...rest
}) => {
  let [selectedAll, setSelectedAll] = React.useState(false);
  let [selectedItems, setSelectedItems] = React.useState([]);
  return (
    <StyledTable {...{ tableRowCSS, tableHeadCSS, tableWrapperCSS }}>
      {adminActions}
      <div className="Chakra-Table__Wrapper">
        <SelectTable
          toggleAll={(...args) => {
            setSelectedAll(value => !value);
          }}
          selectAll={selectedAll}
          toggleSelection={(field, value, data) => {
            console.log({ field, value, data });
            let clean = field.split("select-")[1];
            let newSelect = selectedItems.includes(clean);
            if (newSelect) {
              setSelectedItems(selectedItems.filter(x => x !== clean));
            } else {
              setSelectedItems([...selectedItems, clean]);
            }
          }}
          isSelected={val => {
            console.log(val);
            return selectedAll || selectedItems.includes(val);
          }}
          style={{
            fontFamily: font_family,
            backgroundColor: "white",
            border: "none",
            borderRadius: 4
          }}
          getTbodyProps={(state, rowInfo, column, instance) => {
            return {
              style: {
                border: "none"
              }
            };
          }}
          getTheadProps={(state, rowInfo, column, instance) => {
            return {
              style: {
                boxShadow: "none",
                borderBottom: "1px solid rgb(234, 239, 240)"
              },
              className: "Chakra-Table__Head"
            };
          }}
          getPaginationProps={() => {
            return {
              style: {
                boxShadow: "none",
                borderTop: "1px solid rgb(234, 239, 240)"
              }
            };
          }}
          getTdProps={() => {
            return {
              style: {
                padding: "12px 24px",
                border: "none",
                display: "flex",
                alignItems: "center"
              }
            };
          }}
          getTheadThProps={(state, rowInfo, column, instance) => {
            return {
              style: {
                fontWeight: 500,
                padding: "16px 24px",
                color: "rgb(73, 85, 102)",
                fontSize: 14,
                width: "auto",
                border: "none",
                textAlign: "left"
              }
            };
          }}
          getTrGroupProps={(state, rowInfo, column, instance) => {
            return {
              style: {
                fontSize: 14,
                color: "#273444",
                userSelect: "none",
                ...tableRowStyle
              },
              onClick: onClickRow,
              className: "Chakra-Table__Row"
            };
          }}
          // manual
          className="Chakra-Table"
          data={data}
          loading={isLoading}
          columns={columns}
          resizable={false}
          minRows={1}
          pages={totalPages}
          page={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
          LoadingComponent={({ isLoading, loadingText }) =>
            isLoading ? <LoadingOverlay>{loadingText}</LoadingOverlay> : null
          }
          onPageSizeChange={onPageSizeChange}
          // showPagination={showPagination}
          PaginationComponent={props => {
            console.log(props);
            return <div />;
          }}
          {...rest}
        />
        {hasError && (
          <ErrorOverlay onRefresh={onRefresh}>{errorText}</ErrorOverlay>
        )}
      </div>
    </StyledTable>
  );
};

const StyledLoading = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  opacity: 1;
  z-index: 2;
  pointer-events: all;
`;

const LoadingOverlay = ({ children }) => (
  <StyledLoading>
    <Spinner size={32} />
    <Text mt="12px" color={color.gray.light}>
      {children}
    </Text>
  </StyledLoading>
);

const StyledError = styled(StyledLoading)`
  /* background-color: white; */
`;

const ErrorOverlay = ({ onRefresh, children }) => (
  <StyledError>
    <Icon size={48} color={color.red.primary} name="cancel" />
    <Text mt="24px" color={color.red.dark} align="center">
      {children}
    </Text>
    <Button
      iconBefore="refresh"
      size="small"
      marginTop="16px"
      onClick={onRefresh}
    >
      Refresh
    </Button>
  </StyledError>
);

export default Table;
