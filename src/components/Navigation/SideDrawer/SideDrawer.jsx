/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import classes from './SideDrawer.module.scss';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
  const { closed, open, isAuth } = props;
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <>
      <Backdrop show={open} clicked={closed} />
      <div
        className={attachedClasses.join(' ')}
        onClick={closed}
      >
        <div className={classes.Logo}>
          <Logo height="100%" />
        </div>
        <nav>
          <NavigationItems
            isAuthenticated={isAuth}
            isSideDrawer
          />
        </nav>
      </div>
    </>
  );
};

sideDrawer.propTypes = {
  closed: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default sideDrawer;
