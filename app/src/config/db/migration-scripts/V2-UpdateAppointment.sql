ALTER TABLE appointment
MODIFY status VARCHAR(20) NOT NULL DEFAULT 'confirmed';

ALTER TABLE appointment
DROP CHECK appointment_chk_1;