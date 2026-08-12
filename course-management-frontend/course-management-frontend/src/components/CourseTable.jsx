import React from 'react';

const CourseTable = ({ courses, onEditCourse, onDeleteCourse, loading }) => {
  if (loading && courses.length === 0) {
    return (
      <div className="card">
        <div className="card-body text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading courses...</span>
          </div>
          <p className="mt-2">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="card">
        <div className="card-body text-center">
          <p className="text-muted mb-0">No courses available. Add your first course!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Course List</h5>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Course Name</th>
                <th>Instructor</th>
                <th>Duration</th>
                <th>Fee ($)</th>
                <th>Category</th>
                <th>Description</th>
                <th colSpan="2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td><strong>{course.courseName}</strong></td>
                  <td>{course.instructor}</td>
                  <td>{course.duration}</td>
                  <td>${parseFloat(course.fee).toFixed(2)}</td>
                  <td>
                    <span className="badge bg-info text-dark">
                      {course.category}
                    </span>
                  </td>
                  <td>
                    <div style={{ maxWidth: '200px' }}>
                      <small className="text-muted">
                        {course.description && course.description.length > 50
                          ? course.description.substring(0, 50) + '...'
                          : course.description}
                      </small>
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-1"
                      onClick={() => onEditCourse(course)}
                      disabled={loading}
                      title="Edit course"
                    >
                      <i className="bi bi-pencil"></i> Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onDeleteCourse(course.id)}
                      disabled={loading}
                      title="Delete course"
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-2">
          <small className="text-muted">
            Total courses: <strong>{courses.length}</strong>
          </small>
        </div>
      </div>
    </div>
  );
};

export default CourseTable;