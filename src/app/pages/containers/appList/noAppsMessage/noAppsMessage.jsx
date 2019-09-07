import React from 'react';

import styles from './noAppsMessage.module.scss';

const NoAppsMessage = () => (
  <div className={styles.noApps}>
    <p>
      You do not have any applications yet
      <br />
      <br />
      Add your first application
    </p>
  </div>
);

export default NoAppsMessage;
