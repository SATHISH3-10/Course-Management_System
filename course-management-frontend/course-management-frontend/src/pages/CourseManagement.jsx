import React, { useState, useEffect } from 'react';
import '../App.css';
import Navbar from '../components/Navbar';
import CourseForm from '../components/CourseForm';
import CourseTable from '../components/CourseTable';
import { CourseService } from '../services/CourseService';
import { useNavigate } from 'react-router-dom';

function CourseManagement() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("loggedIn") === "true");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Load courses when component mounts
  useEffect(() => {
    console.log('🔄 App mounted - Loading courses...');
    loadCourses();
  }, []);
  useEffect(() => {
  if (!isLoggedIn) {
    navigate("/login");
  }
}, [isLoggedIn, navigate]);

  const loadCourses = async () => {
    console.log('🔄 Fetching courses from backend...');
    setLoading(true);
    setError(null);
    try {
      const data = await CourseService.getAllCourses();
      console.log('✅ Courses loaded:', data);
      setCourses(data);
    } catch (err) {
      console.error('❌ Error loading courses:', err);
      setError('Failed to load courses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async (courseData) => {
    console.log('📝 Adding course:', courseData);
    setLoading(true);
    setError(null);
    setSuccessMessage('');
    try {
      const result = await CourseService.addCourse(courseData);
      console.log('✅ Course added:', result);
      setSuccessMessage('Course added successfully!');
      await loadCourses(); // Refresh the list
      setSelectedCourse(null);
    } catch (err) {
      console.error('❌ Error adding course:', err);
      setError('Failed to add course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCourse = async (id, courseData) => {
    console.log('📝 Updating course:', id, courseData);
    setLoading(true);
    setError(null);
    setSuccessMessage('');
    try {
      const result = await CourseService.updateCourse(id, courseData);
      console.log('✅ Course updated:', result);
      setSuccessMessage('Course updated successfully!');
      await loadCourses(); // Refresh the list
      setSelectedCourse(null);
    } catch (err) {
      console.error('❌ Error updating course:', err);
      setError('Failed to update course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (id) => {
    console.log('🗑️ Deleting course:', id);
    if (!window.confirm('Are you sure you want to delete this course?')) {
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccessMessage('');
    try {
      await CourseService.deleteCourse(id);
      console.log('✅ Course deleted');
      setSuccessMessage('Course deleted successfully!');
      await loadCourses(); // Refresh the list
      if (selectedCourse && selectedCourse.id === id) {
        setSelectedCourse(null);
      }
    } catch (err) {
      console.error('❌ Error deleting course:', err);
      setError('Failed to delete course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCourse = (course) => {
    console.log('✏️ Editing course:', course);
    setSelectedCourse(course);
    document.getElementById('courseForm').scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    console.log('❌ Cancelling edit');
    setSelectedCourse(null);
    setError(null);
    setSuccessMessage('');
  };

  return (
    <div className="App">
      <Navbar
    isLoggedIn={isLoggedIn}
    setIsLoggedIn={setIsLoggedIn}
/>
      <div className="container-fluid">
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button type="button" className="btn-close" onClick={() => setError(null)}></button>
          </div>
        )}
        {successMessage && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {successMessage}
            <button type="button" className="btn-close" onClick={() => setSuccessMessage('')}></button>
          </div>
        )}
        
        <div id="courseForm" className="mb-4">
          <CourseForm
            onAddCourse={handleAddCourse}
            onUpdateCourse={handleUpdateCourse}
            selectedCourse={selectedCourse}
            onCancelEdit={handleCancelEdit}
            loading={loading}
          />
        </div>
        
        <CourseTable
          courses={courses}
          onEditCourse={handleEditCourse}
          onDeleteCourse={handleDeleteCourse}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default CourseManagement;