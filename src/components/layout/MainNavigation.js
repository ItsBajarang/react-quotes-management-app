import React from "react";
import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";

function MainNavigation() {
  return (
    <div>
      <header className={classes.header}>
        <div className={classes.logo}>Greate Quotes</div>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink to='/quotes' activeClassName={classes.active}>
                All Quotes
              </NavLink>
            </li>
            <li>
              <NavLink to='/new-quote' activeClassName={classes.active}>
                Add A Quote
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default MainNavigation;
