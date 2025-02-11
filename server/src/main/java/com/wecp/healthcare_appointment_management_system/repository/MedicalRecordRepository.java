package com.wecp.healthcare_appointment_management_system.repository;

import com.wecp.healthcare_appointment_management_system.entity.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long>{

    // @Query("Select m from MedicalRecord m Where m.patient.")
    List<MedicalRecord> findByDoctorId(Long patientId);
    List<MedicalRecord> findByPatientId(Long patientId);


}




