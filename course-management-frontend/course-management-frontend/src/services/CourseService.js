import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/courses';

export const CourseService = {
  getAllCourses: async () => {
    try {
      console.log('📡 API Call: GET', BASE_URL);
      const response = await axios.get(BASE_URL);
      console.log('📡 API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ API Error:', error);
      throw error;
    }
  },

  getCourseById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching course with ID ${id}:`, error);
      throw error;
    }
  },

  addCourse: async (course) => {
    try {
      console.log('📡 API Call: POST', BASE_URL, course);
      const response = await axios.post(BASE_URL, course);
      console.log('📡 API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ API Error:', error);
      throw error;
    }
  },

  updateCourse: async (id, course) => {
    try {
      console.log('📡 API Call: PUT', `${BASE_URL}/${id}`, course);
      const response = await axios.put(`${BASE_URL}/${id}`, course);
      console.log('📡 API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Error updating course with ID ${id}:`, error);
      throw error;
    }
  },

  deleteCourse: async (id) => {
    try {
      console.log('📡 API Call: DELETE', `${BASE_URL}/${id}`);
      const response = await axios.delete(`${BASE_URL}/${id}`);
      console.log('📡 API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Error deleting course with ID ${id}:`, error);
      throw error;
    }
  }
};  