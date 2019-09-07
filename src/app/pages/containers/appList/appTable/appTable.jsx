/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import AppRow from './appRow/appRow';
import styles from './appTable.module.scss';

library.add(faTrash);

const AppTable = (props) => {
  const {
    apps, history, deleteApp, token, userId,
  } = props;
  const trash = <FontAwesomeIcon icon="trash" />;
  return (
    <div className={styles.appTable}>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>App Name</th>
            <th>Active Installs</th>
            <th>Avg Rating</th>
            <th>Last Update</th>
            <th>Status</th>
            <th />
          </tr>
          {apps.map((app, index) => (
            <AppRow
              clickAppDetails={() => history.push(`/appDetails/?appId=${index}`)}
              clickDelete={() => deleteApp(token, userId, app.id, app)}
              appDetails={app}
              icon={trash}
              key={app.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

AppTable.propTypes = {
  apps: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
  history: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  deleteApp: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default AppTable;
