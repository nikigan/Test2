import React, { Component } from "react";
import { Menu } from "element-react";
import { Link } from "react-router-dom";
import logo from "./sibdev-logo.png";
import "./header.scss";
import "element-theme-default";

export default class Header extends Component {
  logOut = () => {
    localStorage.removeItem("userToken");
    this.props.onLogOut();
  };
  render() {
    return (
      <div className="header">
        <div className="container">
          <Menu mode="horizontal" className="menu">
            <img src={logo} className="logo" alt="logo"></img>
            <Menu.Item index="1">
              <Link to="/search" className="link">
                Поиск
              </Link>
            </Menu.Item>
            <Menu.Item index="2">
              <Link to="/favorite" className="link">
                Избранное
              </Link>
            </Menu.Item>
            <span className="username">{this.props.username}</span>
            <Menu.Item index="3" className="logout">
              <Link to="/login" className="link" onClick={this.logOut}>
                Выход
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    );
  }
}
