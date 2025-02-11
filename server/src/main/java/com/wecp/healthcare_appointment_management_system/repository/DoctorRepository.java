

package com.wecp.healthcare_appointment_management_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import com.wecp.healthcare_appointment_management_system.entity.Doctor;
@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    // Doctor findByPatientId(Long patientId);
    // Doctor getDoctorById(Long doctorId);
}
