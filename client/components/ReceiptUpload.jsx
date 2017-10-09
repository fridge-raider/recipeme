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
import 'react-fine-uploader/gallery/gallery.css'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import Dialog from 'material-ui/Dialog';
import ErrorModal from './ErrorModal.jsx'; 
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DailyRecommendedModal from './DailyRecommendedModal.jsx' 
import { setReceipt } from '../store'


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
      isLoading: false, 
      openError: false, 
      openQuestion: false, 
      isReceipt: true
    }

    this.isFileGone = this.isFileGone.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleOpenQuestion = this.handleOpenQuestion.bind(this)
    this.handleManualReceipt = this.handleManualReceipt.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    console.log("inside receipt upload", nextProps.currentReceipt); 
    if(this.props !== nextProps) {
      //checking product has been set from state to props -- error with .length off of null
      if(Array.isArray(nextProps.currentReceipt)) {
        this.setState({isLoading: false})
      } 
      if(nextProps.currentReceipt.length === 0) {
        this.setState({openError: true})
      }
    }
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

  handleCloseModal() {
    this.setState({open: false});
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.getReceipt() 
    this.setState({isLoading: true})
  }

  handleOpenQuestion() {
    this.setState({openQuestion: true})
  }

  handleManualReceipt() {
    console.log("hello"); 
    const manualItem = { ingredientName: "" , userId: this.props.user.id, servings: 1, price: 0.00, week: Date.now(), createdAt: Date.now() }
    const manualReceipt = []; 
    for(var i=0; i<5; i++) {
      manualReceipt.push(manualItem); 
    }
    this.setState({ isReceipt: false})
    this.props.setUserReceipt(manualReceipt); 
  }

  isFileGone() {
    return [
        'canceled',
        'deleted',
    ].indexOf(status) >= 0
  }

  render() {
  const fileInputChildren = <span>Choose file</span>
  console.log('is there a current receipt', !!Object.keys(this.props.currentReceipt).length, this.props.currentReceipt.length)
  return (
    <div>
      {
        (this.state.isLoading) 
        ? (<Dimmer active><Loader indeterminate>Parsing Files, Be Back Shortly</Loader></Dimmer>) 
        : (
          <div className="ui grid">
            <div className="one wide column"></div>
                    <div className="fourteen wide column">
                      <div style={{width: 400, marginLeft: "auto", marginRight:"auto"}}>
                        <Container>
                        { (this.props.currentReceipt.length > 0)
                          ? <CheckReceiptIng receipt={this.props.currentReceipt} isReceipt={this.state.isReceipt}/> 
                          : <ErrorModal open={this.state.openError} title="Parsing Error" message="Your receipt could not be parsed. We are sorry from the bottom of our hearts. ♥ "/>
                        }

                          <Gallery fileInput-children={ fileInputChildren } uploader={ uploader } style={{width: 400}}/>
                          <RaisedButton
                          primary={true}
                          label="Parse Purchases"
                          fullWidth={true}
                          onClick={this.handleSubmit}
                          ></RaisedButton>
                        </Container>
                      </div>
                    </div>
            <div className="one wide column">
              <FloatingActionButton mini={true} onClick={this.handleManualReceipt}>
                <ContentAdd />
              </FloatingActionButton>
              <FloatingActionButton style={{marginTop: 15}} mini={true} onClick={this.handleOpenQuestion}>
                ?
              </FloatingActionButton>
            </div> 

            <DailyRecommendedModal open={this.state.openQuestion} />



        </div>
        )
      }
    </div>
    )
  }
}

const mapState = (state) => {
  return {
    currentReceipt: state.currentReceipt, 
    isLoading: state.isLoading, 
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    getReceipt() {
      dispatch(addReceipt())
    }, 
    setUserReceipt(manualReceipt) {
      dispatch(setReceipt(manualReceipt))
    }
  }
}

export default connect(mapState, mapDispatch)(ReceiptUpload)
