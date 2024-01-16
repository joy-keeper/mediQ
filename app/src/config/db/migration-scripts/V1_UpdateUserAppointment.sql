-- Alter the 'status' column in 'user_appointment' table
ALTER TABLE user_appointment
MODIFY status VARCHAR(20) NOT NULL DEFAULT '예약완료' CHECK (status IN ('예약완료', '예약취소', '진료완료', '노쇼'));

-- Rename 'user_appointment' table to 'appointment'
ALTER TABLE user_appointment
RENAME TO appointment;