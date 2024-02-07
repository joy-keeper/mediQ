ALTER TABLE schedule_slot
DROP COLUMN current_completed_appointments;

ALTER TABLE schedule_slot
MODIFY next_appointment_number INTEGER NOT NULL DEFAULT 1;

ALTER TABLE appointment 
MODIFY COLUMN appointment_number INTEGER NOT NULL;