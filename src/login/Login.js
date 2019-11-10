import React, { Component } from "react";
import { message, Form, Col, Row } from "antd";
import { withRouter, Redirect } from "react-router-dom";
import LoginForm from "../LoginForm";
import "./login.scss";

class Login extends Component {
  users = this.props.data;

  loginUser = formData => {
    let flag = false;
    this.users.forEach(({ login, password, userToken }) => {
      if (login === formData.login && password === formData.password) {
        localStorage.setItem("userToken", userToken);
        this.props.onLogin();
        this.props.history.push("/");
        flag = true;
      }
    });
    if (!flag) {
      message.error("Неверные логин или пароль");
    }
  };

  render() {
    if (this.props.loggedIn) {
      message.info("Вы уже выполнили вход");
      return <Redirect to="/" />;
    }
    const LForm = Form.create({ name: "login" })(LoginForm);
    return (
      <div className="container login-block">
        <Row justify="center" type="flex" className="login-row" align="middle">
          <Col span={10} className="form-block">
            <h3>Вход</h3>
            <LForm onSubmit={this.loginUser}></LForm>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Login);
