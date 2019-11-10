import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { message, Button, Input, Row, Col, Icon, Form } from "antd";
import FavoriteForm from "../FavoriteForm";
import "element-theme-default";

const FavoriteAddForm = Form.create({ name: "form_in_modal" })(FavoriteForm);

class Search extends Component {
  state = {
    searchString: "",
    cols: 16,
    visible: false,
    showLikeButton: false
  };

  componentWillUnmount() {
    this.props.onClose();
  }

  componentDidMount() {
    if (this.props.query) {
      this.setState({
        cols: 24,
        showLikeButton: true,
        searchString: this.props.query
      });
    }
  }

  showModal = () => {
    this.setState({ visible: true });
    const { form } = this.formRef.props;
    form.setFieldsValue({
      query: this.state.searchString
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

      this.props.onLike(value);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  onChange = e => {
    this.setState({
      searchString: e.target.value
    });
  };

  onSearch = value => {
    this.props.onGotVideos(value);
    this.setState({
      cols: 24,
      showLikeButton: true
    });
  };

  render() {
    if (!this.props.loggedIn) {
      message.error("Вы не выполнили вход в приложение");
      return <Redirect to="/login" />;
    }

    const { showLikeButton } = this.state;

    return (
      <div className="container">
        <Row justify="center" type="flex">
          <Col span={this.state.cols}>
            <h1>Поиск видео</h1>
            <Input.Search
              placeholder="Что хотите посмотреть?"
              onChange={this.onChange}
              onSearch={this.onSearch}
              value={this.state.searchString}
              size="large"
              enterButton="Поиск"
              suffix={
                showLikeButton && (
                  <Button style={{ border: 0 }} onClick={this.showModal}>
                    <Icon type="heart" />
                  </Button>
                )
              }
            />
          </Col>
        </Row>
        <FavoriteAddForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          query={this.state.searchString}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          canChange={false}
        />
      </div>
    );
  }
}

export default Search;
