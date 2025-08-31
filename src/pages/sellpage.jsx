import React, { useState } from "react";
import { Upload, X, Plus } from "lucide-react";
import "./sellpage.css";

const categories = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports & Outdoors",
  "Books & Media",
  "Toys & Games",
  "Automotive",
  "Health & Beauty",
  "Collectibles",
  "Other",
];

const conditions = [
  { value: "new", label: "New", description: "Brand new, never used" },
  { value: "like-new", label: "Like New", description: "Excellent condition, barely used" },
  { value: "good", label: "Good", description: "Good condition, some signs of use" },
  { value: "fair", label: "Fair", description: "Fair condition, noticeable wear" },
];

export default function SellPage() {
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    price: "",
    originalPrice: "",
    brand: "",
    model: "",
    location: "",
  });

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setImages((prev) => [...prev, e.target.result]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags((prev) => [...prev, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { ...formData, images, tags });
    alert("Product listed successfully!");
  };

  return (
    <div className="sell-page-container">
      {/* Header would go here */}

      <main className="sell-main">
        <div className="sell-form-wrapper">
          <div className="sell-page-header">
            <h1 className="sell-page-title">Sell Your Item</h1>
            <p className="sell-page-subtitle">List your item on ResellerHub and reach thousands of buyers</p>
          </div>

          <form onSubmit={handleSubmit} className="sell-form">
            {/* Images Section */}
            <div className="sell-card">
              <div className="sell-card-header">
                <h2 className="sell-card-title">Product Images</h2>
              </div>
              <div className="sell-card-content">
                <div className="image-grid">
                  {images.map((image, index) => (
                    <div key={index} className="image-preview-container">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Product ${index + 1}`}
                        className="image-preview"
                      />
                      <button
                        type="button"
                        className="remove-image-btn"
                        onClick={() => removeImage(index)}
                      >
                        <X className="remove-image-icon" />
                      </button>
                    </div>
                  ))}

                  <label className="image-upload-label">
                    <Upload className="upload-icon" />
                    <span className="upload-text">Add Photos</span>
                    <input type="file" multiple accept="image/*" className="file-input" onChange={handleImageUpload} />
                  </label>
                </div>
                <p className="image-info">Add up to 8 photos. First photo will be the main image.</p>
              </div>
            </div>

            {/* Basic Information */}
            <div className="sell-card">
              <div className="sell-card-header">
                <h2 className="sell-card-title">Basic Information</h2>
              </div>
              <div className="sell-card-content form-section">
                <div>
                  <label htmlFor="title" className="form-label">Title *</label>
                  <input
                    id="title"
                    type="text"
                    placeholder="e.g., iPhone 14 Pro Max 256GB Space Black"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="form-label">Description *</label>
                  <textarea
                    id="description"
                    placeholder="Describe your item's condition, features, and any included accessories..."
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-textarea"
                    required
                  ></textarea>
                </div>

                <div className="form-grid">
                  <div>
                    <label htmlFor="category" className="form-label">Category *</label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={handleSelectChange("category")}
                      className="form-select"
                      required
                    >
                      <option value="" disabled>Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category.toLowerCase()}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="condition" className="form-label">Condition *</label>
                    <select
                      id="condition"
                      value={formData.condition}
                      onChange={handleSelectChange("condition")}
                      className="form-select"
                      required
                    >
                      <option value="" disabled>Select condition</option>
                      {conditions.map((condition) => (
                        <option key={condition.value} value={condition.value}>
                          {condition.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-grid">
                  <div>
                    <label htmlFor="brand" className="form-label">Brand</label>
                    <input
                      id="brand"
                      type="text"
                      placeholder="e.g., Apple, Nike, Samsung"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="model" className="form-label">Model</label>
                    <input
                      id="model"
                      type="text"
                      placeholder="e.g., iPhone 14 Pro Max"
                      value={formData.model}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="sell-card">
              <div className="sell-card-header">
                <h2 className="sell-card-title">Pricing</h2>
              </div>
              <div className="sell-card-content form-section">
                <div className="form-grid">
                  <div>
                    <label htmlFor="price" className="form-label">Selling Price *</label>
                    <div className="price-input-wrapper">
                      <span className="price-prefix">$</span>
                      <input
                        id="price"
                        type="number"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="form-input price-input"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="originalPrice" className="form-label">Original Price (optional)</label>
                    <div className="price-input-wrapper">
                      <span className="price-prefix">$</span>
                      <input
                        id="originalPrice"
                        type="number"
                        placeholder="0.00"
                        value={formData.originalPrice}
                        onChange={handleInputChange}
                        className="form-input price-input"
                      />
                    </div>
                  </div>
                </div>
                <p className="price-info">
                  Platform fee: 2% of selling price will be deducted from your earnings
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="sell-card">
              <div className="sell-card-header">
                <h2 className="sell-card-title">Tags</h2>
              </div>
              <div className="sell-card-content">
                <div className="tag-list">
                  {tags.map((tag) => (
                    <div key={tag} className="tag-badge">
                      {tag}
                      <button
                        type="button"
                        className="remove-tag-btn"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="remove-tag-icon" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="tag-input-group">
                  <input
                    placeholder="Add tags (e.g., vintage, rare, limited edition)"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    className="form-input tag-input"
                  />
                  <button type="button" className="add-tag-btn" onClick={addTag}>
                    <Plus className="add-tag-icon" />
                  </button>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="sell-card">
              <div className="sell-card-header">
                <h2 className="sell-card-title">Location</h2>
              </div>
              <div className="sell-card-content">
                <div>
                  <label htmlFor="location" className="form-label">Location *</label>
                  <input
                    id="location"
                    type="text"
                    placeholder="e.g., New York, NY"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                  <p className="location-info">This helps buyers find items near them</p>
                </div>
              </div>
            </div>

            <div className="submit-buttons">
              <button type="submit" className="list-item-btn">
                List Item
              </button>
              <button type="button" className="save-draft-btn">
                Save Draft
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}