import React, { Component } from 'react';

class Video extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mic: true,
      camera: true,
      videoVisible: true,
    }
  }

  componentDidMount() {
    if (this.props.videoStream) {
      this.video.srcObject = this.props.videoStream
    }
  }

  componentWillReceiveProps(nextProps) { 
    console.log(nextProps.videoStream)

    // This is done only once
    if (nextProps.videoStream && nextProps.videoStream !== this.props.videoStream) {
      this.video.srcObject = nextProps.videoStream
    }

    // We need to take care of react-native-webrtc library
    // when audio/video is muted, it does not send blank frames
    const videoTrack = nextProps.videoStream && nextProps.videoStream.getVideoTracks()
    if (this.props.videoType === 'remoteVideo' && videoTrack && videoTrack.length) {
      videoTrack[0].onmute = () => {
        this.setStat({
          videoVisible: false,
        })
        this.props.videoMuted(nextProps.videoStream)
      }

      videoTrack[0].onunmute = () => {
        this.setState({
          videoVisible: true,
        })
        this.props.videoMuted(nextProps.videoStream)
      }
    }

  }

  mutemic = (e) => {
    const stream = this.video.srcObject.getTracks().filter(track => track.kind === 'audio')
    this.setState(prevState => {
      if (stream) stream[0].enabled = !prevState.mic
      return {mic: !prevState.mic}
    })
  }

  mutecamera = (e) => {
    const stream = this.video.srcObject.getTracks().filter(track => track.kind === 'video')
    this.setState(prevState => {
      if (stream) stream[0].enabled = !prevState.camera
      return {camera: !prevState.camera}
    })
  }

  render() {
    const muteControls = this.props.showMuteControls && (
      <div>
        <i onClick={this.mutemic} style={{ cursor: 'pointer', padding: 5, fontSize: 20, color: this.state.mic && 'white' || 'red' }} class='material-icons'>{this.state.mic && 'mic' || 'mic_off'}</i>
        <i onClick={this.mutecamera} style={{ cursor: 'pointer', padding: 5, fontSize: 20, color: this.state.camera && 'white' || 'red' }} class='material-icons'>{this.state.camera && 'videocam' || 'videocam_off'}</i>
      </div>
    )
    return (
      <div
        style={{ ...this.props.frameStyle }}
      >
        {/* <audio id={this.props.id} muted={this.props.muted} ref={ (ref) => {this.video = ref }}></audio> */}
        <video
          id={this.props.id}
          muted={this.props.muted}
          autoPlay
          style={{
            visibility: this.state.videoVisible && 'visible' || 'hidden',
            ...this.props.videoStyles
          }}
          // ref={ this.props.videoRef }
          ref={ (ref) => {this.video = ref }}
        ></video>
        {muteControls}
      </div>
    )
  }
}

export default Video