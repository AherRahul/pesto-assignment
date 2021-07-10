import React, { Component } from "react";
import axios from "axios";
import { withRouter } from 'react-router'
import "./SearchStudentByTimeStamp.css";
import Student from '../Student/Student';

class SearchStudentByTimeStamp extends Component {
  state = { data: null, min: "", max: "" };

  onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

  updateStudentHandler = async (e) => {
    e.preventDefault();

    try {
        const students = await axios.get(`/api/students/${this.state.min}/${this.state.max}`);
        console.log(students);
        this.setState({ data: students.data });
    } catch(error) {

    }
  }

  render() {

    let students;

    if (this.state.data)
      students =
        this.state.data.students &&
        this.state.data.students.map(student => (
          <Student key={student._id} {...student} removeStudent={this.removeStudent} />
        ));

    return (
        <div className="p-5 justify-content-center">
            <div className="">
                <form className="row justify-content-center" onSubmit={this.updateStudentHandler}>
                    <input
                        type="number"
                        placeholder="min"
                        name="min"
                        onChange={ this.onChangeHandler }
                        className="Search-Student-Input col-5"
                    />
                    <input
                        type="munber"
                        placeholder="max"
                        name="max"
                        onChange={ this.onChangeHandler }
                        className="Search-Student-Input col-5"
                    />
                    <button  type="submit" className="btn btn-outline-primary btn-sm col-2">Search</button>
                    <button type="reset" className="Add-Student-Reset fa fa-refresh"></button>
                </form>
            </div>

            <div className="">
                <div className="Table-Wrapper">
                    <table className="Table">
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Enrollment Number</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>{students}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
  }
}

export default  withRouter(SearchStudentByTimeStamp);
