import "./Role.scss";
import { useState, useEffect } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

const Role = (props) => {
  const [listChilds, setListChilds] = useState({
    child1: { url: "", description: "" }
  });



  const handleOnChangeInput = (name, key, value) => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[key][name] = value;
    setListChilds(_listChilds);
  }

  const handleAddNewInput = () => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[`child-${uuidv4()}`] = { url: "", description: "" };
    setListChilds(_listChilds);
  }

  const handleRemoveInput = (key) => {
    let _listChilds = _.cloneDeep(listChilds);
    delete _listChilds[key];
    setListChilds(_listChilds);
  }

  return (
    <div className="role-container">
      <div className="container">
        <div className="mt-3">
          <div className="title-role">
            <h4>Add a new role:</h4>
          </div>
          <div className="role-parent">
            {Object.entries(listChilds).map(([key, child], index) => {
              return (
                <>
                  <div className="row role-child" key={`child-${key}`}>
                    <div className="col-5 form-group">
                      <label>URL:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter URL"
                        value={child.url}
                        onChange={(e) => handleOnChangeInput("url", key, e.target.value)}
                      />
                    </div>
                    <div className="col-5 form-group">
                      <label>Description:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Description"
                        value={child.description}
                        onChange={(e) => handleOnChangeInput("description", key, e.target.value)}
                      />
                    </div>
                    <div className="col-2 mt-4 actions">
                      <i className="fa fa-plus-circle add" onClick={() => handleAddNewInput()}></i>
                      {index >= 1 && (
                        <i className="fa fa-trash-o remove" onClick={() => handleRemoveInput(key)}></i>
                      )}
                    </div>
                  </div>
                </>
              );
            })}
            <div className="mt-3">
              <button className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Role;
