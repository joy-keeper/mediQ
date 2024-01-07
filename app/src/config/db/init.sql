-- user Table
CREATE TABLE user (
  id INTEGER PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  name VARCHAR(255),
  gender CHAR(1),
  address VARCHAR(255),
  phone_number VARCHAR(20),
  registration_date TIMESTAMP,
  role VARCHAR(20)
);

-- hospital Table
CREATE TABLE hospital (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255),
  address VARCHAR(255),
  phone_number VARCHAR(20),
  description TEXT
);

-- specialty Table
CREATE TABLE specialty (
  id INTEGER PRIMARY KEY,
  specialty_name VARCHAR(255)
);

-- hospital_specialty Table
CREATE TABLE hospital_specialty (
  id INTEGER PRIMARY KEY,
  hospital_id INTEGER,
  specialty_id INTEGER,
  FOREIGN KEY (hospital_id) REFERENCES hospital(id),
  FOREIGN KEY (specialty_id) REFERENCES specialty(id)
);

-- doctor Table
CREATE TABLE doctor (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  hospital_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (hospital_id) REFERENCES hospital(id)
);

-- hospital_staff Table
CREATE TABLE hospital_staff (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  hospital_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (hospital_id) REFERENCES hospital(id)
);

-- medical_schedule Table
CREATE TABLE medical_schedule (
  id INTEGER PRIMARY KEY,
  doctor_id INTEGER,
  day_of_week VARCHAR(20),
  start_time TIME,
  end_time TIME,
  max_appointments INTEGER,
  schedule_identifier CHAR(1),
  FOREIGN KEY (doctor_id) REFERENCES doctor(id)
);

-- schedule_slot Table
CREATE TABLE schedule_slot (
  id INTEGER PRIMARY KEY,
  medical_schedule_id INTEGER,
  slot_date DATE,
  current_appointments INTEGER,
  next_appointment_number INTEGER,
  current_completed_appointments INTEGER,
  FOREIGN KEY (medical_schedule_id) REFERENCES medical_schedule(id)
);

-- hospital_schedule Table
CREATE TABLE hospital_schedule (
  id INTEGER PRIMARY KEY,
  hospital_id INTEGER,
  day_of_week VARCHAR(20),
  start_time TIME,
  end_time TIME,
  lunch_start_time TIME,
  lunch_end_time TIME,
  is_closed BOOLEAN,
  FOREIGN KEY (hospital_id) REFERENCES hospital(id)
);

-- hospital_special_schedule Table
CREATE TABLE hospital_special_schedule (
  id INTEGER PRIMARY KEY,
  hospital_id INTEGER,
  date DATE,
  start_time TIME,
  end_time TIME,
  is_closed BOOLEAN,
  description TEXT,
  FOREIGN KEY (hospital_id) REFERENCES hospital(id)
);

-- user_appointment Table
CREATE TABLE user_appointment (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  schedule_slot_id INTEGER,
  appointment_number VARCHAR(20),
  appointment_datetime TIMESTAMP,
  notes TEXT,
  type VARCHAR(20),
  status VARCHAR(20),
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (schedule_slot_id) REFERENCES schedule_slot(id)
);