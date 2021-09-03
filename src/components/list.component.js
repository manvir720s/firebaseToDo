import React, { Component } from "react";
import DataService from "../services/data.service";

import ToDo from "./item.component";

export default class ToDosList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveToDo = this.setActiveToDo.bind(this);
    this.removeAllToDos = this.removeAllToDos.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      ToDos: [],
      currentToDo: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    DataService.getAll().on("value", this.onDataChange);
  }

  componentWillUnmount() {
    DataService.getAll().off("value", this.onDataChange);
  }

  onDataChange(items) {
    let ToDos = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      ToDos.push({
        key: key,
        title: data.title,
        description: data.description,
        published: data.published,
      });
    });

    this.setState({
      ToDos: ToDos,
    });
  }

  refreshList() {
    this.setState({
      currentToDo: null,
      currentIndex: -1,
    });
  }

  setActiveToDo(ToDo, index) {
    this.setState({
      currentToDo: ToDo,
      currentIndex: index,
    });
  }

  removeAllToDos() {
    DataService.deleteAll()
      .then(() => {
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { ToDos, currentToDo, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>To Do List</h4>

          <ul className="list-group">
            {ToDos &&
              ToDos.map((ToDo, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveToDo(ToDo, index)}
                  key={index}
                >
                  {ToDo.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllToDos}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentToDo ? (
            <ToDo
              ToDo={currentToDo}
              refreshList={this.refreshList}
            />
          ) : (
            <div>
              <br />
              <p>Please click on an item...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}