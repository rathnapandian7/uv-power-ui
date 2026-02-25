// API service for Spring Boot backend communication
// Configure the base URL according to your Spring Boot server

const API_BASE_URL = process.env.REACT_APP_API_URL ||  "http://localhost:8080/api";

// ──────────────────────────────────────────────────────────────────────────────
// PRODUCT APIS
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Fetch all products from backend
 * @returns {Promise<Array>} Array of products
 */
export const fetchAllProducts = async () => {
  try {
    const fullUrl = `${API_BASE_URL}/products`;
    console.log("Fetching products from:", fullUrl);
    
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    console.log("API Response Status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch products: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Products fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/**
 * Create a new product
 * @param {Object} productData - Product details
 * @returns {Promise<Object>} Created product with ID
 */
export const createProduct = async (productData, imageFile) => {
  try {
    // Ensure imageFile is provided
    if (!imageFile) {
      throw new Error("Image file is required to create a product");
    }

    const formData = new FormData();
    formData.append("product", JSON.stringify(productData));
    formData.append("file", imageFile);

    const fullUrl = `${API_BASE_URL}/products/add`;
    console.log("Creating product at:", fullUrl);
    
    const response = await fetch(fullUrl, {
      method: "POST",
      body: formData,
      // DO NOT set Content-Type header - browser will set it automatically with boundaries
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create product: ${response.status} - ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

/**
 * Update an existing product
 * @param {string|number} id - Product ID
 * @param {Object} productData - Updated product details
 * @returns {Promise<Object>} Updated product
 */
export const updateProduct = async (id, productData, imageFile) => {
  try {
    const formData = new FormData();
    formData.append("product", JSON.stringify(productData));

    // optional image update
    if (imageFile) {
      formData.append("file", imageFile);
    }

    const fullUrl = `${API_BASE_URL}/products/${id}`;
    console.log("Updating product at:", fullUrl);

    const response = await fetch(fullUrl, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update product: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

/**
 * Delete a product
 * @param {string|number} id - Product ID
 * @returns {Promise<void>}
 */
export const deleteProduct = async (id) => {
  try {
    const fullUrl = `${API_BASE_URL}/products/${id}`;
    console.log("Deleting product at:", fullUrl);

    const response = await fetch(fullUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete product: ${response.status} - ${errorText}`);
    }

    // Backend returns void (204 No Content), so only parse JSON if content exists
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
    
    console.log("Product deleted successfully");
    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

/**
 * Fetch products by category
 * @param {string} categoryId - Category ID
 * @returns {Promise<Array>} Array of products in category
 */
export const fetchProductsByCategory = async (categoryId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/category/${categoryId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

// ──────────────────────────────────────────────────────────────────────────────
// CATEGORY APIS
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Fetch all categories from backend
 * @returns {Promise<Array>} Array of categories
 */
export const fetchAllCategories = async () => {
  try {
    const fullUrl = `${API_BASE_URL}/categories`;
    console.log("Fetching categories from:", fullUrl);
    
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Categories API Response Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch categories: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Categories fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

/**
 * Create a new category with image
 * @param {Object} categoryData - Category details
 * @param {File} imageFile - Category image file
 * @returns {Promise<Object>} Created category with ID
 */
export const createCategory = async (categoryData, imageFile) => {
  try {
    // Ensure imageFile is provided
    if (!imageFile) {
      throw new Error("Image file is required to create a category");
    }

    const formData = new FormData();
    formData.append("category", JSON.stringify(categoryData));
    formData.append("file", imageFile);

    const fullUrl = `${API_BASE_URL}/categories/add`;
    console.log("Creating category at:", fullUrl);
    
    const response = await fetch(fullUrl, {
      method: "POST",
      body: formData,
      // DO NOT set Content-Type header - browser will set it automatically with boundaries
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create category: ${response.status} - ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

/**
 * Update an existing category
 * @param {string|number} id - Category ID
 * @param {Object} categoryData - Updated category details
 * @param {File} imageFile - Optional category image file
 * @returns {Promise<Object>} Updated category
 */
export const updateCategory = async (id, categoryData, imageFile) => {
  try {
    const formData = new FormData();
    formData.append("category", JSON.stringify(categoryData));

    // optional image update
    if (imageFile) {
      formData.append("file", imageFile);
    }

    const fullUrl = `${API_BASE_URL}/categories/${id}`;
    console.log("Updating category at:", fullUrl);

    const response = await fetch(fullUrl, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update category: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

/**
 * Delete a category
 * @param {string|number} id - Category ID
 * @returns {Promise<void>}
 */
export const deleteCategory = async (id) => {
  try {
    const fullUrl = `${API_BASE_URL}/categories/${id}`;
    console.log("Deleting category at:", fullUrl);

    const response = await fetch(fullUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete category: ${response.status} - ${errorText}`);
    }

    // Backend returns void (204 No Content), so only parse JSON if content exists
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
    
    console.log("Category deleted successfully");
    return { success: true, message: "Category deleted successfully" };
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
// ──────────────────────────────────────────────────────────────────────────────
// FILTER APIS
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Fetch products filtered by category
 * @param {String} categoryName - Category name to filter by
 * @returns {Promise<Array>} Array of products in that category
 */
export const getProductsByCategory = async (categoryName) => {
  try {
    // First fetch all products
    const allProducts = await fetchAllProducts();
    
    // Filter by category (case-insensitive)
    const filteredProducts = allProducts.filter(
      product => (product.category || "").toLowerCase() === categoryName.toLowerCase()
    );
    
    console.log(`Products in category '${categoryName}':`, filteredProducts);
    return filteredProducts;
  } catch (error) {
    console.error(`Error fetching products for category '${categoryName}':`, error);
    throw error;
  }
};

// ──────────────────────────────────────────────────────────────────────────────
// CMS CONTENT APIS (Header, Hero, Footer)
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Fetch Header configuration
 * @returns {Promise<Object>} Header settings
 */
export const fetchHeaderConfig = async () => {
  try {
    const fullUrl = `${API_BASE_URL}/cms/header`;
    console.log("Fetching header config from:", fullUrl);
    
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Fallback to localStorage
      const localData = localStorage.getItem("uv-power-header");
      if (localData) {
        return JSON.parse(localData);
      }
      throw new Error(`Failed to fetch header: ${response.status}`);
    }

    const data = await response.json();
    console.log("Header config fetched successfully:", data);
    return data;
  } catch (error) {
    console.warn("Error fetching header from API, using localStorage:", error);
    // Fallback to localStorage
    const localData = localStorage.getItem("uv-power-header");
    return localData ? JSON.parse(localData) : null;
  }
};

/**
 * Fetch Hero section configuration
 * @returns {Promise<Array>} Hero slides
 */
export const fetchHeroConfig = async () => {
  try {
    const fullUrl = `${API_BASE_URL}/cms/hero`;
    console.log("Fetching hero config from:", fullUrl);
    
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Fallback to localStorage
      const localData = localStorage.getItem("uv-power-hero");
      if (localData) {
        return JSON.parse(localData);
      }
      throw new Error(`Failed to fetch hero: ${response.status}`);
    }

    const data = await response.json();
    console.log("Hero config fetched successfully:", data);
    return data;
  } catch (error) {
    console.warn("Error fetching hero from API, using localStorage:", error);
    // Fallback to localStorage
    const localData = localStorage.getItem("uv-power-hero");
    return localData ? JSON.parse(localData) : [];
  }
};

/**
 * Fetch Footer configuration
 * @returns {Promise<Object>} Footer settings
 */
export const fetchFooterConfig = async () => {
  try {
    const fullUrl = `${API_BASE_URL}/cms/footer`;
    console.log("Fetching footer config from:", fullUrl);
    
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Fallback to localStorage
      const localData = localStorage.getItem("uv-power-footer");
      if (localData) {
        return JSON.parse(localData);
      }
      throw new Error(`Failed to fetch footer: ${response.status}`);
    }

    const data = await response.json();
    console.log("Footer config fetched successfully:", data);
    return data;
  } catch (error) {
    console.warn("Error fetching footer from API, using localStorage:", error);
    // Fallback to localStorage
    const localData = localStorage.getItem("uv-power-footer");
    return localData ? JSON.parse(localData) : null;
  }
};

/**
 * Update Header configuration
 * @param {Object} headerData - Header configuration
 * @returns {Promise<Object>} Updated header
 */
export const updateHeaderConfig = async (headerData) => {
  try {
    const fullUrl = `${API_BASE_URL}/cms/header`;
    console.log("Updating header config at:", fullUrl);

    const response = await fetch(fullUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(headerData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update header: ${response.status}`);
    }

    const data = await response.json();
    console.log("Header updated successfully:", data);
    return data;
  } catch (error) {
    console.error("Error updating header:", error);
    throw error;
  }
};

/**
 * Update Hero section configuration
 * @param {Array} heroData - Hero slides array
 * @returns {Promise<Array>} Updated hero slides
 */
export const updateHeroConfig = async (heroData) => {
  try {
    const fullUrl = `${API_BASE_URL}/cms/hero`;
    console.log("Updating hero config at:", fullUrl);

    const response = await fetch(fullUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(heroData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update hero: ${response.status}`);
    }

    const data = await response.json();
    console.log("Hero updated successfully:", data);
    return data;
  } catch (error) {
    console.error("Error updating hero:", error);
    throw error;
  }
};

/**
 * Update Footer configuration
 * @param {Object} footerData - Footer configuration
 * @returns {Promise<Object>} Updated footer
 */
export const updateFooterConfig = async (footerData) => {
  try {
    const fullUrl = `${API_BASE_URL}/cms/footer`;
    console.log("Updating footer config at:", fullUrl);

    const response = await fetch(fullUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(footerData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update footer: ${response.status}`);
    }

    const data = await response.json();
    console.log("Footer updated successfully:", data);
    return data;
  } catch (error) {
    console.error("Error updating footer:", error);
    throw error;
  }
};
