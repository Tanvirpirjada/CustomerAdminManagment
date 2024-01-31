package com.customer_management.exception;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class BadRequestException  extends RuntimeException{

//    BadRequestException(String message){
//        super(message);
//    }
//
//    public static  BadRequestException of(String message)
//    {
//        return new BadRequestException(message);
//    }

}
