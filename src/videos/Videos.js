import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import Video from "../video/Video";
import "./videos.scss";

class Videos extends Component {
  state = {
    listLayout: true
  };

  listLayout = () => {
    this.setState({
      listLayout: true
    });
  };

  cardLayout = () => {
    this.setState({
      listLayout: false
    });
  };

  render() {
    const { videos, query } = this.props;

    const { listLayout } = this.state;

    let colSpan = 6;

    if (listLayout) {
      colSpan = 24;
    }

    return (
      <div className="container">
        <Row type="flex" justify="center">
          {query && (
            <Col span={24} className="text-container">
              <span className="search-text">Видео по запросу "{query}"</span>
              <div className="buttons">
                <Button
                  icon="bars"
                  type={this.state.listLayout ? "primary" : ""}
                  onClick={this.listLayout}
                />
                <Button
                  icon="appstore"
                  type={!this.state.listLayout ? "primary" : ""}
                  onClick={this.cardLayout}
                />
              </div>
            </Col>
          )}
        </Row>
        <Row type="flex" justify="center" gutter={[16, 32]}>
          {videos.map((v, index) => {
            return (
              <Col span={colSpan} key={index}>
                <Video
                  url={v.url}
                  snippet={v.snippet}
                  statistics={v.statistics}
                  listLayout={listLayout}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default Videos;
