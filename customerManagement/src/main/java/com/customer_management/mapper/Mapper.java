package com.customer_management.mapper;

import com.customer_management.entity.Customer;
import com.customer_management.model.CustomerModel;
import org.modelmapper.ModelMapper;

public class Mapper {
    private static final ModelMapper mapper=new ModelMapper();


    public static Customer modelToentity(CustomerModel customerModel){
        return mapper.map(customerModel, Customer.class);
    }

    public static CustomerModel entityToModel(Customer customer){
        return mapper.map(customer, CustomerModel.class);
    }
}
