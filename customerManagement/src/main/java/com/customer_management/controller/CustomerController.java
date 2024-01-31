package com.customer_management.controller;


import com.customer_management.model.CustomerModel;
import com.customer_management.model.LoginModel;
import com.customer_management.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class CustomerController {

    @Autowired
    private CustomerService customerService;
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/adminLogin")
    public ResponseEntity<String> loginCustomerAdmin(@RequestBody LoginModel loginModel){
        String response=customerService.loginAdmin(loginModel);
        if(response!=null){
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        return new ResponseEntity<>("",HttpStatus.BAD_REQUEST);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/createcustomer")
    public ResponseEntity<String> createCustomer(@RequestHeader String token,@RequestBody CustomerModel customerModel){
        String response=customerService.createCustomer(token,customerModel);
        if(response!=null){
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        return new ResponseEntity<>("",HttpStatus.BAD_REQUEST);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/updatecustomer")
    public ResponseEntity<String> updateCustomer(@RequestHeader String token,@RequestBody CustomerModel customerModel){
        String response=customerService.updateCustomer(token,customerModel);
        if(response!=null){
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        return new ResponseEntity<>("",HttpStatus.BAD_REQUEST);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getcustomerlist")
    public ResponseEntity<List<CustomerModel>> getCustomerList(@RequestHeader String token){
        return new ResponseEntity<>(customerService.getCustomerList(token),HttpStatus.OK);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("searchCustomer/{search}")
    public ResponseEntity<List<CustomerModel>> getCustomerBySearch(@RequestHeader String token,@PathVariable
    String search){
        return new ResponseEntity<>(customerService.getGetCustomerBySearch(token,search),HttpStatus.OK);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUserById(@RequestHeader String token,@PathVariable Long id){
        return new ResponseEntity<>(customerService.DeleteCustomer(token,id),HttpStatus.OK);
    }
}
