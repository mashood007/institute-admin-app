import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from "react-bootstrap";
const url = 'https://institute-backend.herokuapp.com/api/v1/students/'


class Student extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      //isAuthenticated: false,
      isLoaded: false,
      resData: '',
      items: [],
      name: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  destroy = (event) => {
    const id = event.target.parentElement.getAttribute("data-id")
    this.delete(id)
  }

  listStudents() {
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      },
    })
    .then(data => data.json())
    .then(data => {
       console.log('Success:', data);
       this.setState({
         isLoaded: true,
         items: data
       });
     })
  }

  componentDidMount() {
    this.listStudents()
  }
  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className='container-fluid'>
          <form onSubmit={this.handleSubmit}>
            <label>
              Student Name:
              <input type="text" value={this.state.name} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Add" className='btn btn-success' />
          </form>
          <table className='table'>
            <thead>
              <tr>
                <th>Roll no.</th>
                <th>Student Name</th>
                <th>courses</th>
                <th>Exams(Passed)</th>
                <th>Exams(Failed)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>R.{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.total_courses}</td>
                  <td>{item.total_passed}</td>
                  <td>{item.total_failed}</td>
                  <td className='btn-group' data-id={item.id}>
                    <Button variant="info">Edit</Button>
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

  handleSubmit(event) {
    event.preventDefault();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: this.state.name})
    })
    .then(data => data.json())
    .then(data => {
      this.listStudents()
    })
  }

  delete(id) {
    fetch(url+id, {
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
        this.listStudents()
      }

    })
  }

}

export default Student;
