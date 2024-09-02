import React from 'react'
import FeedbackList from './FeedbackList'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'

function Feedbacks() {
  return (
    <>
     <AdminSidebar />
      <div className="content">
        <AdminHeader />
        <div className="container-fluid">
         
            <FeedbackList/>
          </div>
          </div>
          
    </>
  )
}

export default Feedbacks