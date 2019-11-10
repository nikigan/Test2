import React, { Component } from "react";
import { message, List, Button, Form } from "antd";
import { withRouter, Redirect } from "react-router-dom";
import FavoriteForm from "../FavoriteForm";
import "./favorite.scss";

const FavoriteChangeForm = Form.create({ name: "form_in_modal" })(FavoriteForm);

class Favorite extends Component {
  state = {
    visible: false
  };

  onExecute = item => {
    this.props.history.push("/");
    this.props.onExecute(item);
  };

  currentItem = null;

  onChange = item => {
    this.setState({ visible: true });
    const { form } = this.formRef.props;
    this.currentItem = item;
    form.setFieldsValue({
      query: item.query,
      name: item.name,
      maxCount: item.maxCount,
      sortBy: item.sortBy
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, value) => {
      if (err) {
        return;
      }

      this.props.onChangeFavorite(this.currentItem, value);

      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    if (!this.props.loggedIn) {
      message.error("Вы не выполнили вход в приложение");
      return <Redirect to="/login" />;
    }

    let users = [...this.props.data];
    const { favorite } = users.find(
      u => u.userToken === localStorage.getItem("userToken")
    );

    return (
      <div className="container">
        <h2>Избранное</h2>
        <List
          dataSource={favorite}
          bordered
          renderItem={item => (
            <List.Item className="item">
              <span className="list-item-text">{item.name}</span>
              <div className="list-item-button">
                <Button type="link" onClick={e => this.onExecute(item)}>
                  Выполнить
                </Button>
                <Button type="link" onClick={e => this.onChange(item)}>
                  Редактировать
                </Button>
              </div>
            </List.Item>
          )}
        ></List>
        <FavoriteChangeForm
          wrappedComponentRef={this.saveFormRef}
          title="Редактирование"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          canChange={true}
        />
      </div>
    );
  }
}

export default withRouter(Favorite);
