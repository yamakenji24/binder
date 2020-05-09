import React from 'react';

import Logout from '../User/logout';
import '../../stylesheets/toppage.css';

export default function TopPage() {

  return (
    <div className='toppage'>
      <h1>SLP のいろいろを管理できたらいいな</h1>
      <Logout />
    </div>
  )
}
