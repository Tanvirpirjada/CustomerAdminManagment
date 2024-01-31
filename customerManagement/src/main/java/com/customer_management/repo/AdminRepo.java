package com.customer_management.repo;

import com.customer_management.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepo extends JpaRepository<Admin,Long> {

    public Admin findByEmail(String email);
}
