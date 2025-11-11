const AddEmpStep5 = ({ formData, handleChange, handleInstructorSubmit }) => (
  <>
    <h3 className="fs-5 text-start fw-semibold mb-3">
        5. Instructor Experience Information
    </h3>

    <form onSubmit={handleInstructorSubmit}>
        <div className="row g-3">
            <div className="col-md-4">
                <label className="form-label">Does the employee have instructor experience? *</label>
                <select name="has_instructor_experience" className="form-select"
                value={formData.has_instructor_experience} onChange={handleChange}
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

export default AddEmpStep5