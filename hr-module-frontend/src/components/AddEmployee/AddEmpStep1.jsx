const AddEmpStep1 = ({ formData, handleChange, handleFileChange, handleEmployeeSubmit }) => (
    <>
        <h3 className="fs-5 text-start fw-semibold mb-3">
            1. Personal Identification & Bio Data
        </h3>

        <form onSubmit={handleEmployeeSubmit}>
            <div className="row g-3">
            <div className="col-12">
                <label className="form-label">Full Name *</label>
                <input type="text" name="full_name" className="form-control"
                value={formData.full_name} onChange={handleChange}
                required/>
            </div>
            <div className="col-12">
                <label className="form-label">Name in Sinhala (Optional)</label>
                <input type="text" name="name_in_sinhala" className="form-control"
                value={formData.name_in_sinhala} onChange={handleChange}/>
            </div>
            <div className="col-12">
                <label className="form-label">Name in Tamil (Optional)</label>
                <input type="text" name="name_in_tamil" className="form-control"
                value={formData.name_in_tamil} onChange={handleChange}/>
            </div>
            <div className="col-md-6">
                <label className="form-label">NIC No *</label>
                <input type="text" name="nic_no" className="form-control"
                value={formData.nic_no}onChange={handleChange} 
                required/>
            </div>
            <div className="col-md-6">
                <label className="form-label">Passport No (Optional)</label>
                <input type="text" name="passport_no" className="form-control"
                value={formData.passport_no} onChange={handleChange}/>
            </div>
            <div className="col-md-3">
                <label className="form-label">Date of Birth *</label>
                <input type="date" name="date_of_birth" className="form-control"
                value={formData.date_of_birth} onChange={handleChange}
                required/>
            </div>
            <div className="col-md-3">
                <label className="form-label">Gender *</label>
                <select name="gender" className="form-select"
                value={formData.gender} onChange={handleChange}
                required>
                <option value="">-Select-</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                </select>
            </div>
            <div className="col-md-3">
                <label className="form-label">Religion *</label>
                <input type="text" name="religion" className="form-control"
                value={formData.religion} onChange={handleChange}
                required/>
            </div>
            <div className="col-md-3">
                <label className="form-label">Nationality *</label>
                <input type="text" name="nationality" className="form-control"
                value={formData.nationality} onChange={handleChange}
                required/>
            </div>
            <div className="col-md-3">
                <label className="form-label">Marital Status *</label>
                <select name="marital_status" className="form-select"
                value={formData.marital_status} onChange={handleChange}
                required>
                <option value="">-Select-</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Widowed">Widowed</option>
                </select>
            </div>
            <div className="col-md-6">
                <label className="form-label">Spouse Name (Optional)</label>
                <input type="text" name="spouse_name" className="form-control"
                value={formData.spouse_name} onChange={handleChange}/>
            </div>
            <div className="col-md-3">
                <label className="form-label">Number of Children</label>
                <input type="number" name="number_of_children" min="0" className="form-control"
                value={formData.number_of_children} onChange={handleChange}/>
            </div>
            <div className="col-md-3">
                <label className="form-label">Photo ID (Optional)</label>
                <input type="file" name="photo_id" accept="image/*"
                className="form-control" 
                onChange={handleFileChange}/>
            </div>
            {formData.photo_id && (
                <div className="mt-3">
                <img
                    src={URL.createObjectURL(formData.photo_id)}
                    alt="Preview"
                    width="120"
                    className="rounded shadow-sm"
                />
                </div>
            )}
            </div>

            <div className="d-flex justify-content-end mt-4">
            <button type="submit" className="btn btn-success px-4">
                Next
            </button>
            </div>
        </form>
    </>
)

export default AddEmpStep1
