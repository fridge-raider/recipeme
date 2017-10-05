import React, {Component} from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Container, Form, Grid } from 'semantic-ui-react'
import { addReceipt } from '../store'
import CheckReceiptIng from './CheckReceiptIngv2.jsx'
import ReactS3Uploader from 'react-s3-uploader'
import FineUploaderS3 from 'fine-uploader-wrappers/s3'
import Gallery from 'react-fine-uploader'
import RaisedButton from 'material-ui/RaisedButton'
// import CircularProgress from 'material-ui/CircularProgress'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

import 'react-fine-uploader/gallery/gallery.css'

const uploader = new FineUploaderS3({
  options: {
      request: {
          endpoint: `${process.env.BUCKET_NAME}.s3.amazonaws.com`,
          accessKey: process.env.CLIENT_ACCESS_KEY,
      },
      template: 'qq-template-s3',
      cors: {
        expected: true
    },
    chunking: {
        enabled: true
    },
    resume: {
        enabled: true
    },
      signature: {
          endpoint: "/api/s3/signatureHandler"
      },
      uploadSuccess: {
        endpoint: "/api/s3/uploadSuccessful"
    },
    iframeSupport: {
        localBlankPagePath: "success.html"
    },
      thumbnails: {
        placeholders: {
            notAvailablePath: "../../public/not_available-generic.png",
            waitingPath: "../../public/waiting-generic.png"
        }
    }
  }
})

export class ReceiptUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submittedFiles: [],
      isLoading: false
    }

    this.isFileGone = this.isFileGone.bind(this)
    this.loading = this.loading.bind(this)
  }


  componentDidMount() {
    uploader.on('complete', (id, name, res) => {
        if (newStatus === 'submitted') {
            const submittedFiles = this.state.submittedFiles

            submittedFiles.push(id)
            this.setState({ submittedFiles })
        }
        else if (this.isFileGone(newStatus)) {
            const submittedFiles = this.state.submittedFiles
            const indexToRemove = submittedFiles.indexOf(id)

            submittedFiles.splice(indexToRemove, 1)
            this.setState({ submittedFiles })
        }
    })
  }

  isFileGone() {
    return [
        'canceled',
        'deleted',
    ].indexOf(status) >= 0
  }

  loading() {
    // console.log('are ou working')
    // return (
    // (this.state.isloading && <CircularProgress size={60} thickness={7} />
    // ))
    return (
      <Dimmer active>
        { console.log('IN HERE')}
        <Loader indeterminate>Preparing Files</Loader>
      </Dimmer>
    )
  }

  render() {

    console.log('this.state', this.state)
    const fileInputChildren = <span>Choose file</span>
    // <input className="fileInput"
    // type="file"
    // onChange={(e)=>this._handleImageChange(e)} />
    console.log('is there a current receipt', !!Object.keys(this.props.currentReceipt).length, this.props.currentReceipt)
    return (


      <Container fluid>
      {!!Object.keys(this.props.currentReceipt).length ?
        <CheckReceiptIng receipt={this.props.currentReceipt}/> :
        ''
      }

      <Gallery fileInput-children={ fileInputChildren } uploader={ uploader } />
      <RaisedButton
      onClick={(evt) => {
        this.setState({isLoading: true})
        this.props.handleSubmit(evt)
        console.log(this.state.isLoading, 'false PLS')
        {/* this.loading() */}
        }}
      >
      Parse Purchases</RaisedButton>
      {/* { this.state.isLoading && this.loading() } */}
      </Container>


    )
  }
}

const mapState = (state) => {
  return {
    currentReceipt: state.currentReceipt
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      // func()
      // dispatach to update ingredients based on state
      dispatch(addReceipt())
    }
  }
}

export default connect(mapState, mapDispatch)(ReceiptUpload)
