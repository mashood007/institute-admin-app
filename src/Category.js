import React from 'react';
import ReactDOM from 'react-dom';

const url = 'https://institute-backend.herokuapp.com/api/v1/categories/'

class Category extends React.Component {
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

  list() {
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
    this.list()
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
         <h4>Course categories</h4>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.name} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Add" className='btn btn-success' />
          </form>
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <button className='btn btn-danger'>Delete</button>
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
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      },
      body: JSON.stringify({name: this.state.name})
    })
    .then(data => data.json())
    .then(data => {
      this.list()
    })
  }



}

export default Category;
