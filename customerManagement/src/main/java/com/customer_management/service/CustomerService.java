package com.customer_management.service;

import com.customer_management.entity.Admin;
import com.customer_management.entity.Customer;
import com.customer_management.exception.BadRequestException;
import com.customer_management.mapper.Mapper;
import com.customer_management.model.CustomerModel;
import com.customer_management.model.LoginModel;
import com.customer_management.repo.AdminRepo;
import com.customer_management.repo.CustomerRepo;
import com.customer_management.security.JwtTokenSecurity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class CustomerService {
    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private JwtTokenSecurity jwtTokenSecurity;

    @Autowired
    private AdminRepo adminRepo;
    public String loginAdmin(LoginModel loginModel) {
        Admin admin= adminRepo.findByEmail(loginModel.getEmail());
        if(admin!=null &&  loginModel.getPassword().equals(admin.getPassword())){
            return jwtTokenSecurity.generateToken(loginModel.getEmail(),loginModel.getPassword());
        }
        return null;
    }

    public String createCustomer(String token, CustomerModel customerModel) {
        tokenValidator(token);
        Customer customer= Mapper.modelToentity(customerModel);
        customerRepo.save(customer);
        return "customer added succeessfuly";
    }

    public String updateCustomer(String token,CustomerModel customerModel) {

        Customer customer= Mapper.modelToentity(customerModel);
        Optional<Customer> oldOptCustomer=customerRepo.findById(customerModel.getId());
        if(oldOptCustomer.isPresent() && tokenValidator(token)){
            customer.setId(oldOptCustomer.get().getId());
            customerRepo.save(customer);
            return "customer update successfully";
        }
        return "customer not present with this detail";
    }

    public List<CustomerModel> getCustomerList(String token) {
        tokenValidator(token);
        return customerRepo.findAllCustomer();
    }

    public List<CustomerModel> getGetCustomerBySearch(String token,String search) {
        List<CustomerModel> customer=customerRepo.findByDetails(search);
        if(!customer.isEmpty() && tokenValidator(token)) {
        return customer;
        }
        return customer;
    }

    public String  DeleteCustomer(String token,Long id) {
        Optional<Customer> optCustomer= customerRepo.findById(id);
        if(optCustomer.isPresent() && tokenValidator(token)) {
            customerRepo.delete(optCustomer.get());
        }
        return "customer deleted";
    }

    public boolean tokenValidator(String token){
        try{
            String data=jwtTokenSecurity.extractAdminId(token);
            Admin admin=adminRepo.findByEmail(data.split("@@")[0]);
            return jwtTokenSecurity.isTokenValid(token,admin);
        }catch (Exception e){
            return false;
        }
    }
}
