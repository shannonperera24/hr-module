const AddEmpStep2 = ({ formData, handleChange, handleServiceSubmit }) => (
  <>
    <h3 className="fs-5 text-start fw-semibold mb-3">
        2. Service Information
    </h3>

    <form onSubmit={handleServiceSubmit}>
        <div className="row g-3">
        <div className="col-md-4">
            <label className="form-label">Category *</label>
            <input type="text" name="category" className="form-control"
            value={formData.category} onChange={handleChange}
            required/>
        </div>
        <div className="col-md-4">
            <label className="form-label">Type of Service *</label>
            <input type="text" name="type_of_service" className="form-control"
            value={formData.type_of_service} onChange={handleChange}
            required/>
        </div>
        <div className="col-md-4">
            <label className="form-label">Current Status *</label>
            <input type="text" name="current_status" className="form-control"
            value={formData.current_status} onChange={handleChange}
            required/>
        </div>
        <div className="col-md-4">
            <label className="form-label">Enlistment Date *</label>
            <input type="date" name="enlistment_date" className="form-control"
            value={formData.enlistment_date} onChange={handleChange}
            required/>
        </div>
        <div className="col-md-4">
            <label className="form-label">Retirement Date (Optional)</label>
            <input type="date" name="retirement_date" className="form-control"
            value={formData.retirement_date} onChange={handleChange}/>
        </div>
        <div className="col-md-4">
            <label className="form-label">Service Number Stamp *</label>
            <select name="service_number_stamp" className="form-select"
            value={formData.service_number_stamp} onChange={handleChange}
            required>
            <option value="">-Select-</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            </select>
        </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
        <button type="submit" className="btn btn-success px-4">
            Next
        </button>
        </div>
    </form>
  </>
)

export default AddEmpStep2