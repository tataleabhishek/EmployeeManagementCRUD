package com.abhi.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.abhi.ems.entity.Employee;


public interface EmployeeRepository extends JpaRepository<Employee,Long>{
}
