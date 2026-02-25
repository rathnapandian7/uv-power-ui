# Spring Boot API Integration Guide

This React application now integrates with a Spring Boot backend for managing products and categories.

## Configuration

### Environment Variables

Create a `.env` file in the project root with the following:

```env
REACT_APP_API_URL=http://localhost:8080/api
```

Update the `REACT_APP_API_URL` to match your Spring Boot backend URL.

## API Endpoints Required

Your Spring Boot backend should implement the following REST API endpoints:

### Products Endpoints

#### 1. Get All Products
```
GET /api/products
Response: Array of products
```

#### 2. Create Product
```
POST /api/products
Headers: Content-Type: application/json
Body: {
  "name": "string",
  "price": number,
  "category": "string",
  "stock": number,
  "status": "active" | "inactive",
  "image": "string (URL or base64)",
  "description": "string",
  "rating": number (optional),
  "reviews": number (optional),
  "badge": "string (optional)"
}
Response: Created product with ID
```

#### 3. Update Product
```
PUT /api/products/{id}
Headers: Content-Type: application/json
Body: Same as create request
Response: Updated product
```

#### 4. Delete Product
```
DELETE /api/products/{id}
Response: Success message or deleted product
```

#### 5. Get Products by Category
```
GET /api/products/category/{categoryId}
Response: Array of products in category
```

### Categories Endpoints

#### 1. Get All Categories
```
GET /api/categories
Response: Array of categories
```

#### 2. Create Category
```
POST /api/categories
Headers: Content-Type: application/json
Body: {
  "name": "string",
  "icon": "string (emoji or icon character)",
  "description": "string (optional)",
  "link": "string (URL slug)"
}
Response: Created category with ID
```

#### 3. Update Category
```
PUT /api/categories/{id}
Headers: Content-Type: application/json
Body: Same as create request
Response: Updated category
```

#### 4. Delete Category
```
DELETE /api/categories/{id}
Response: Success message or deleted category
```

## Expected Database Schema

### Product Entity
```
{
  id: Long | String (auto-generated),
  name: String,
  price: Double,
  category: String,
  stock: Integer,
  status: String (active/inactive),
  image: String (URL or file path),
  description: String,
  rating: Double (optional),
  reviews: Integer (optional),
  badge: String (optional),
  createdAt: DateTime (optional),
  updatedAt: DateTime (optional)
}
```

### Category Entity
```
{
  id: Long | String (auto-generated),
  name: String,
  icon: String,
  description: String (optional),
  link: String (unique),
  createdAt: DateTime (optional),
  updatedAt: DateTime (optional)
}
```

## Frontend Features

### Admin Dashboard
- **View Products**: List of all products with filtering and sorting
- **Add Product**: Create new products with image upload and details
- **Edit Product**: Update existing product information
- **Delete Product**: Remove products from the system
- **Manage Categories**: CRUD operations for categories

### Products Page
- **Display Products**: Fetch and display all products from backend
- **Sort & Filter**: Sort by price, rating, popularity
- **Error Handling**: Fallback to cached products if API fails
- **Loading States**: User-friendly loading indicators

## Error Handling

The application includes automatic error handling:
- API failures are logged to console
- Fallback to cached data is provided
- User-friendly error messages are displayed
- Network errors are handled gracefully

## API Service File

The API service is located at: `src/services/api.js`

All API calls are centralized in this file for easy maintenance and testing.

## CORS Configuration

Ensure your Spring Boot backend has CORS enabled to allow requests from your React frontend:

```java
@Configuration
public class CorsConfig {
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // React dev server
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

## Testing the Integration

1. Start your Spring Boot backend server
2. Update the `REACT_APP_API_URL` in `.env` file
3. Start the React development server: `npm start`
4. Navigate to Admin Dashboard to test product and category operations
5. Navigate to Products page to verify fetching and display

## Troubleshooting

### CORS Errors
- Ensure your backend has CORS properly configured
- Check that the API URL in `.env` is correct

### 404 Errors
- Verify the API endpoints match exactly
- Check the URL in the error message

### Empty Products List
- Ensure products exist in the database
- Check network tab in browser dev tools
- Verify API is returning data

## Future Enhancements

- Add pagination for large product lists
- Implement search functionality
- Add batch operations (bulk delete, update)
- Add product filtering by category in API
- Implement caching strategies
