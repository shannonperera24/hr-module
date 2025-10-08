-- insert sample data for master tables

INSERT INTO award (award_name) VALUES
('Desha Putra Sammanaya'),
('Rana Wickrama Padakkama'),
('Rana Sura Padakkama'),
('Uttama Seva Padakkama'),
('Vishista Seva Vibhushanaya'),
('Sri Lanka Armed Services Long Service Medal');

INSERT INTO medical_fitness_category (fitness_category_name, fitness_category_description) VALUES
('A', 'Fully fit for all military duties'),
('B', 'Fit for limited military duties'),
('C', 'Unfit for field duty; office duties only');

INSERT INTO commendation (commendation_name) VALUES
('Commended by CO'),
('Brigade Commander Commendation'),
('Army Commander Appreciation'),
('President’s Commendation');

INSERT INTO sporting_achievement (sport, achievement) VALUES
('Boxing', 'Won Army Championship'),
('Athletics', 'Gold medal in 400m relay'),
('Rugby', 'Captain of the Army team'),
('Shooting', 'Top scorer in shooting competition'),
('Swimming', 'Represented Sri Lanka Army at nationals');

INSERT INTO foreign_mission (foreign_mission_country, foreign_mission_description) VALUES
('Lebanon', 'UNIFIL peacekeeping mission deployment 2018-2019'),
('South Sudan', 'UNMISS peacekeeping mission deployment 2020-2021'),
('Cyprus', 'UNFICYP peacekeeping mission deployment 2017-2018'),
('Sierra Leone', 'ECOMOG peacekeeping mission deployment 2002-2003'),
('Somalia', 'AMISOM peacekeeping mission deployment 2015-2016');


-- insert sample data for other tables in relation to 10 employees

INSERT INTO medical_and_health_record (blood_group, height_cm, weight_kg, bmi, medical_check_date, disability, emp_no, medical_fitness_category_id) VALUES
('A+', 170.5, 70.2, 24.1, '2023-06-01', NULL, 1, 1),
('B+', 165.0, 60.0, 22.0, '2023-06-01', 'Knee pain', 2, 2),
('O-', 180.0, 85.0, 26.2, '2023-06-01', NULL, 3, 1);

INSERT INTO medical_history (medical_history_date, medical_history_description, medical_and_health_record_id) VALUES
('2021-05-01', 'Fractured ankle during training', 1),
('2022-02-15', 'Seasonal flu', 2),
('2020-09-10', 'Minor surgery – appendicitis', 3);

INSERT INTO employee_receives_award (emp_no, award_id, award_date) VALUES
(1, 1, '2021-03-01'),
(2, 2, '2022-07-15'),
(3, 3, '2019-11-25');

INSERT INTO employee_receives_foreign_mission (emp_no, foreign_mission_id, foreign_mission_date) VALUES
(1, 1, '2018-01-10'),
(2, 2, '2020-04-05');

INSERT INTO employee_receives_commendation (emp_no, commendation_id, commendation_date) VALUES
(1, 1, '2020-10-01'),
(3, 3, '2019-06-01');

INSERT INTO employee_receives_sporting_achievement (emp_no, sporting_achievement_id, achievement_date) VALUES
(2, 1, '2021-03-10'),
(4, 2, '2022-05-05');




-- insert sample data through postman post requests (json)

-- MASTER TABLES

-- army_rank table
{"rank_name": "Private"}
{"rank_name": "Lance Corporal"}
{"rank_name": "Corporal"}
{"rank_name": "Sergeant"}
{"rank_name": "Staff Sergeant"}
{"rank_name": "Warrant Officer II"}
{"rank_name": "Warrant Officer I"}
{"rank_name": "Second Lieutenant"}
{"rank_name": "Lieutenant"}
{"rank_name": "Captain"}
{"rank_name": "Major"}
{"rank_name": "Lieutenant Colonel"}
{"rank_name": "Colonel"}
{"rank_name": "Brigadier"}
{"rank_name": "Major General"}
{"rank_name": "Lieutenant General"}

-- corp_and_regiment table
{ "corp_and_regiment_name": "Sri Lanka Signal Corps" }
{ "corp_and_regiment_name": "Sri Lanka Armoured Corps" }
{ "corp_and_regiment_name": "Sri Lanka Light Infantry" }
{ "corp_and_regiment_name": "Sri Lanka Artillery" }
{ "corp_and_regiment_name": "Sri Lanka Engineers" }
{ "corp_and_regiment_name": "Sri Lanka Medical Corps" }
{ "corp_and_regiment_name": "Sri Lanka Electrical and Mechanical Engineers" }
{ "corp_and_regiment_name": "Sri Lanka Army Ordnance Corps" }
{ "corp_and_regiment_name": "Sri Lanka Army Service Corps" }

-- unit table
{ "unit_name": "1 SLSC" }
{ "unit_name": "2 SLSC" }
{ "unit_name": "3 SLE" }
{ "unit_name": "4 SLAC" }
{ "unit_name": "5 SLA" }
{ "unit_name": "6 SLLI" }
{ "unit_name": "7 SLEME" }
{ "unit_name": "8 SLAMC" }
{ "unit_name": "9 SLAOC" }
{ "unit_name": "10 SLASC" }

-- appointment table
{ "appointment_name": "Platoon Commander" }
{ "appointment_name": "Company Commander" }
{ "appointment_name": "Battalion Adjutant" }
{ "appointment_name": "Regimental Sergeant Major" }
{ "appointment_name": "Medical Officer" }
{ "appointment_name": "Training Instructor" }
{ "appointment_name": "Signals Officer" }
{ "appointment_name": "Logistics Officer" }
{ "appointment_name": "Engineer Officer" }
{ "appointment_name": "Quartermaster" }

-- special_duty table
{
  "special_duty_type": "VIP Guard",
  "special_duty_description": "Assigned to guard VIP personnel"
}
{
  "special_duty_type": "Instructor",
  "special_duty_description": "Trains recruits or other officers"
}
{
  "special_duty_type": "Military Attaché",
  "special_duty_description": "Represents Army abroad"
}
{
  "special_duty_type": "Parade Commander",
  "special_duty_description": "Leads ceremonial parades"
}

-- overseas_posting table
{
  "overseas_posting_type": "UN Mission",
  "overseas_posting_country": "Lebanon",
  "overseas_posting_description": "UNIFIL deployment 2020-2021"
}
{
  "overseas_posting_type": "Training",
  "overseas_posting_country": "India",
  "overseas_posting_description": "Signal Officer Advanced Training"
}
{
  "overseas_posting_type": "Exchange Program",
  "overseas_posting_country": "UK",
  "overseas_posting_description": "Officer Exchange – Royal Army"
}
{
  "overseas_posting_type": "Medical Training",
  "overseas_posting_country": "Pakistan",
  "overseas_posting_description": "Military Medical Camp 2022"
}

-- security_clearance table
{
  "security_clearance_level": "1-Unit",
  "weapon_handling_clearance": "Yes"
}
{
  "security_clearance_level": "2-Division",
  "weapon_handling_clearance": "Yes"
}
{
  "security_clearance_level": "3-Army HQ",
  "weapon_handling_clearance": "No"
}

-- allowance table
{"allowance_type": "Hardship Allowance"}
{"allowance_type": "Special Duty Allowance"}
{"allowance_type": "Combat Allowance"}
{"allowance_type": "Medical Allowance"}
{"allowance_type": "Transport Allowance"}
{"allowance_type": "Technical Allowance"}

-- civil_qualification table
{ "civil_qualification_name": "G.C.E. A/L" }
{ "civil_qualification_name": "Diploma in IT" }
{ "civil_qualification_name": "Bachelor of Science" }
{ "civil_qualification_name": "Bachelor of Arts" }
{ "civil_qualification_name": "Master of Business Administration" }
{ "civil_qualification_name": "Diploma in Engineering" }

-- army_training_course table
{ "course_name": "Infantry Young Officers Course" }
{ "course_name": "Combat Engineer Course" }
{ "course_name": "Signals Advanced Course" }
{ "course_name": "Medical Officers Course" }
{ "course_name": "Artillery Gunnery Training" }
{ "course_name": "Armoured Corps Leaders Course" }

-- language_proficiency table
{ "language_name": "Sinhala" }
{ "language_name": "Tamil" }
{ "language_name": "English" }
{ "language_name": "Hindi" }

-- computer_skill
{ "computer_skill_name": "MS Word" }
{ "computer_skill_name": "MS Excel" }
{ "computer_skill_name": "PowerPoint" }
{ "computer_skill_name": "Database Management" }
{ "computer_skill_name": "Web Development" }
{ "computer_skill_name": "Network Administration" }



-- OTHER TABLES

-- employee table (10 employees)
{
  "nic_no": "19900000001V",
  "passport_no": "P0000001",
  "full_name": "Kumar Silva",
  "name_in_sinhala": "කුමාර් සිල්වා",
  "name_in_tamil": "குமார் சில்வா",
  "date_of_birth": "1985-01-10",
  "gender": "Male",
  "marital_status": "Single",
  "spouse_name": null,
  "number_of_children": 0,
  "religion": "Buddhism",
  "nationality": "Sri Lankan",
  "photo_id": "images/kumar_silva.jpg"
}
{
  "nic_no": "19900000002V",
  "passport_no": "P0000002",
  "full_name": "Nadeesha Fernando",
  "name_in_sinhala": "නාදේෂා ෆර්නැන්ඩෝ",
  "name_in_tamil": "நாதேஷா பெர்னான்டோ",
  "date_of_birth": "1988-02-20",
  "gender": "Female",
  "marital_status": "Married",
  "spouse_name": "Aruni Fernando",
  "number_of_children": 1,
  "religion": "Christianity",
  "nationality": "Sri Lankan",
  "photo_id": "images/nadeesha_fernando.jpg"
}
{
  "nic_no": "19900000003V",
  "passport_no": "P0000003",
  "full_name": "Arjuna Perera",
  "name_in_sinhala": "අර්ජුන පෙරේරා",
  "name_in_tamil": "அர்ஜுன பெரேரா",
  "date_of_birth": "1982-03-15",
  "gender": "Male",
  "marital_status": "Married",
  "spouse_name": "Malini Perera",
  "number_of_children": 2,
  "religion": "Hinduism",
  "nationality": "Sri Lankan",
  "photo_id": "images/arjuna_perera.jpg"
}
{
  "nic_no": "19900000004V",
  "passport_no": "P0000004",
  "full_name": "Vindya Jayawardena",
  "name_in_sinhala": "විඳියා ජයවර්ධන",
  "name_in_tamil": "விந்தியா ஜயவர்தன",
  "date_of_birth": "1987-04-05",
  "gender": "Female",
  "marital_status": "Single",
  "spouse_name": null,
  "number_of_children": 0,
  "religion": "Islam",
  "nationality": "Sri Lankan",
  "photo_id": "images/vindya_jayawardena.jpg"
}
{
  "nic_no": "19900000005V",
  "passport_no": "P0000005",
  "full_name": "Nimal Silva",
  "name_in_sinhala": "නිමාල් සිල්වා",
  "name_in_tamil": "நிமால் சில்வா",
  "date_of_birth": "1992-05-20",
  "gender": "Male",
  "marital_status": "Single",
  "spouse_name": null,
  "number_of_children": 0,
  "religion": "Buddhism",
  "nationality": "Sri Lankan",
  "photo_id": "images/nimal_silva.jpg"
}
{
  "nic_no": "19900000006V",
  "passport_no": "P0000006",
  "full_name": "Ruwan Perera",
  "name_in_sinhala": "රුවන් පෙරේරා",
  "name_in_tamil": "ருவன் பெரேரா",
  "date_of_birth": "1990-06-30",
  "gender": "Male",
  "marital_status": "Married",
  "spouse_name": "Samantha Perera",
  "number_of_children": 1,
  "religion": "Christianity",
  "nationality": "Sri Lankan",
  "photo_id": "images/ruwan_perera.jpg"
}
{
  "nic_no": "19000000007V",
  "passport_no": "P0000007",
  "full_name": "Suneth De Silva",
  "name_in_sinhala": "සුනෙත් ද සිල්වා",
  "name_in_tamil": "ஸுனேத் டி சில்வா",
  "date_of_birth": "1995-07-12",
  "gender": "Male",
  "marital_status": "Single",
  "spouse_name": null,
  "number_of_children": 0,
  "religion": "Hinduism",
  "nationality": "Sri Lankan",
  "photo_id": "images/suneth_de_silva.jpg"
}
{
  "nic_no": "19000000008V",
  "passport_no": "P0000008",
  "full_name": "Kamal Jayasuriya",
  "name_in_sinhala": "කමල් ජයසූරිය",
  "name_in_tamil": "கமால் ஜெயசூரியா",
  "date_of_birth": "1985-08-25",
  "gender": "Male",
  "marital_status": "Married",
  "spouse_name": "Manjula Jayasuriya",
  "number_of_children": 3,
  "religion": "Buddhism",
  "nationality": "Sri Lankan",
  "photo_id": "images/kamal_jayasuriya.jpg"
}
{
  "nic_no": "19900000009V",
  "passport_no": "P0000009",
  "full_name": "Arun Fernando",
  "name_in_sinhala": "අරුණ ෆර්නැන්ඩෝ",
  "name_in_tamil": "அருண் பெர்னாண்டோ",
  "date_of_birth": "1978-09-10",
  "gender": "Male",
  "marital_status": "Married",
  "spouse_name": "Lalitha Fernando",
  "number_of_children": 2,
  "religion": "Christianity",
  "nationality": "Sri Lankan",
  "photo_id": "images/arun_fernando.jpg"
}
{
  "nic_no": "19900000010V",
  "passport_no": "P0000010",
  "full_name": "Kavinda De Silva",
  "name_in_sinhala": "කවින්ද ද සිල්වා",
  "name_in_tamil": "கவிந்தி டி சில்வா",
  "date_of_birth": "1983-10-05",
  "gender": "Male",
  "marital_status": "Married",
  "spouse_name": "Samanthi De Silva",
  "number_of_children": 1,
  "religion": "Buddhism",
  "nationality": "Sri Lankan",
  "photo_id": "images/kavinda_de_silva.jpg"
}

-- users table
{
  "username": "admin_kavinda",
  "password_hash": "Password123!",
  "email": "admin.kavinda@army.lk",
  "user_role": "Admin",
  "emp_no": 10,
  "is_active": true
}
{
  "username": "hr_arun",
  "password_hash": "Password123!",
  "email": "hr.arun@army.lk",
  "user_role": "HR Officer",
  "emp_no": 9,
  "is_active": true
}
{
  "username": "co_kamal",
  "password_hash": "Password123!",
  "email": "co.kamal@army.lk",
  "user_role": "Commanding Officer",
  "emp_no": 8,
  "is_active": true
}
{
  "username": "med_suneth",
  "password_hash": "Password123!",
  "email": "med.suneth@army.lk",
  "user_role": "Medical Officer",
  "emp_no": 7,
  "is_active": true
}
{
  "username": "co_ruwan",
  "password_hash": "Password123!",
  "email": "co.ruwan@army.lk",
  "user_role": "Commanding Officer",
  "emp_no": 6,
  "is_active": false
}
{ 
  "username": "co_nimal", 
  "password_hash": "Password123!", 
  "email": "co.nimal@army.lk", 
  "user_role": "Commanding Officer", 
  "emp_no": 5, "is_active": true 
}

-- posting table
{
  "from_date": "2020-01-01",
  "to_date": "2021-01-01",
  "rank_id": 2,
  "corp_and_regiment_id": 1,
  "unit_id": 1,
  "appointment_id": 1,
  "special_duty_id": 1,
  "overseas_posting_id": 1,
  "emp_no": 1
}
{
  "from_date": "2021-02-01",
  "to_date": "2023-01-01",
  "rank_id": 4,
  "corp_and_regiment_id": 2,
  "unit_id": 2,
  "appointment_id": 2,
  "special_duty_id": 2,
  "overseas_posting_id": null,
  "emp_no": 2
}
{
  "from_date": "2019-03-15",
  "to_date": "2022-05-10",
  "rank_id": 5,
  "corp_and_regiment_id": 3,
  "unit_id": 3,
  "appointment_id": 3,
  "special_duty_id": null,
  "overseas_posting_id": 2,
  "emp_no": 3
}
{
  "from_date": "2022-06-01",
  "to_date": "2024-06-01",
  "rank_id": 6,
  "corp_and_regiment_id": 4,
  "unit_id": 4,
  "appointment_id": 4,
  "special_duty_id": null,
  "overseas_posting_id": null,
  "emp_no": 4
}

-- employee_clearance table
{
  "emp_no": 1,
  "security_clearance_id": 1,
  "clearance_expiry": "2025-12-31",
  "clearance_status": "Active"
}
{
  "emp_no": 2,
  "security_clearance_id": 2,
  "clearance_expiry": "2024-10-01",
  "clearance_status": "Active"
}
{
  "emp_no": 3,
  "security_clearance_id": 3,
  "clearance_expiry": "2023-08-20",
  "clearance_status": "Expired"
}
{
  "emp_no": 4,
  "security_clearance_id": 1,
  "clearance_expiry": "2026-01-15",
  "clearance_status": "Active"
}

-- service_history table
{
  "category": "Officer",
  "type_of_service": "Regular Force",
  "enlistment_date": "2010-01-01",
  "current_status": "On Service",
  "retirement_date": null,
  "service_number_stamp": "Yes",
  "emp_no": 1
}
{
  "category": "Officer",
  "type_of_service": "Regular Force",
  "enlistment_date": "2011-05-10",
  "current_status": "On Service",
  "retirement_date": null,
  "service_number_stamp": "Yes",
  "emp_no": 2
}
{
  "category": "OR",
  "type_of_service": "Volunteer Force",
  "enlistment_date": "2009-03-15",
  "current_status": "Retired",
  "retirement_date": "2023-03-15",
  "service_number_stamp": "No",
  "emp_no": 3
}
{
  "category": "Cadet",
  "type_of_service": "Regular Force",
  "enlistment_date": "2012-07-01",
  "current_status": "On Service",
  "retirement_date": null,
  "service_number_stamp": "Yes",
  "emp_no": 4
}

-- disciplinary_action table
{
  "date_of_action": "2022-03-15",
  "action_type": "Verbal Warning",
  "outcome": "Warning issued",
  "reason_for_action": "Late to drill repeatedly",
  "confidential_remarks": null,
  "emp_no": 1
}
{
  "date_of_action": "2021-09-01",
  "action_type": "Written Warning",
  "outcome": "Letter on file",
  "reason_for_action": "Missing equipment",
  "confidential_remarks": "Handled internally",
  "emp_no": 2
}
{
  "date_of_action": "2020-11-20",
  "action_type": "Suspension",
  "outcome": "Suspended 2 weeks",
  "reason_for_action": "Violation of leave policy",
  "confidential_remarks": null,
  "emp_no": 3
}

-- court_martial_record table
{
  "date_of_trial": "2019-06-10",
  "charges": "Desertion",
  "verdict": "Guilty",
  "sentence": "Reprimand and loss of pay",
  "emp_no": 4
}
{
  "date_of_trial": "2023-01-05",
  "charges": "Insubordination",
  "verdict": "Not Guilty",
  "sentence": "No further action",
  "emp_no": 5
}

-- promotion table
{
  "promotion_date": "2015-01-01",
  "old_rank_id": 1,
  "new_rank_id": 2,
  "service_history_id": 1
}
{
  "promotion_date": "2018-06-10",
  "old_rank_id": 2,
  "new_rank_id": 3,
  "service_history_id": 1
}
{
  "promotion_date": "2016-04-20",
  "old_rank_id": 2,
  "new_rank_id": 4,
  "service_history_id": 2
}
{
  "promotion_date": "2020-05-01",
  "old_rank_id": 4,
  "new_rank_id": 5,
  "service_history_id": 2
}
{
  "promotion_date": "2014-07-15",
  "old_rank_id": 3,
  "new_rank_id": 4,
  "service_history_id": 3
}

-- pay_and_benefits table
{
  "pay_code": "PAY0001",
  "basic_pay": 65000.00,
  "bank_account_no": "BOC123456789",
  "bank_name": "Bank of Ceylon",
  "epf_no": "EPF0001",
  "insurance_no": "INS0001",
  "emp_no": 1
}
{
  "pay_code": "PAY0002",
  "basic_pay": 72000.00,
  "bank_account_no": "HNB987654321",
  "bank_name": "HNB",
  "epf_no": "EPF0002",
  "insurance_no": "INS0002",
  "emp_no": 2
}
{
  "pay_code": "PAY0003",
  "basic_pay": 58000.00,
  "bank_account_no": "PB112233445",
  "bank_name": "Peoples Bank",
  "epf_no": "EPF0003",
  "insurance_no": "INS0003",
  "emp_no": 3
}
{
  "pay_code": "PAY0004",
  "basic_pay": 91000.00,
  "bank_account_no": "NSB556677889",
  "bank_name": "NSB",
  "epf_no": "EPF0004",
  "insurance_no": "INS0004",
  "emp_no": 4
}

-- employee_allowance table
{
  "pay_and_benefits_id": 1,
  "allowance_id": 1,
  "allowance_amount": 5000.00,
  "allowance_start_date": "2023-01-01",
  "allowance_status": "Active"
}
{
  "pay_and_benefits_id": 2,
  "allowance_id": 2,
  "allowance_amount": 4000.00,
  "allowance_start_date": "2023-01-01",
  "allowance_status": "Active"
}
{
  "pay_and_benefits_id": 3,
  "allowance_id": 3,
  "allowance_amount": 6000.00,
  "allowance_start_date": "2023-01-01",
  "allowance_status": "Suspended"
}
{
  "pay_and_benefits_id": 4,
  "allowance_id": 4,
  "allowance_amount": 3000.00,
  "allowance_start_date": "2023-01-01",
  "allowance_status": "Active"
}

-- personal_loan table
{
  "loan_amount": 100000.00,
  "loan_date": "2022-01-01",
  "interest_rate": 7.5,
  "repayment_start_date": "2022-02-01",
  "repayment_end_date": "2025-01-01",
  "pay_and_benefits_id": 1
}
{
  "loan_amount": 150000.00,
  "loan_date": "2021-06-15",
  "interest_rate": 6.5,
  "repayment_start_date": "2021-07-15",
  "repayment_end_date": "2024-06-15",
  "pay_and_benefits_id": 2
}

-- qualification_record table
{
  "has_instructor_experience": "Yes",
  "emp_no": 1
}
{
  "has_instructor_experience": "No",
  "emp_no": 2
}
{
  "has_instructor_experience": "Yes",
  "emp_no": 3
}
{
  "has_instructor_experience": "No",
  "emp_no": 4
}

-- qualification_has_civil table
{
  "qualification_record_id": 1,
  "civil_qualification_id": 1,
  "civil_qualification_institution": "Royal College",
  "civil_qualification_date_completed": "2001-12-01"
}
{
  "qualification_record_id": 1,
  "civil_qualification_id": 2,
  "civil_qualification_institution": "SLIIT",
  "civil_qualification_date_completed": "2005-07-15"
}
{
  "qualification_record_id": 2,
  "civil_qualification_id": 1,
  "civil_qualification_institution": "Ananda College",
  "civil_qualification_date_completed": "2002-11-30"
}
{
  "qualification_record_id": 3,
  "civil_qualification_id": 3,
  "civil_qualification_institution": "University of Colombo",
  "civil_qualification_date_completed": "2008-05-20"
}

-- qualification_army_training_course table
{
  "qualification_record_id": 1,
  "course_id": 1,
  "course_institution": "KDA",
  "course_date_completed": "2010-10-01"
}
{
  "qualification_record_id": 2,
  "course_id": 2,
  "course_institution": "KDA",
  "course_date_completed": "2012-03-01"
}
{
  "qualification_record_id": 3,
  "course_id": 3,
  "course_institution": "Army Training School",
  "course_date_completed": "2011-06-15"
}

-- qualification_language table
{
  "qualification_record_id": 1,
  "language_id": 1,
  "language_proficiency_level": "Fluent"
}
{
  "qualification_record_id": 1,
  "language_id": 3,
  "language_proficiency_level": "Intermediate"
}
{
  "qualification_record_id": 2,
  "language_id": 2,
  "language_proficiency_level": "Basic"
}
{
  "qualification_record_id": 3,
  "language_id": 3,
  "language_proficiency_level": "Fluent"
}

-- qualification_computer_skill table
{
  "qualification_record_id": 1,
  "computer_skill_id": 1
}
{
  "qualification_record_id": 1,
  "computer_skill_id": 2
}
{
  "qualification_record_id": 2,
  "computer_skill_id": 3
}
{
  "qualification_record_id": 3,
  "computer_skill_id": 4
}