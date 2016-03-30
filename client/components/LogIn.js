import React, { PropTypes } from 'react';

function LogIn({ currentUser, onLogin}) {
  // mock
  const users = ['Leonardo', 'Raphael', 'Michelangelo', 'Donatello'];

  return (
    <div className="login">
      {
        !currentUser ?
          <ul className="login__list">
            <li className="login__item">Identify yourself to place a bid:</li>
            {users.map(user =>
              <li key={user} className="login__item">
                <a href="#" onClick={(e) => {
                    e.preventDefault();
                    onLogin(user);
                  }}>{user}</a>
              </li>
            )}
          </ul>
        : <span className="login__current">Logged in as {currentUser}</span>
      }
    </div>
  );
}

LogIn.propTypes = {
  onLogin: PropTypes.func.isRequired
};


export default LogIn;
