package com.customer_management.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerModel {
    private Long id;
    private String first_name;
    private String last_name;
    private String street;
    private String city;
    private String state;
    private String email;
    private String phone_number;
}
