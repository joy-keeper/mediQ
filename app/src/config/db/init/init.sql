-- user Table
CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(128) NOT NULL,
  name VARCHAR(255) NOT NULL,
  gender CHAR(1) NOT NULL CHECK (gender IN ('M', 'F')),
  address VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  role VARCHAR(10) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'staff', 'doctor'))
);

-- hospital Table
CREATE TABLE hospital (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  description TEXT
);

-- specialty Table
CREATE TABLE specialty (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  specialty_name VARCHAR(255) NOT NULL
);

-- hospital_specialty Table
CREATE TABLE hospital_specialty (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  hospital_id INTEGER NOT NULL,
  specialty_id INTEGER NOT NULL,
  FOREIGN KEY (hospital_id) REFERENCES hospital(id),
  FOREIGN KEY (specialty_id) REFERENCES specialty(id)
);

-- doctor Table
CREATE TABLE doctor (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  user_id INTEGER NOT NULL,
  hospital_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (hospital_id) REFERENCES hospital(id)
);

-- hospital_staff Table
CREATE TABLE hospital_staff (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  user_id INTEGER NOT NULL,
  hospital_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (hospital_id) REFERENCES hospital(id)
);

-- medical_schedule Table
CREATE TABLE medical_schedule (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  doctor_id INTEGER NOT NULL,
  day_of_week VARCHAR(20) NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  max_appointments INTEGER NOT NULL,
  schedule_identifier CHAR(1) NOT NULL,
  FOREIGN KEY (doctor_id) REFERENCES doctor(id)
);

-- schedule_slot Table
CREATE TABLE schedule_slot (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  medical_schedule_id INTEGER NOT NULL,
  slot_date DATE NOT NULL,
  current_appointments INTEGER NOT NULL DEFAULT 0,
  next_appointment_number INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY (medical_schedule_id) REFERENCES medical_schedule(id)
);

-- hospital_schedule Table
CREATE TABLE hospital_schedule (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  hospital_id INTEGER NOT NULL,
  day_of_week VARCHAR(20) NOT NULL,
  start_time TIME,
  end_time TIME,
  lunch_start_time TIME,
  lunch_end_time TIME,
  is_closed BOOLEAN NOT NULL,
  FOREIGN KEY (hospital_id) REFERENCES hospital(id)
);

-- hospital_special_schedule Table
CREATE TABLE hospital_special_schedule (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  hospital_id INTEGER NOT NULL,
  date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  is_closed BOOLEAN NOT NULL,
  description TEXT,
  FOREIGN KEY (hospital_id) REFERENCES hospital(id)
);

-- appointment Table
CREATE TABLE appointment (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  user_id INTEGER NOT NULL,
  schedule_slot_id INTEGER NOT NULL,
  appointment_number INTEGER NOT NULL,
  appointment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  notes TEXT,
  type VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'confirmed',
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (schedule_slot_id) REFERENCES schedule_slot(id)
);
