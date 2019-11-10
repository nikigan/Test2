import React, { Component } from "react";
import { Col } from "antd";
import "./video.scss";

class Video extends Component {
  render() {
    const { url, snippet, listLayout } = this.props;

    let listClass = "video-card";
    let textClass = "";

    let spanCount = 24;

    if (listLayout) {
      listClass += " list";
      textClass = "text-list";
      spanCount = 6;
    }

    return (
      <div className={listClass}>
        <Col span={spanCount} style={{ padding: 0 }}>
          <iframe
            className="video-frame"
            src={url}
            frameBorder="0"
            allowFullScreen
          />
        </Col>
        <div className={textClass}>
          <h4 className="video-name">{snippet.title}</h4>
          <small className="channel-title">{snippet.channelTitle}</small>
        </div>
      </div>
    );
  }
}

export default Video;
