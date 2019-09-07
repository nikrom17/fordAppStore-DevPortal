import React from 'react';

import classes from './noAppsMessage.module.scss';

const noAppsMessage = () => (
  <div className={classes.noApps}>
    <p>
      You do not have any applications yet
      <br />
      <br />
      Add your first application
    </p>
  </div>
);

export default noAppsMessage;
