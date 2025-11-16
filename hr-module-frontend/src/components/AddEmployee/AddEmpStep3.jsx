const AddEmpStep3 = ({ formData, handleChange, handlePaySubmit }) => (
  <>
    <h3 className="fs-5 text-start fw-semibold mb-3">
        3. Pay Information
    </h3>

    <form onSubmit={handlePaySubmit}>
        <div className="row g-3">
        <div className="col-md-6">
            <label className="form-label">Pay Code *</label>
            <input type="text" name="pay_code" className="form-control"
            value={formData.pay_code} onChange={handleChange}
            required/>
        </div>
        <div className="col-md-6">
            <label className="form-label">Basic Pay *</label>
            <input type="number" name="basic_pay" min="0" step="0.01" className="form-control"
            value={formData.basic_pay} onChange={handleChange}
            required/>
        </div>
        <div className="col-md-6">
            <label className="form-label">Bank Account No *</label>
            <input type="text" name="bank_account_no" className="form-control"
            value={formData.bank_account_no} onChange={handleChange}
            required/>
        </div>
        <div className="col-md-6">
            <label className="form-label">Bank Name *</label>
            <input type="text" name="bank_name" className="form-control"
            value={formData.bank_name} onChange={handleChange}
            required/>
        </div>
        <div className="col-md-6">
            <label className="form-label">EPF No (Optional)</label>
            <input type="text" name="epf_no" className="form-control"
            value={formData.epf_no} onChange={handleChange}/>
        </div>
        <div className="col-md-6">
            <label className="form-label">Insurance No (Optional)</label>
            <input type="text" name="insurance_no" className="form-control"
            value={formData.insurance_no} onChange={handleChange}/>
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

export default AddEmpStep3