package com.usermanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.jpa.repository.JpaRepository;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import java.util.List;

@SpringBootApplication
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserManagementApplication.class, args);
    }

    @Autowired
    UserRepository repo;

    @GetMapping
    public List<User> getUsers() {
        return repo.findAll();
    }

    @PostMapping
    public User addUser(@RequestBody User u) {
        return repo.save(u);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User u) {
        u.setId(id); // simple update
        return repo.save(u);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        repo.deleteById(id);
    }

    @Bean
    CommandLineRunner startData(UserRepository repo) {
        return args -> {
            if(repo.count() == 0) {
                // adding simple human names as asked
                repo.save(new User("omkar@gmail.com", "Omkar", "Infosys", true, "10-05-2026", "Admin", "9999999991"));
                repo.save(new User("harish@yahoo.com", "Harish", "TCS", true, "11-05-2026", "Dev", "9999999992"));
                repo.save(new User("mounika@hotmail.com", "Mounika", "Wipro", false, "12-05-2026", "Tester", "9999999993"));
                repo.save(new User("sravani@gmail.com", "Sravani", "Cognizant", true, "13-05-2026", "HR", "9999999994"));
                repo.save(new User("dinesh@gmail.com", "Dinesh", "Pennant", true, "14-05-2026", "Manager", "9999999995"));
            }
        };
    }
}

interface UserRepository extends JpaRepository<User, Long> {}

@Entity
@Table(name="users")
class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String name;
    private String company;
    private boolean active;
    private String loginTime;
    private String role;
    private String phone;

    public User() {}
    public User(String email, String name, String company, boolean active, String loginTime, String role, String phone) {
        this.email = email;
        this.name = name;
        this.company = company;
        this.active = active;
        this.loginTime = loginTime;
        this.role = role;
        this.phone = phone;
    }

    // simple getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    public String getLoginTime() { return loginTime; }
    public void setLoginTime(String loginTime) { this.loginTime = loginTime; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
}
