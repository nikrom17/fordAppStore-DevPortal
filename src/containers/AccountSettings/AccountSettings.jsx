import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RenderForm from '../../components/renderForm/renderForm';
import accountInfoForm from './formConfig';


const AccountSettings = ({ accountInfo }) => {
  console.log('Account Settings Rendered');
  const {
    allIds, config, type, validation,
  } = accountInfoForm;
  return (
    <div>
      <RenderForm
        config={config}
        inputIds={allIds}
        type={type}
        validation={validation}
        preFormMessage={<p>Account Info</p>}
        stateValues={accountInfo}
        readonly
      />
    </div>
  );
};

AccountSettings.propTypes = {
  accountInfo: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  ).isRequired,
};

const mapStateToProps = (state) => ({
  accountInfo: state.settings,
});

export default connect(mapStateToProps)(AccountSettings);
