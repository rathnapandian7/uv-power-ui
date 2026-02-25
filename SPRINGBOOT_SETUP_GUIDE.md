# Spring Boot API Integration Setup Guide

## Quick Start

This guide will help you integrate the React frontend with a Spring Boot backend API.

## What Was Changed

✅ **API Service Layer** - Created `src/services/api.js` with all API communication functions  
✅ **Admin Dashboard** - Updated to use API for creating/updating/deleting products and categories  
✅ **Products Page** - Updated to fetch products from API on load  
✅ **Environment Config** - Added `.env` file for configurable API URL  

## Step-by-Step Setup

### Step 1: Configure API URL

Edit the `.env` file in your project root:

```env
REACT_APP_API_URL=http://localhost:8080/api
```

Change the URL if your Spring Boot backend runs on a different address or port.

### Step 2: Start the React Frontend

```bash
npm start
```

The application will open at `http://localhost:3000`

### Step 3: Implement Spring Boot Backend

Create a new Spring Boot project (or use existing one) with:

#### 3.1 Project Structure
```
your-backend-project/
├── src/main/java/com/uvpower/
│   ├── controller/
│   │   ├── ProductController.java
│   │   └── CategoryController.java
│   ├── model/
│   │   ├── Product.java
│   │   └── Category.java
│   ├── repository/
│   │   ├── ProductRepository.java
│   │   └── CategoryRepository.java
│   ├── service/
│   │   ├── ProductService.java
│   │   └── CategoryService.java
│   └── Application.java
└── resources/
    └── application.properties
```

#### 3.2 Dependencies (pom.xml)

```xml
<dependencies>
    <!-- Spring Boot Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- Spring Boot Data JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <!-- MySQL Driver (or your database) -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.33</version>
    </dependency>
    
    <!-- Lombok (optional, for reducing boilerplate) -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>
```

#### 3.3 Entity Classes

**Product.java**
```java
package com.uvpower.model;

import javax.persistence.*;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private Double price;
    
    private String category;
    private Integer stock;
    private String status;
    private String image;
    private String description;
    private Double rating;
    private Integer reviews;
    private String badge;
    
    // Getters and Setters
    // ... (use Lombok @Data or generate manually)
}
```

**Category.java**
```java
package com.uvpower.model;

import javax.persistence.*;

@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String name;
    
    private String icon;
    private String description;
    private String link;
    
    // Getters and Setters
    // ... (use Lombok @Data or generate manually)
}
```

#### 3.4 Repository Classes

**ProductRepository.java**
```java
package com.uvpower.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.uvpower.model.Product;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
}
```

**CategoryRepository.java**
```java
package com.uvpower.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.uvpower.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
```

#### 3.5 Service Classes

**ProductService.java**
```java
package com.uvpower.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.uvpower.model.Product;
import com.uvpower.repository.ProductRepository;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    public Product getProductById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.orElse(null);
    }
    
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }
    
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }
    
    public Product updateProduct(Long id, Product productDetails) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            Product p = product.get();
            p.setName(productDetails.getName());
            p.setPrice(productDetails.getPrice());
            p.setCategory(productDetails.getCategory());
            p.setStock(productDetails.getStock());
            p.setStatus(productDetails.getStatus());
            p.setImage(productDetails.getImage());
            p.setDescription(productDetails.getDescription());
            p.setRating(productDetails.getRating());
            p.setReviews(productDetails.getReviews());
            p.setBadge(productDetails.getBadge());
            return productRepository.save(p);
        }
        return null;
    }
    
    public boolean deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
```

**CategoryService.java**
```java
package com.uvpower.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.uvpower.model.Category;
import com.uvpower.repository.CategoryRepository;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
    
    public Category getCategoryById(Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        return category.orElse(null);
    }
    
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }
    
    public Category updateCategory(Long id, Category categoryDetails) {
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isPresent()) {
            Category c = category.get();
            c.setName(categoryDetails.getName());
            c.setIcon(categoryDetails.getIcon());
            c.setDescription(categoryDetails.getDescription());
            c.setLink(categoryDetails.getLink());
            return categoryRepository.save(c);
        }
        return null;
    }
    
    public boolean deleteCategory(Long id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
```

#### 3.6 CORS Configuration

**CorsConfig.java**
```java
package com.uvpower.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                    "http://localhost:3000",
                    "http://localhost:3001",
                    "http://127.0.0.1:3000"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

#### 3.7 Application Properties

**application.properties**
```properties
# Server Port
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/uvpower_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=true
```

### Step 4: Database Setup

Create the database:

```sql
CREATE DATABASE uvpower_db;

USE uvpower_db;

CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    icon VARCHAR(50),
    description TEXT,
    link VARCHAR(255)
);

CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DOUBLE NOT NULL,
    category VARCHAR(255),
    stock INT,
    status VARCHAR(50),
    image LONGTEXT,
    description TEXT,
    rating DOUBLE,
    reviews INT,
    badge VARCHAR(100)
);
```

### Step 5: Run Backend

```bash
mvn spring-boot:run
```

The backend will start at `http://localhost:8080`

### Step 6: Test the Integration

1. Open React app at `http://localhost:3000`
2. Navigate to Admin Dashboard
3. Try creating a new product
4. Check database to confirm data was saved
5. Refresh Products page to see fetched products

## Verification Checklist

- [ ] Spring Boot backend running on configured URL
- [ ] MySQL database created with tables
- [ ] CORS enabled in Spring Boot
- [ ] React `.env` file configured correctly
- [ ] Products page loads products from API
- [ ] Admin Dashboard can create products
- [ ] Admin Dashboard can update products
- [ ] Admin Dashboard can delete products
- [ ] Database reflects all changes
- [ ] Error handling works with fallback data

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 8080 (Windows)
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Or use different port in application.properties
server.port=8081
```

### Database Connection Error
- Verify MySQL is running
- Check connection string is correct
- Verify username/password
- Ensure `uvpower_db` database exists

### CORS Error on Frontend
- Check CORS configuration in Spring Boot
- Verify React frontend URL is in allowedOrigins
- Restart Spring Boot after changing CORS config

### API Returning 404
- Verify controller endpoints match API service calls
- Check controller is in scanned package
- Verify URL path is correct

## API Response Examples

See `SAMPLE_API_RESPONSE.json` for example data structures.

## Reference Files

- **API Integration Guide**: `API_INTEGRATION_GUIDE.md`
- **Implementation Summary**: `INTEGRATION_SUMMARY.md`
- **Sample Controllers**: `SAMPLE_ProductController.java`, `SAMPLE_CategoryController.java`
- **Sample Responses**: `SAMPLE_API_RESPONSE.json`
- **API Service**: `src/services/api.js`

## Support Resources

1. Check browser console for error messages
2. Check Spring Boot logs for backend errors
3. Use browser DevTools Network tab to inspect API calls
4. Verify database has expected data with: `SELECT * FROM products;`

---

**Ready to integrate?** Follow the steps above and you'll have a fully functional backend API connected to your React frontend!
