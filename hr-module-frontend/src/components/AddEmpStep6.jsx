import { useEffect, useState } from "react";
import axios from "axios";

const AddEmpStep6 = ({ formData, handleChange, handleMedRecSubmit }) => {
    const [fitCategories, setFitCategories] = useState([]);
    
    useEffect(() => {
        const fetchFitCategories = async () => {
            try {
                const res = await axios.get("http://localhost:3000/medical_fitness_category");
                setFitCategories(res.data);
            } catch (err) {
                console.error("Error fetching dropdown data:", err);
            }
        };
        fetchFitCategories();
    }, []);

    return (
        <>
            <h3 className="fs-5 text-start fw-semibold mb-3">
                6. Medical & Health Information
            </h3>

            <form onSubmit={handleMedRecSubmit}>
                <div className="row g-3">
                    <div className="col-md-3">
                        <label className="form-label">Blood Group *</label>
                        <select name="blood_group" className="form-select"
                        value={formData.blood_group} onChange={handleChange}
                        required>
                            <option value="">-Select-</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Height (cm) *</label>
                        <input type="number" name="height_cm" step="0.01" className="form-control"
                        value={formData.height_cm} onChange={handleChange}
                        required/>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Weight (kg) *</label>
                        <input type="number" name="weight_kg" step="0.01" className="form-control"
                        value={formData.weight_kg} onChange={handleChange}
                        required/>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">BMI *</label>
                        <input type="number" name="bmi" step="0.01" className="form-control"
                        value={formData.bmi} onChange={handleChange}
                        required/>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Medical Check Date *</label>
                        <input type="date" name="medical_check_date" className="form-control"
                        value={formData.medical_check_date} onChange={handleChange}
                        required/>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Disability (If any)</label>
                        <input type="text" name="disability" className="form-control"
                        value={formData.disability} onChange={handleChange}/>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Fitness Category *</label>
                        <select name="medical_fitness_category_id" className="form-select"
                        value={formData.medical_fitness_category_id} onChange={handleChange} 
                        required>
                            <option value="">-Select-</option>
                            {fitCategories.map(medical_fitness_category => (
                                <option key={medical_fitness_category.medical_fitness_category_id} value={medical_fitness_category.medical_fitness_category_id}>
                                {medical_fitness_category.fitness_category_name}
                                </option>
                            ))}
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
}

export default AddEmpStep6