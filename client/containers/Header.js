import React from 'react';
import { connect } from 'react-redux';
import { logIn, selectAuction } from '../actions';
import LogIn from '../components/LogIn';
import Select from '../components/Select';

function Header({ dispatch, user, selectedAuction }) {
  return (
    <div className="header">
      <Select
        value={selectedAuction}
        options={[ 4, 7]}
        label={`Select auction:`}
        onChange={(value) => dispatch(selectAuction(value))} />
      <LogIn currentUser={user} onLogin={user => dispatch(logIn(user))} />
    </div>
  );
}

function mapStateToProps(state) {
  const { user, selectedAuction } = state;

  return {
    user,
    selectedAuction
  };
}

export default connect(mapStateToProps)(Header);
