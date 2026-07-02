package com.abhi.ems.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.abhi.ems.dto.EmployeeDto;
import com.abhi.ems.entity.Employee;
import com.abhi.ems.exception.ResourceNotFoundException;
import com.abhi.ems.mapper.EmployeeMapper;
import com.abhi.ems.repository.EmployeeRepository;
import com.abhi.ems.service.EmployeeService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService{

    private  EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto fetchEmployeeDto(Long id) {
        Employee fetchedEmployee = employeeRepository
        .findById(id)
        .orElseThrow(()->new ResourceNotFoundException("Employee Doesn't Exist with Id: "+id));
        return EmployeeMapper.mapToEmployeeDto(fetchedEmployee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream()
        .map((employee)->EmployeeMapper.mapToEmployeeDto(employee))
        .collect(Collectors.toList())   ;
    }

    @Override
    public EmployeeDto updaEmployee(Long id, EmployeeDto updatedemployee) {
        Employee employee = employeeRepository.findById(id).orElseThrow(
            ()->new ResourceNotFoundException("Employee Doesn't Exist with Id: "+id));
        
            employee.setFirstName(updatedemployee.getFirstName());
            employee.setLastName(updatedemployee.getLastName());
            employee.setEmail(updatedemployee.getEmail());

           Employee updtEmpObj = employeeRepository.save(employee);
           return EmployeeMapper.mapToEmployeeDto(updtEmpObj);
    }

    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.findById(id)
        .orElseThrow(()->new ResourceNotFoundException("Employee Doesn't Exist with Id: "+id));
        
        employeeRepository.deleteById(id);
    }

    
    

    

    
}
