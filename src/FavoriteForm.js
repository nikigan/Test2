import React, { Component } from "react";
import {
  Modal,
  Select,
  Slider,
  InputNumber,
  Form,
  Col,
  Row,
  Input
} from "antd";

export default class FavoriteForm extends Component {
  state = {
    value: 12
  };

  onRangeChange = value => {
    const { setFieldsValue } = this.props.form;
    this.setState({
      value: value
    });
    setFieldsValue({
      maxCount: value
    });
  };

  render() {
    const {
      visible,
      onCancel,
      onCreate,
      form,
      canChange,
      title = "Сохранение"
    } = this.props;
    const { getFieldDecorator } = form;
    const { Option } = Select;

    return (
      <Modal
        visible={visible}
        centered
        title={title + " запроса"}
        okText="Сохранить"
        cancelText="Отмена"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <Form.Item label="Запрос">
            {getFieldDecorator("query", {
              rules: [
                {
                  required: true,
                  message: "Введите запрос"
                }
              ]
            })(<Input disabled={!canChange} />)}
          </Form.Item>
          <Form.Item label="Название">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Введите название для запроса"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Сортировать по">
            {getFieldDecorator("sortBy", {
              initialValue: ""
            })(
              <Select>
                <Option value="">Без сортировки</Option>
                <Option value="date">Дате</Option>
                <Option value="rating">Рейтингу</Option>
                <Option value="title">Названию</Option>
                <Option value="viewCount">По количеству просмотров</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Количество видео">
            <Row type="flex" gutter={15}>
              <Col span={19}>
                {getFieldDecorator("maxCount", {
                  initialValue: 12
                })(<Slider min={1} max={50} onChange={this.onRangeChange} />)}
              </Col>
              <Col span={4}>
                <InputNumber
                  min={1}
                  defaultValue={12}
                  max={50}
                  onChange={this.onRangeChange}
                  value={this.state.value}
                />
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
