import React from 'app/pages/containers/appList/appTable/AppRow/app/pages/containers/appList/AppTable/AppRow/app/pages/containers/AppList/AppTable/AppRow/react';
import PropTypes from 'app/pages/containers/appList/appTable/AppRow/app/pages/containers/appList/AppTable/AppRow/app/pages/containers/AppList/AppTable/AppRow/prop-types';

import styles from './appRow.module.scss';
import IconButton from '../IconButton/iconButton';

const AppRow = ({
  appDetails, clickAppDetails, clickDelete, icon,
}) => (
  <tr className={styles.row} onClick={clickAppDetails}>
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
