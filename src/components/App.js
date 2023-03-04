import React from 'react';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContexts';
import Signup from './Signup';

function App() {
  return (
    <Container
      className='d-flex align-items-center justify-content-center'
      style = {{ minHeight: '100vh' }}>
      <div className='w-100' style = {{ minWidth: '400px' }}>
        <Signup></Signup>
      </div>
    </Container>
  )
}

export default App;
