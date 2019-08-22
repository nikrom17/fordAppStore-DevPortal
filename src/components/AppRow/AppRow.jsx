import React from 'react';
import PropTypes from 'prop-types';

const CreateApp = (props) => {
  const {
    clickAppDetails, clickDelete, title, activeInstalls, avgRating, lastUpdate, status, icon,
  } = props;
  return (
    <tr>
      <td><button type="button" onClick={clickAppDetails}>{title}</button></td>
      <td><button type="button" onClick={clickAppDetails}>{activeInstalls}</button></td>
      <td><button type="button" onClick={clickAppDetails}>{avgRating}</button></td>
      <td><button type="button" onClick={clickAppDetails}>{lastUpdate}</button></td>
      <td><button type="button" onClick={clickAppDetails}>{status}</button></td>
      <td><button type="button" onClick={clickDelete}>{icon}</button></td>
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
