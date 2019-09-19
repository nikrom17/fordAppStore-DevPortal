/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import AppRow from './appRow/appRow';
import styles from './appTable.module.scss';

library.add(faTrash);

const AppTable = (props) => {
  const {
    apps, history,
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
              clickAppDetails={() => history.push({
                pathname: `/appDetails/?appId=${index}`,
                state: { app },
              })}
              appDetails={app}
              icon={trash}
              key={app.appName} // todo find a better way to identify apps
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

AppTable.propTypes = {
  apps: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default AppTable;
