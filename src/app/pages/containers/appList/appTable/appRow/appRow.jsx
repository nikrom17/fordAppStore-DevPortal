import React from 'react';
import PropTypes from 'prop-types';

import IconButton from 'app/shared/iconButton/iconButton';
import styles from './appRow.module.scss';

const AppRow = ({
  appDetails, clickAppDetails, icon,
}) => (
  <tr className={styles.row} onClick={clickAppDetails}>
    <td>{appDetails.appName}</td>
    <td>{appDetails.activeInstalls}</td>
    <td>{appDetails.avgRating}</td>
    <td>{appDetails.lastUpdate}</td>
    <td>{appDetails.status}</td>
    <td><IconButton iconComponent={icon} /></td>
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
  icon: PropTypes.node.isRequired,
};

export default AppRow;
