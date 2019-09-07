import React from 'app/pages/containers/appList/noAppsMessage/app/pages/containers/AppList/noAppsMessage/react';

import styles from './noAppsMessage.module.scss';

const noAppsMessage = () => (
  <div className={styles.noApps}>
    <p>
      You do not have any applications yet
      <br />
      <br />
      Add your first application
    </p>
  </div>
);

export default noAppsMessage;
