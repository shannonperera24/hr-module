import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2"
import { toast } from 'react-toastify'

const Qualification = () => {
  return (
    <div className='employee-page px-5 mt-4'>

      <div className="table-responsive p-4 mb-4">
        <div className="row g-2">
          <div className="col-md-4 col-lg-3">
            <Link to="/dashboard/civil_qualification" className="master-btn btn btn-outline-secondary w-100">
              Civil Qualifications Master
            </Link>
          </div>

          <div className="col-md-4 col-lg-3">
            <Link to="/dashboard/army_training_course" className="master-btn btn btn-outline-secondary w-100">
              Army Training Courses Master
            </Link>
          </div>

          <div className="col-md-4 col-lg-3">
            <Link to="/dashboard/language_proficiency" className="master-btn btn btn-outline-secondary w-100">
              Language Proficiencies Master
            </Link>
          </div>

          <div className="col-md-4 col-lg-3">
            <Link to="/dashboard/computer_skill" className="master-btn btn btn-outline-secondary w-100">
              Computer Skills Master
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Qualification