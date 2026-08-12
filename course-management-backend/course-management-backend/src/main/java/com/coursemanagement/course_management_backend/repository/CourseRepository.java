package com.coursemanagement.course_management_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coursemanagement.course_management_backend.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

}