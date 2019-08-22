import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import classes from './Layout.module.scss';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const Layout = ({ isAuthenticated }) => (
  <Toolbar
    isAuth={isAuthenticated}
  />
);

Layout.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(Layout);
