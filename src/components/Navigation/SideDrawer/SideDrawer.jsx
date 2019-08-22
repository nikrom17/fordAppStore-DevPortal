/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.scss';

const sideDrawer = (props) => {
  const { closed, open, isAuth } = props;
  let attachedClasses = [classes.sideDrawer, classes.close];
  if (open) {
    attachedClasses = [classes.sideDrawer, classes.open];
  }
  return (
    <>
      <Backdrop show={open} clicked={closed} />
      <div
        className={attachedClasses.join(' ')}
        onClick={closed}
      >
        <i className="fa fa-times" aria-hidden="true" />
        <Logo />
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
  open: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default sideDrawer;
