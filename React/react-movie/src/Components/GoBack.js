import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const GoBackLink = styled(Link)`
  position: fixed;
  top: 83px;
  right: 80px;
  font-size: 50px;
  opacity: 0.8;
  &:hover {
    opacity: 0.6;
  }
`;

const GoBack = ({ pathName }) => (
  <GoBackLink to={`/${pathName}`}>{'< '}</GoBackLink>
);

GoBack.propTypes = {
  pathName: PropTypes.string.isRequired
};

export default GoBack;
