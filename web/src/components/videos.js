import React, {Component} from 'react'
import Video from './Video'

class Videos extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rVideos: [],
      remoteStreams: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.remoteStreams !== nextProps.remoteStreams) {
      
      let _rVideos = nextProps.remoteStreams.map((rVideo, index) => {
        let video = <Video
          videoStream={rVideo.stream}
          frameStyle={{ width: 120, float: 'left', padding: '0 3px' }}
          videoStyles={{
            cursor: 'pointer',
            objectFit: 'cover',
            borderRadius: 3,
            width: '100%',
          }}
        />

        return (
          <div
            id={rVideo.name}
            onClick={() => this.props.switchVideo(rVideo)}
            style={{ display: 'inline-block' }}
            key={index}
          >
            {video}
          </div>
        )
      })

      this.setState({
        remoteStreams: nextProps.remoteStreams,
        rVideos: _rVideos
      })
    }
  }

  render() {
    return (
      <div
        style={{
          zIndex: 3,
          position: 'fixed',
          padding: '6px 3px',
          backgroundColor: 'rgba(0,0,0,0.3)',
          maxHeight: 120,
          top: 'auto',
          right: 10,
          left: 10,
          bottom: 10,
          overflowX: 'scroll',
          whiteSpace: 'nowrap'
        }}
      >
        { this.state.rVideos }
      </div>
    )
  }

}

export default Videos