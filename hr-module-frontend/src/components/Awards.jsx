import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2"
import { toast } from 'react-toastify'

const Awards = () => {
  return (
    <div className='employee-page px-5 mt-4'>

      <div className="table-responsive p-4 mb-4">
        <div className="row g-2">
          <div className="col-md-4 col-lg-3">
            <Link to="/dashboard/award_master" className="master-btn btn btn-outline-secondary w-100">
              Awards Master
            </Link>
          </div>

          <div className="col-md-4 col-lg-3">
            <Link to="/dashboard/foreign_mission" className="master-btn btn btn-outline-secondary w-100">
              Foreign Missions Master
            </Link>
          </div>

          <div className="col-md-4 col-lg-3">
            <Link to="/dashboard/commendation" className="master-btn btn btn-outline-secondary w-100">
              Commendations Master
            </Link>
          </div>

          <div className="col-md-4 col-lg-3">
            <Link to="/dashboard/sporting_achievement" className="master-btn btn btn-outline-secondary w-100">
              Sporting Achievements Master
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Awards