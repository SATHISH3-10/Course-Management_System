package com.coursemanagement.course_management_backend.service;

import com.coursemanagement.course_management_backend.exception.ResourceNotFoundException;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coursemanagement.course_management_backend.entity.Course;
import com.coursemanagement.course_management_backend.repository.CourseRepository;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public Course addCourse(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Course getCourseById(Long id) {

        return courseRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException("Course not found with ID : " + id));
    }

    @Override
    public Course updateCourse(Long id, Course course) {

        Course existingCourse = courseRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException("Course not found with ID : " + id));

        existingCourse.setCourseName(course.getCourseName());
        existingCourse.setInstructor(course.getInstructor());
        existingCourse.setDuration(course.getDuration());
        existingCourse.setFee(course.getFee());
        existingCourse.setCategory(course.getCategory());
        existingCourse.setDescription(course.getDescription());

        return courseRepository.save(existingCourse);
    }

    @Override
    public void deleteCourse(Long id) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException("Course not found with ID : " + id));

        courseRepository.delete(course);
    }
}