import React, { Component } from 'react';

class Video extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    if (this.props.videoStream) {
      this.video.srcObject = this.props.videoStream
    }
  }

  componentWillReceiveProps(nextProps) { 
    console.log(nextProps.videoStream)

    if (nextProps.videoStream && nextProps.videoStream !== this.props.videoStream) {
      this.video.srcObject = nextProps.videoStream
    }
  }

  render() {
    return (
      <div
        style={{ ...this.props.frameStyle }}
      >
        {/* <audio id={this.props.id} muted={this.props.muted} ref={ (ref) => {this.video = ref }}></audio> */}
        <video
          id={this.props.id}
          muted={this.props.muted}
          autoPlay
          style={{ ...this.props.videoStyles }}
          // ref={ this.props.videoRef }
          ref={ (ref) => {this.video = ref }}
        ></video>
      </div>
    )
  }
}

export default Video