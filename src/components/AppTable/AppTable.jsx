/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import AppRow from '../AppRow/AppRow';
import classes from './AppTable.module.scss';

library.add(faTrash);

const AppTable = (props) => {
  const {
    apps, history, deleteApp, token, userId,
  } = props;
  const trash = <FontAwesomeIcon icon="trash" />;
  return (
    <div className={classes.appTable}>
      <table>
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
              title={app.appName}
              active_installs={app.activeInstalls}
              avg_rating={app.avgRating}
              last_update={app.lastUpdate}
              status={app.status}
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
  history: PropTypes.arrayOf(PropTypes.string).isRequired,
  deleteApp: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default AppTable;
