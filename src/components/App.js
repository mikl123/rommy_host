import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContexts';
import Signup from './Signup';
import axios from 'axios';

// class App extends Component {
//   state = {
//     selectedFile: null
//   }

//   fileSelectedHandler = event => {
//     this.setState({
//       selectedFile: event.target.files[0]
//     })
//   }

//   fileUploadHandler = () => {
//     const fd = new FormData()
//     fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
//     axios.post('gs://rommy-d53cb.appspot.com', fd)
//     .then( res =>  {
//       console.log(res)
//     });
//   }
//   render() {
//     return (
//       <div className = 'App'>
//         <input type = 'file' onChange = {this.fileSelectedHandler}></input>
//         <button onClick={this.fileUploadHandler}>Прикріпити фото</button>
//       </div>
//     )
//   }
// }

function App() {
  return (
    <AuthProvider>
      <Container
      className='d-flex align-items-center justify-content-center'
      style = {{ minHeight: '100vh' }}>
      <div className='w-100' style = {{ minWidth: '400px' }}>
        <Signup></Signup>
      </div>
    </Container>
    </AuthProvider>
  )
}

export default App;
