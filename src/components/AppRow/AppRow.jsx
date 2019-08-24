import React from 'react';
import PropTypes from 'prop-types';

import classes from './appRow.module.scss';
import IconButton from '../IconButton/iconButton';

const AppRow = ({
  appDetails, clickAppDetails, clickDelete, icon,
}) => (
  <tr className={classes.row} onClick={clickAppDetails}>
    <td>{appDetails.appName}</td>
    <td>{appDetails.activeInstalls}</td>
    <td>{appDetails.avgRating}</td>
    <td>{appDetails.lastUpdate}</td>
    <td>{appDetails.status}</td>
    <td><IconButton iconComponent={icon} onClick={clickDelete} /></td>
  </tr>
);

AppRow.propTypes = {
  appDetails: PropTypes.shape({
    appName: PropTypes.string.isRequired,
    activeInstalls: PropTypes.string.isRequired,
    avgRating: PropTypes.string.isRequired,
    lastUpdate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  clickAppDetails: PropTypes.func.isRequired,
  clickDelete: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
};

export default AppRow;
