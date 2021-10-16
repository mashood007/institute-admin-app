import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from "react-bootstrap";

const url = 'https://institute-backend.herokuapp.com/api/v1/courses/'

class Course extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      //isAuthenticated: false,
      isLoaded: false,
      resData: '',
      courses: [],
      categories: [],
      category_id: '',
      name: '',
      id: '',
      form: 'New'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeCategory = this.changeCategory.bind(this);

  }


  editData = (event) => {
    const course_id = event.target.parentElement.getAttribute("data-id")
    this.edit(course_id)
  }

  listCourses() {
    console.log(this.props.token)
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      },
    })
    .then(data => data.json())
    .then(data => {
       console.log('Success:', data, data.data.categories);
       this.setState({
         isLoaded: true,
         courses: data.data.courses,
         categories: data.data.categories,
         category_id: data.data.categories[0].id,
         id: '',
         form: 'New',
         name: ''
       });
     })
  }

  componentDidMount() {
    this.listCourses()
  }
  render() {
    const { error, isLoaded, courses, categories } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className='container-fluid'>
          <h4>Course</h4>
          <div className='row'>
            <div className='col-sm-6 offset-3 border boder-1 p-5'>
            <h6>{this.state.form} Course</h6>
              <form onSubmit={this.handleSubmit}>
                <label className='col-sm-5'>
                  Course Name:
                  <input type="text" className='form-control' value={this.state.name} onChange={this.handleChange} />
                  <input type="hidden" className='form-control' value={this.state.id} />
                </label>
                <label className='col-sm-5'>
                  Category
                  <select value={this.state.category_id} onChange={this.changeCategory} className='form-control'>
                    {categories.map(category => (
                      <option value={category.id}>{category.name}</option>
                    )
                    )}
                  </select>
                </label>
                <div className='col-sm-6'>
                  <input type="submit" value="Submit" className='btn btn-success btn-sm' />
                </div>
              </form>
            </div>

          </div>
          <table className='table'>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Category</th>
                <th>Exam(Student appeared)</th>
                <th>Exam(Passed)</th>
                <th>Exam(Failed)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id}>
                  <td>{course.name}</td>
                  <td>{course.category}</td>
                  <td>{course.total_students}</td>
                  <td>{course.exam_passed}</td>
                  <td>{course.exam_failed}</td>
                  <td className='btn-group' data-id={course.id} >
                    <Button variant="info" onClick={this.editData}>Edit</Button>
                    <button className='btn btn-danger btn-sm' onClick={this.destroy}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  changeCategory(event) {
    this.setState({category_id: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    var method = ''
    if ( this.state.id.length > 0) {
      method = 'PATCH'
    } else {
      method = 'POST'
    }
    console.log(method)
    fetch(url+this.state.id, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      },
      body: JSON.stringify({name: this.state.name, category_id: this.state.category_id})
    })
    .then(data => data.json())
    .then(data => {
      this.listCourses()
    })
  }

  edit(course_id) {
    fetch(url+course_id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      },
    })
    .then(data => data.json())
    .then(data => {
      this.setState({ name: data.name, id: course_id, form: 'Edit' });
    })
  }

  destroy = (event) => {
    const course_id = event.target.parentElement.getAttribute("data-id")
    this.delete(course_id)
  }

  delete(course_id) {
    fetch(url+course_id, {
      method: 'delete',
      headers: {
        'Authorization': this.props.token,
        "Content-Type" : "application/json",
        Accept: "application/json",
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(data => data.json())
    .then(data => {
      console.log(data)
      if (data.error) {
        alert(data.error)
      } else {
        alert(data.message)
        this.listCourses()
      }

    })
  }

}

export default Course;
