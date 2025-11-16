-- enum type definitions
CREATE TYPE gender_enum AS ENUM ('Male', 'Female');
CREATE TYPE marital_status_enum AS ENUM ('Single', 'Married', 'Widowed');
CREATE TYPE weapon_handling_clearance_enum AS ENUM ('Yes', 'No');
CREATE TYPE clearance_status_enum AS ENUM ('Active', 'Expired', 'Revoked', 'Suspended');
CREATE TYPE service_number_stamp_enum AS ENUM ('Yes', 'No');
CREATE TYPE allowance_status_enum AS ENUM ('Active', 'Suspended', 'Ended');
CREATE TYPE has_instructor_experience_enum AS ENUM ('Yes', 'No');
CREATE TYPE blood_group_enum AS ENUM ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');
CREATE TYPE user_role_enum AS ENUM ('Admin', 'HR Officer', 'Commanding Officer', 'Medical Officer');

-- table: employee
-- description: stores personal identification details and bio data of employees
CREATE TABLE employee (
    emp_no SERIAL PRIMARY KEY,
    nic_no VARCHAR(12) UNIQUE NOT NULL,
    passport_no VARCHAR(20),
    full_name VARCHAR(100) NOT NULL,
    name_in_sinhala VARCHAR(100),
    name_in_tamil VARCHAR(100),
    date_of_birth DATE NOT NULL,
    gender gender_enum NOT NULL,
    marital_status marital_status_enum NOT NULL,
    spouse_name VARCHAR(100),
    number_of_children INT NOT NULL DEFAULT 0 CHECK(
        number_of_children >= 0
    ),
    religion VARCHAR(20) NOT NULL,
    nationality VARCHAR(50) NOT NULL DEFAULT 'Sri Lankan',
    photo_id VARCHAR(255)
);

--table: disciplinary_action
--description: records disciplinary actions linked to employees
CREATE TABLE disciplinary_action (
    action_id SERIAL PRIMARY KEY,
    date_of_action DATE NOT NULL,
    action_type VARCHAR(50) NOT NULL,
    outcome TEXT NOT NULL,
    reason_for_action TEXT NOT NULL,
    confidential_remarks TEXT,
    emp_no INT NOT NULL,

    FOREIGN KEY (emp_no) REFERENCES employee(emp_no)
);

--table: court_martial_record
--description: stores court martial trial records linked to employees
CREATE TABLE court_martial_record (
    court_martial_record_id SERIAL PRIMARY KEY,
    date_of_trial DATE NOT NULL,
    charges TEXT NOT NULL,
    verdict VARCHAR(50) NOT NULL,
    sentence TEXT NOT NULL,
    emp_no INT NOT NULL,

    FOREIGN KEY (emp_no) REFERENCES employee(emp_no)
);

--table: security_clearance
--description: master table listing security clearance information
CREATE TABLE security_clearance (
    security_clearance_id SERIAL PRIMARY KEY,
    security_clearance_level VARCHAR(100) NOT NULL UNIQUE,
    weapon_handling_clearance weapon_handling_clearance_enum NOT NULL
);

--table: employee_is_granted_security_clearance
--description: links employees to their granted security clearances
CREATE TABLE employee_clearance (
    employee_clearance_id SERIAL PRIMARY KEY,
    emp_no INT NOT NULL,
    security_clearance_id INT NOT NULL,
    clearance_expiry DATE NOT NULL,
    clearance_status clearance_status_enum NOT NULL,

    UNIQUE (emp_no, security_clearance_id),
    FOREIGN KEY (emp_no) REFERENCES employee(emp_no),
    FOREIGN KEY (security_clearance_id) REFERENCES security_clearance(security_clearance_id)
);

--table: army_rank
--description: master table listing army rank information
CREATE TABLE army_rank (
    rank_id SERIAL PRIMARY KEY,
    rank_name VARCHAR(100) NOT NULL UNIQUE
);

--table: corp_and_regiment
--description: master table listing army corp and regiment information
CREATE TABLE corp_and_regiment (
    corp_and_regiment_id SERIAL PRIMARY KEY,
    corp_and_regiment_name VARCHAR(100) NOT NULL UNIQUE
);

--table: unit
--description: master table listing army unit information
CREATE TABLE unit (
    unit_id SERIAL PRIMARY KEY,
    unit_name VARCHAR(100) NOT NULL UNIQUE
);

--table: appointment
--description: master table listing army appointment information
CREATE TABLE appointment (
    appointment_id SERIAL PRIMARY KEY,
    appointment_name VARCHAR(100) NOT NULL UNIQUE
);

--table: special_duty
--description: master table listing special duty information
CREATE TABLE special_duty (
    special_duty_id SERIAL PRIMARY KEY,
    special_duty_type VARCHAR(50) NOT NULL UNIQUE,
    special_duty_description VARCHAR(200) NOT NULL
);

--table: overseas_posting
--description: master table listing overseas posting information
CREATE TABLE overseas_posting (
    overseas_posting_id SERIAL PRIMARY KEY,
    overseas_posting_type VARCHAR(50) NOT NULL UNIQUE,
    overseas_posting_country VARCHAR(50) NOT NULL,
    overseas_posting_description VARCHAR(200) NOT NULL
);

--table: posting
--description: tracks the posting history of employees
CREATE TABLE posting (
    posting_id SERIAL PRIMARY KEY,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    rank_id INT NOT NULL,
    corp_and_regiment_id INT NOT NULL,
    unit_id INT NOT NULL,
    appointment_id INT NOT NULL,
    special_duty_id INT,
    overseas_posting_id INT,
    emp_no INT NOT NULL,

    CHECK (to_date >= from_date),
    FOREIGN KEY (emp_no) REFERENCES employee(emp_no),
    FOREIGN KEY (rank_id) REFERENCES army_rank(rank_id),
    FOREIGN KEY (corp_and_regiment_id) REFERENCES corp_and_regiment(corp_and_regiment_id),
    FOREIGN KEY (unit_id) REFERENCES unit(unit_id),
    FOREIGN KEY (appointment_id) REFERENCES appointment(appointment_id),
    FOREIGN KEY (special_duty_id) REFERENCES special_duty(special_duty_id),
    FOREIGN KEY (overseas_posting_id) REFERENCES overseas_posting(overseas_posting_id)
);

--table: service_history
--description: tracks the service history of employees
CREATE TABLE service_history (
    service_history_id SERIAL PRIMARY KEY,
    category VARCHAR(20) NOT NULL,
    type_of_service VARCHAR(30) NOT NULL,
    enlistment_date DATE NOT NULL,
    current_status VARCHAR(20) NOT NULL,
    retirement_date DATE,
    service_number_stamp service_number_stamp_enum NOT NULL,
    emp_no INT NOT NULL,
    
    CHECK (retirement_date IS NULL OR retirement_date >= enlistment_date),
    FOREIGN KEY (emp_no) REFERENCES employee(emp_no)
);

--table: promotion
--description: tracks the promotion history of employees
CREATE TABLE promotion (
    promotion_id SERIAL PRIMARY KEY,
    promotion_date DATE NOT NULL,
    old_rank_id INT NOT NULL,
    new_rank_id INT NOT NULL,
    service_history_id INT NOT NULL,

    CHECK (old_rank_id != new_rank_id),
    FOREIGN KEY (old_rank_id) REFERENCES army_rank(rank_id),
    FOREIGN KEY (new_rank_id) REFERENCES army_rank(rank_id),
    FOREIGN KEY (service_history_id) REFERENCES service_history(service_history_id)
);

--table: pay_and_benefits
--description: stores pay and benefits information of employees
CREATE TABLE pay_and_benefits (
    pay_and_benefits_id SERIAL PRIMARY KEY,
    pay_code VARCHAR(20) NOT NULL UNIQUE,
    basic_pay NUMERIC(12,2) NOT NULL CHECK (
        basic_pay >= 0
    ),
    bank_account_no VARCHAR(30) NOT NULL,
    bank_name VARCHAR(50) NOT NULL,
    epf_no VARCHAR(30),
    insurance_no VARCHAR(30),
    emp_no INT NOT NULL UNIQUE,

    FOREIGN KEY (emp_no) REFERENCES employee(emp_no)
);

--table: allowance
--description: master table listing allowance information
CREATE TABLE allowance (
    allowance_id SERIAL PRIMARY KEY,
    allowance_type VARCHAR(50) NOT NULL UNIQUE
);

--table: employee_allowance
--description: stores allowance information of employees
CREATE TABLE employee_allowance (
    employee_allowance_id SERIAL PRIMARY KEY,
    pay_and_benefits_id INT NOT NULL,
    allowance_id INT NOT NULL,
    allowance_amount NUMERIC(12,2) NOT NULL CHECK (
        allowance_amount >= 0
    ),
    allowance_start_date DATE NOT NULL,
    allowance_status allowance_status_enum NOT NULL,

    UNIQUE (pay_and_benefits_id, allowance_id),
    FOREIGN KEY (pay_and_benefits_id) REFERENCES pay_and_benefits(pay_and_benefits_id),
    FOREIGN KEY (allowance_id) REFERENCES allowance(allowance_id)
);

--table: personal_loan
--description: stores personal loan information of employees
CREATE TABLE personal_loan (
    loan_id SERIAL PRIMARY KEY,
    loan_amount NUMERIC(12,2) NOT NULL CHECK (
        loan_amount >= 0
    ),
    loan_date DATE NOT NULL,
    interest_rate NUMERIC(5,2) NOT NULL CHECK (
        interest_rate >= 0
    ),
    repayment_start_date DATE NOT NULL,
    repayment_end_date DATE,
    pay_and_benefits_id INT NOT NULL,

    CHECK (repayment_start_date >= loan_date),
    CHECK (repayment_end_date IS NULL OR repayment_end_date >= repayment_start_date),
    FOREIGN KEY (pay_and_benefits_id) REFERENCES pay_and_benefits(pay_and_benefits_id)
);

--table: qualification_record
--description: stores qualification record information of employees
CREATE TABLE qualification_record (
    qualification_record_id SERIAL PRIMARY KEY,
    has_instructor_experience has_instructor_experience_enum NOT NULL,
    emp_no INT NOT NULL UNIQUE,

    FOREIGN KEY (emp_no) REFERENCES employee(emp_no)
);

--table: civil_qualification
--description: master table listing civil qualification information
CREATE TABLE civil_qualification (
    civil_qualification_id SERIAL PRIMARY KEY,
    civil_qualification_name VARCHAR(100) NOT NULL UNIQUE
);

--table: army_training_course
--description: master table listing army training course information
CREATE TABLE army_training_course (
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL UNIQUE
);

--table: language_proficiency
--description: master table listing language information
CREATE TABLE language_proficiency (
    language_id SERIAL PRIMARY KEY,
    language_name VARCHAR(50) NOT NULL UNIQUE
);

--table: computer_skill
--description: master table listing computer skill information
CREATE TABLE computer_skill (
    computer_skill_id SERIAL PRIMARY KEY,
    computer_skill_name VARCHAR(100) NOT NULL UNIQUE
);

--table: qualification_has_civil
--description: stores civil qualification information of employees
CREATE TABLE qualification_has_civil (
    qualification_has_civil_id SERIAL PRIMARY KEY,
    qualification_record_id INT NOT NULL,
    civil_qualification_id INT NOT NULL,
    civil_qualification_institution VARCHAR(150) NOT NULL,
    civil_qualification_date_completed DATE NOT NULL,

    UNIQUE (qualification_record_id, civil_qualification_id),
    FOREIGN KEY (qualification_record_id) REFERENCES qualification_record(qualification_record_id),
    FOREIGN KEY (civil_qualification_id) REFERENCES civil_qualification(civil_qualification_id)
);

--table: qualification_army_training_course
--description: stores army training course information of employees
CREATE TABLE qualification_army_training_course (
    qualification_course_id SERIAL PRIMARY KEY,
    qualification_record_id INT NOT NULL,
    course_id INT NOT NULL,
    course_institution VARCHAR(150) NOT NULL,
    course_date_completed DATE NOT NULL,

    UNIQUE (qualification_record_id, course_id),
    FOREIGN KEY (qualification_record_id) REFERENCES qualification_record(qualification_record_id),
    FOREIGN KEY (course_id) REFERENCES army_training_course(course_id)
);

--table: qualification_language
--description: stores language proficiency information of employees
CREATE TABLE qualification_language (
    qualification_language_id SERIAL PRIMARY KEY,
    qualification_record_id INT NOT NULL,
    language_id INT NOT NULL,
    language_proficiency_level VARCHAR(50) NOT NULL,

    UNIQUE (qualification_record_id, language_id),
    FOREIGN KEY (qualification_record_id) REFERENCES qualification_record(qualification_record_id),
    FOREIGN KEY (language_id) REFERENCES language_proficiency(language_id)
);

--table: qualification_computer_skill
--description: stores computer skill information of employees
CREATE TABLE qualification_computer_skill (
    qualification_computer_skill_id SERIAL PRIMARY KEY,
    qualification_record_id INT NOT NULL,
    computer_skill_id INT NOT NULL,

    UNIQUE (qualification_record_id, computer_skill_id),
    FOREIGN KEY (qualification_record_id) REFERENCES qualification_record(qualification_record_id),
    FOREIGN KEY (computer_skill_id) REFERENCES computer_skill(computer_skill_id)
);

--table: award
--description: master table listing award information
CREATE TABLE award (
    award_id SERIAL PRIMARY KEY,
    award_name VARCHAR(100) NOT NULL UNIQUE
);

--table: foreign_mission
--description: master table listing foreign mission information
CREATE TABLE foreign_mission (
    foreign_mission_id SERIAL PRIMARY KEY,
    foreign_mission_country VARCHAR(50) NOT NULL,
    foreign_mission_description TEXT NOT NULL
);

--table: commendation
--description: master table listing commendation information
CREATE TABLE commendation (
    commendation_id SERIAL PRIMARY KEY,
    commendation_name VARCHAR(100) NOT NULL UNIQUE
);

--table: sporting_achievement
--description: master table listing sporting achievement information
CREATE TABLE sporting_achievement (
    sporting_achievement_id SERIAL PRIMARY KEY,
    sport VARCHAR(50) NOT NULL,
    achievement VARCHAR(255) NOT NULL
);

--table: employee_receives_award
--description: stores award information of employees
CREATE TABLE employee_award (
    employee_award_id SERIAL PRIMARY KEY,
    emp_no INT NOT NULL,
    award_id INT NOT NULL,
    award_date DATE NOT NULL,

    UNIQUE (emp_no, award_id, award_date),
    FOREIGN KEY (emp_no) REFERENCES employee(emp_no),
    FOREIGN KEY (award_id) REFERENCES award(award_id)
);

--table: employee_foreign_mission
--description: stores foreign mission information of employees
CREATE TABLE employee_foreign_mission (
    employee_foreign_mission_id SERIAL PRIMARY KEY,
    emp_no INT NOT NULL,
    foreign_mission_id INT NOT NULL,
    foreign_mission_date DATE NOT NULL,

    UNIQUE (emp_no, foreign_mission_id, foreign_mission_date),
    FOREIGN KEY (emp_no) REFERENCES employee(emp_no),
    FOREIGN KEY (foreign_mission_id) REFERENCES foreign_mission(foreign_mission_id)
);

--table: employee_commendation
--description: stores commendation information of employees
CREATE TABLE employee_commendation (
    employee_commendation_id SERIAL PRIMARY KEY,
    emp_no INT NOT NULL,
    commendation_id INT NOT NULL,
    commendation_date DATE NOT NULL,

    UNIQUE (emp_no, commendation_id, commendation_date),
    FOREIGN KEY (emp_no) REFERENCES employee(emp_no),
    FOREIGN KEY (commendation_id) REFERENCES commendation(commendation_id)
);

--table: employee_sporting_achievement
--description: stores sporting achievement information of employees
CREATE TABLE employee_sporting_achievement (
    employee_sporting_achievement_id SERIAL PRIMARY KEY,
    emp_no INT NOT NULL,
    sporting_achievement_id INT NOT NULL,
    achievement_date DATE NOT NULL,

    UNIQUE (emp_no, sporting_achievement_id, achievement_date),
    FOREIGN KEY (emp_no) REFERENCES employee(emp_no),
    FOREIGN KEY (sporting_achievement_id) REFERENCES sporting_achievement(sporting_achievement_id)    
);

--table: medical_fitness_category
--description: master table listing medical fitness category information
CREATE TABLE medical_fitness_category (
    medical_fitness_category_id SERIAL PRIMARY KEY,
    fitness_category_name VARCHAR(5) NOT NULL UNIQUE,
    fitness_category_description TEXT NOT NULL
);

--table: medical_and_health_record
--description: stores medical and health record information of employees
CREATE TABLE medical_and_health_record (
    medical_and_health_record_id SERIAL PRIMARY KEY,
    blood_group blood_group_enum NOT NULL,
    height_cm NUMERIC(5,2) NOT NULL CHECK (
        height_cm > 0
    ),
    weight_kg NUMERIC(5,2) NOT NULL CHECK (
        weight_kg > 0
    ),
    bmi NUMERIC(5,2) NOT NULL CHECK (
        bmi > 0
    ),
    medical_check_date DATE NOT NULL,
    disability TEXT,
    emp_no INT NOT NULL UNIQUE,
    medical_fitness_category_id INT NOT NULL,

    FOREIGN KEY (emp_no) REFERENCES employee(emp_no),
    FOREIGN KEY (medical_fitness_category_id) REFERENCES medical_fitness_category(medical_fitness_category_id)
);

--table: medical_history
--description: stores medical history information of employees
CREATE TABLE medical_history (
    medical_history_id SERIAL PRIMARY KEY,
    medical_history_date DATE NOT NULL,
    medical_history_description TEXT NOT NULL,
    medical_and_health_record_id INT NOT NULL,

    FOREIGN KEY (medical_and_health_record_id) REFERENCES medical_and_health_record(medical_and_health_record_id)
);

-- table: users
-- description: stores system users for login and access control
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    user_role user_role_enum NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login TIMESTAMP,
    emp_no INT NOT NULL,

    FOREIGN KEY (emp_no) REFERENCES employee(emp_no)
);

ALTER TABLE employee ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE;
