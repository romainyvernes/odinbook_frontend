import React from 'react'
import { NavLink, Switch, Route } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

// stylesheet
import '../styles/AccountDashboard.css';

export default function AccountDashboard({ heading, mainItems, navItems, className }) {
  return (
    <div className={`account-dashboard ${className}`}>
      <aside className="quinary-frame primary-bg-color">
        <header>
          <h1>{heading}</h1>
        </header>
        <ul>
          {
            navItems.map((item) => (
              <li key={uuid()}>
                <NavLink exact to={item.path} 
                        activeClassName="selected"
                        {...item.props} >
                  <i><item.icon /></i>
                  <h6>{item.heading}</h6>
                </NavLink>
              </li>
            ))
          }
        </ul>
      </aside>
      <main className="primary-bg-color quinary-frame">
        <Switch>
          {
            mainItems.map((item, index) => (
              <Route key={uuid()} exact={index === 0} path={item.path} render={(props) => (
                <item.component {...props} key={uuid()} {...item.componentProps} />
              )} />
            ))
          }
        </Switch>
      </main>
    </div>
  )
}
