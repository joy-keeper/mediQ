ALTER TABLE schedule_slot
DROP COLUMN current_appointments;

ALTER TABLE schedule_slot
DROP COLUMN next_appointment_number;

ALTER TABLE medical_schedule
CHANGE COLUMN max_appointments initial_max_appointments INTEGER NOT NULL;

ALTER TABLE schedule_slot
ADD COLUMN slot_max_appointments INTEGER NOT NULL;