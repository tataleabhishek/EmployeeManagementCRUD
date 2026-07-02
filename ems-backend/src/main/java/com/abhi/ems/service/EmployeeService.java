package com.abhi.ems.service;

import java.util.List;

import com.abhi.ems.dto.EmployeeDto;

public interface EmployeeService {

    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto fetchEmployeeDto(Long id);

    List<EmployeeDto> getAllEmployees();

    EmployeeDto updaEmployee(Long id,EmployeeDto updatedemployee);

    void deleteEmployee(Long id);  
}
