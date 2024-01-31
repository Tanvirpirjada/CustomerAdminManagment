package com.customer_management.repo;

import com.customer_management.entity.Customer;
import com.customer_management.model.CustomerModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerRepo extends JpaRepository<Customer,Long> {
    Customer findByEmail(String email);

    @Query("select new com.customer_management.model.CustomerModel(c.id,c.first_name,c.last_name,c.street,c.city,c.state,c.email,c.phone_number) from Customer c")
    List<CustomerModel> findAllCustomer();

    @Query("select new com.customer_management.model.CustomerModel(c.id,c.first_name,c.last_name,c.street,c.city,c.state,c.email,c.phone_number)  from Customer c WHERE c.first_name LIKE %:userId% OR c.last_name LIKE %:userId% OR c.email LIKE %:userId% OR c.phone_number LIKE %:userId%")
    List<CustomerModel> findByDetails(String userId);
}
