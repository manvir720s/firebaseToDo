import React, { Component } from "react";
import DataService from "../services/data.service";

export default class ToDo extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateToDo = this.updateToDo.bind(this);
    this.deleteToDo = this.deleteToDo.bind(this);

    this.state = {
      currentToDo: {
        key: null,
        title: "",
        description: "",
        published: false,
      },
      message: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { ToDo } = nextProps;
    if (prevState.currentToDo.key !== ToDo.key) {
      return {
        currentToDo: ToDo,
        message: ""
      };
    }

    return prevState.currentToDo;
  }

  componentDidMount() {
    this.setState({
      currentToDo: this.props.ToDo,
    });
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentToDo: {
          ...prevState.currentToDo,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentToDo: {
        ...prevState.currentToDo,
        description: description,
      },
    }));
  }

  updatePublished(status) {
    DataService.update(this.state.currentToDo.key, {
      published: status,
    })
      .then(() => {
        this.setState((prevState) => ({
          currentToDo: {
            ...prevState.currentToDo,
            published: status,
          },
          message: "The status was updated successfully!",
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateToDo() {
    const data = {
      title: this.state.currentToDo.title,
      description: this.state.currentToDo.description,
    };

    DataService.update(this.state.currentToDo.key, data)
      .then(() => {
        this.setState({
          message: "The item was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteToDo() {
    DataService.delete(this.state.currentToDo.key)
      .then(() => {
        this.props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentToDo } = this.state;

    return (
      <div>
        <h4>ToDo</h4>
        {currentToDo ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentToDo.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentToDo.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentToDo.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentToDo.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteToDo}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateToDo}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a ToDo...</p>
          </div>
        )}
      </div>
    );
  }
}