import React, {Component} from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Container, Form, Grid } from 'semantic-ui-react'
import { addReceipt } from '../store'
import CheckReceiptIng from './CheckReceiptIngv2.jsx'

export class ReceiptUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img style={{maxHeight: "300px", maxWidth: "300px"}} src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    console.log('is there a current receipt', !!Object.keys(this.props.currentReceipt).length, this.props.currentReceipt)
    return (
      <Container fluid>
      {!!Object.keys(this.props.currentReceipt).length ?
        <CheckReceiptIng receipt={this.props.currentReceipt}/> :
        ''
      }
        <div className="previewComponent">
          <form onSubmit={(e)=>this.props.handleSubmit(e, this.state.file)}>
            <input className="fileInput"
              type="file"
              onChange={(e)=>this._handleImageChange(e)} />
            <button className="submitButton"
              type="submit"
              onClick={(e)=>this.props.handleSubmit(e, this.state.file)}>Upload Image</button>
          </form>
          <div>
            {$imagePreview}
          </div>
        </div>
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
    handleSubmit(evt, file) {
      evt.preventDefault();
      dispatch(addReceipt(file))
    }
  }
}

export default connect(mapState, mapDispatch)(ReceiptUpload)
