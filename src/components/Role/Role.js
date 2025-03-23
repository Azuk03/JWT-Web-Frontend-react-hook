import "./Role.scss";
import { useState, useEffect, useRef } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { createRoles, updateRole } from "../../services/roleService";
import TableRole from "./TableRole";

const Role = (props) => {
  const dataChildDefault = { url: "", description: "", isValidURL: true };
  const [action, setAction] = useState("CREATE");
  const [dataUpdateRole, setDataUpdateRole] = useState({});
  const [listChilds, setListChilds] = useState({
    child1: dataChildDefault,
  });

  const tableRef = useRef(null);

  useEffect(() => {
    if (action === "UPDATE" && dataUpdateRole && dataUpdateRole.id) {
      let _listChilds = {
        [`child-${uuidv4()}`]: {
          url: dataUpdateRole.url,
          description: dataUpdateRole.description,
          isValidURL: true,
          id: dataUpdateRole.id,
        },
      };
      setListChilds(_listChilds);
    }
  }, [dataUpdateRole]);

  const handleOnChangeInput = (name, key, value) => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[key][name] = value;
    if (value && name === "url") {
      _listChilds[key].isValidURL = true;
    }
    setListChilds(_listChilds);
  };

  const handleAddNewInput = () => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[`child-${uuidv4()}`] = dataChildDefault;
    setListChilds(_listChilds);
  };

  const handleRemoveInput = (key) => {
    let _listChilds = _.cloneDeep(listChilds);
    delete _listChilds[key];
    setListChilds(_listChilds);
  };

  const buildDataToPersist = () => {
    let _listChilds = _.cloneDeep(listChilds);
    let dataToPersist = [];
    Object.entries(_listChilds).forEach(([key, child]) => {
      if (child.url) {
        let data = {
          url: child.url,
          description: child.description,
        };
        if (action === "UPDATE" && child.id) {
          data.id = child.id;
        }
        dataToPersist.push(data);
      }
    });
    return dataToPersist;
  };

  const handleSave = async () => {
    if (action === "CREATE") {
      let invalidObj = Object.entries(listChilds).find(([key, child]) => {
        return child && !child.url;
      });
      if (!invalidObj) {
        let dataToPersist = buildDataToPersist();
        if (dataToPersist.length > 0) {
          let res = await createRoles(dataToPersist);
          if (res && res.EC === 0) {
            toast.success(res.EM);
            tableRef.current?.fetchRoles();
          } else {
            toast.error(res.EM);
          }
        }
      } else {
        toast.error("Please fill all url");
        let _listChilds = _.cloneDeep(listChilds);
        const key = invalidObj[0];
        _listChilds[key].isValidURL = false;
        setListChilds(_listChilds);
      }
    } else {
      let _listChilds = _.cloneDeep(listChilds);
      let firstChild = Object.values(_listChilds)[0]; // Lấy child đầu tiên

      if (firstChild && firstChild.url) {
        let dataUpdate = {
          id: dataUpdateRole.id,
          url: firstChild.url,
          description: firstChild.description,
        };

        let res = await updateRole(dataUpdate);
        if (res && res.EC === 0) {
          toast.success(res.EM);
          setAction("CREATE");
          setListChilds({
            child1: dataChildDefault,
          });
          setDataUpdateRole({});
          tableRef.current?.fetchRoles();
        } else {
          toast.error(res.EM);
        }
      } else {
        toast.error("Please fill URL field");
      }
    }
  };

  return (
    <div className="role-container">
      <div className="container">
        <div className="mt-3 adding-roles">
          <div className="title-role">
            <h4>{action === "CREATE" ? "Add a new role:" : "Update role:"}</h4>
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
                        className={
                          child.isValidURL
                            ? "form-control"
                            : "form-control is-invalid"
                        }
                        placeholder="Enter URL"
                        value={child.url}
                        onChange={(e) =>
                          handleOnChangeInput("url", key, e.target.value)
                        }
                      />
                    </div>
                    <div className="col-5 form-group">
                      <label>Description:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Description"
                        value={child.description}
                        onChange={(e) =>
                          handleOnChangeInput(
                            "description",
                            key,
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="col-2 mt-4 actions">
                      <i
                        className="fa fa-plus-circle add"
                        onClick={() => handleAddNewInput()}
                      ></i>
                      {index >= 1 && (
                        <i
                          className="fa fa-trash-o remove"
                          onClick={() => handleRemoveInput(key)}
                        ></i>
                      )}
                    </div>
                  </div>
                </>
              );
            })}
            <div className="mt-3">
              <button
                className={
                  action === "CREATE" ? "btn btn-primary" : "btn btn-warning"
                }
                onClick={() => handleSave()}
              >
                {action === "CREATE" ? "Save" : "Update"}
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="mt-3 table-role">
          <h4>List of roles:</h4>
          <TableRole
            setAction={setAction}
            setDataUpdateRole={setDataUpdateRole}
            ref={tableRef}
          />
        </div>
      </div>
    </div>
  );
};

export default Role;
