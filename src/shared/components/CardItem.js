import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Text, Button, Flex, Heading, Box } from '@rebass/emotion';
import { BookingForm } from '.';

/* 
  Mobile Card Item Component (Used for Work Experience, Education, Projects, etc.)
*/

const StyledSummaryCard = styled.div`
  transition-timing-function: ease-in-out;
  border: 2px solid #ebecf0;
  padding: 24px 16px 24px 24px;
  border-radius: 3px;

  button {
    cursor: pointer;
  }
`;

export class CardItem extends React.Component {
  state = {
    isOpen: false,
  };
  onCancel = () => {
    this.setState({isOpen: false})
  }
  render() {
    const {
      title,
      text,
      subtext,
      onDelete,
      heading,
      subheading,
      data,
    } = this.props;
    return (
      <StyledSummaryCard isOpen={this.state.isOpen}>
        {!this.state.isOpen ? (
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Heading>{heading}</Heading>
              <Text>{subheading}</Text>
            </Box>

            <Flex className="CardItem__ActionButtons">
              <Button
                className="Button"
                onClick={() => this.setState({ isOpen: true })}
              >
                Edit
              </Button>
              <Button onClick={onDelete} className="Button" ml={3}>
                Delete
              </Button>
            </Flex>
          </Flex>
        ) : (
          this.props.children(this.onCancel)
        )}
      </StyledSummaryCard>
    );
  }
}

CardItem.defaultProps = {
  heading: 'Heading',
  subheading: 'Sub-heading',
};
export default CardItem;
