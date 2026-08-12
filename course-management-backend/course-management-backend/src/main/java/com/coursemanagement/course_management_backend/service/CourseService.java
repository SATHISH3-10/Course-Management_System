package com.coursemanagement.course_management_backend.service;

import java.util.List;

import com.coursemanagement.course_management_backend.entity.Course;

public interface CourseService {

    Course addCourse(Course course);

    List<Course> getAllCourses();

    Course getCourseById(Long id);

    Course updateCourse(Long id, Course course);

    void deleteCourse(Long id);
}