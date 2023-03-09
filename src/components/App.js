import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContexts';
import Signup from './Signup';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from "./Dashboard"
import Login from "./Login"
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile';
import Main from './Main'

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
    <div>
      <div className='w-100 outer'>
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<Main />} />
              <Route path="/update-profile" element={<UpdateProfile />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>

    </div>
  )
}

export default App;
