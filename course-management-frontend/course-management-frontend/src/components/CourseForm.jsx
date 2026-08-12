import React, { useState, useEffect } from 'react';

const CourseForm = ({ 
  onAddCourse, 
  onUpdateCourse, 
  selectedCourse, 
  onCancelEdit,
  loading 
}) => {
  const [formData, setFormData] = useState({
    courseName: '',
    instructor: '',
    duration: '',
    fee: '',
    category: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedCourse) {
      setFormData({
        courseName: selectedCourse.courseName || '',
        instructor: selectedCourse.instructor || '',
        duration: selectedCourse.duration || '',
        fee: selectedCourse.fee || '',
        category: selectedCourse.category || '',
        description: selectedCourse.description || ''
      });
    } else {
      resetForm();
    }
  }, [selectedCourse]);

  const resetForm = () => {
    setFormData({
      courseName: '',
      instructor: '',
      duration: '',
      fee: '',
      category: '',
      description: ''
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.courseName.trim()) {
      newErrors.courseName = 'Course name is required';
    }
    if (!formData.instructor.trim()) {
      newErrors.instructor = 'Instructor name is required';
    }
    if (!formData.duration.trim()) {
      newErrors.duration = 'Duration is required';
    }
    if (!formData.fee || parseFloat(formData.fee) <= 0) {
      newErrors.fee = 'Valid fee is required';
    }
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const courseData = {
      ...formData,
      fee: parseFloat(formData.fee)
    };

    if (selectedCourse) {
      onUpdateCourse(selectedCourse.id, courseData);
    } else {
      onAddCourse(courseData);
    }
    
    if (!selectedCourse) {
      resetForm();
    }
  };

  const handleCancel = () => {
    resetForm();
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">
          {selectedCourse ? 'Update Course' : 'Add New Course'}
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="courseName" className="form-label">
                Course Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.courseName ? 'is-invalid' : ''}`}
                id="courseName"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                placeholder="Enter course name"
                disabled={loading}
              />
              {errors.courseName && (
                <div className="invalid-feedback">{errors.courseName}</div>
              )}
            </div>
            
            <div className="col-md-6 mb-3">
              <label htmlFor="instructor" className="form-label">
                Instructor <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.instructor ? 'is-invalid' : ''}`}
                id="instructor"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                placeholder="Enter instructor name"
                disabled={loading}
              />
              {errors.instructor && (
                <div className="invalid-feedback">{errors.instructor}</div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="duration" className="form-label">
                Duration <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.duration ? 'is-invalid' : ''}`}
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 8 weeks"
                disabled={loading}
              />
              {errors.duration && (
                <div className="invalid-feedback">{errors.duration}</div>
              )}
            </div>
            
            <div className="col-md-4 mb-3">
              <label htmlFor="fee" className="form-label">
                Fee ($) <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className={`form-control ${errors.fee ? 'is-invalid' : ''}`}
                id="fee"
                name="fee"
                value={formData.fee}
                onChange={handleChange}
                placeholder="Enter fee amount"
                min="0"
                step="0.01"
                disabled={loading}
              />
              {errors.fee && (
                <div className="invalid-feedback">{errors.fee}</div>
              )}
            </div>
            
            <div className="col-md-4 mb-3">
              <label htmlFor="category" className="form-label">
                Category <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Programming"
                disabled={loading}
              />
              {errors.category && (
                <div className="invalid-feedback">{errors.category}</div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description <span className="text-danger">*</span>
            </label>
            <textarea
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              id="description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter course description"
              disabled={loading}
            ></textarea>
            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
          </div>

          <div className="d-flex gap-2">
            <button
              type="submit"
              className={`btn ${selectedCourse ? 'btn-success' : 'btn-primary'}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                  {selectedCourse ? 'Updating...' : 'Saving...'}
                </>
              ) : (
                selectedCourse ? 'Update Course' : 'Save Course'
              )}
            </button>
            
            {selectedCourse && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;