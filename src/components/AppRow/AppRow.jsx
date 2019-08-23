import React from 'react';
import PropTypes from 'prop-types';

import classes from './appRow.module.scss';
import IconButton from '../IconButton/iconButton';

const CreateApp = (props) => {
  const {
    clickAppDetails, clickDelete, title, activeInstalls, avgRating, lastUpdate, status, icon,
  } = props;
  return (
    <tr className={classes.row} onClick={clickAppDetails}>
      <td>{title}</td>
      <td>{activeInstalls}</td>
      <td>{avgRating}</td>
      <td>{lastUpdate}</td>
      <td>{status}</td>
      <td><IconButton iconComponent={icon} onClick={clickDelete} /></td>
    </tr>
  );
};

CreateApp.propTypes = {
  clickAppDetails: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  activeInstalls: PropTypes.number.isRequired,
  avgRating: PropTypes.string.isRequired,
  lastUpdate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  clickDelete: PropTypes.func.isRequired,
};

export default CreateApp;
