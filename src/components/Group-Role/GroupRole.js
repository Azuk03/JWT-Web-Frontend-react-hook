import "./GroupRole.scss";
import { useState, useEffect } from "react";
import { fetchGroup } from "../../services/userService";
import { assignRoleToGroup } from "../../services/roleService";
import { toast } from "react-toastify";
import {
  fetchAllRoles,
  deleteRole,
  updateRole,
  fetchRolesByGroup,
} from "../../services/roleService";
import _ from "lodash";

const GroupRole = (props) => {
  const [userGroups, setUserGroups] = useState([]);
  const [selectGroup, setSelectGroup] = useState("");
  const [listRoles, setListRoles] = useState([]);

  const [assignRolesByGroup, setAssignRolesByGroup] = useState([]);

  useEffect(() => {
    getGroups();
    fetchRoles();
  }, []);

  const getGroups = async () => {
    let res = await fetchGroup();
    if (res && res.EC === 0) {
      setUserGroups(res.DT);
    } else {
      toast.error(res.EM);
    }
  };

  const fetchRoles = async () => {
    const res = await fetchAllRoles();
    if (res && +res.EC === 0) {
      setListRoles(res.DT);
    }
  };

  const handleOnChangeGroup = async (value) => {
    setSelectGroup(value);
    if (value) {
      let data = await fetchRolesByGroup(value);
      if (data && data.EC === 0) {
        let result = buildDataRolesByGroup(data.DT.Roles, listRoles);
        setAssignRolesByGroup(result);
      }
    }
  }; 

  const buildDataRolesByGroup = (groupRoles, allRoles) => {
    let result = [];
    if (allRoles && allRoles.length > 0) {
      allRoles.map((role) => {
        let object = {};
        object.url = role.url;
        object.id = role.id;
        object.description = role.description;
        object.isAssigned = false;
        if (groupRoles && groupRoles.length > 0) {
          object.isAssigned = groupRoles.some(
            (item) => item.url === object.url
          );
        }

        result.push(object);
      });
    }
    return result;
  };

  const handleSelectRole = (value) => {
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
        let foundIndex = _assignRolesByGroup.findIndex(item => +item.id === +value);
        if(foundIndex > -1) {
            _assignRolesByGroup[foundIndex].isAssigned = !_assignRolesByGroup[foundIndex].isAssigned;
        }
        setAssignRolesByGroup(_assignRolesByGroup);
  }

  const buildDataToAssign = () => {
    let result = {};
    const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
    result.groupId = selectGroup;
    let groupRolesFilter = _assignRolesByGroup.filter(item => item.isAssigned === true);
    result.groupRoles = groupRolesFilter;
    let finalGroupRoles = groupRolesFilter.map(item => {
      let data = { groupId: +selectGroup, roleId: item.id};
      return data;
    })
    result.groupRoles = finalGroupRoles;
    return result;
  }
  

  const handleSaveAssign = async () => {
      let data = buildDataToAssign();
      let res = await assignRoleToGroup(data);
      if(res && res.EC === 0) {
        toast.success(res.EM);
      }
  }

  return (
    <div className="group-role-container">
      <div className="container">
        <div className="container mt-3">
          <h4>Group Role:</h4>
          <div className="col-12 col-sm-6 form-group">
            <label>
              Select Group: (<span className="red">*</span>):
            </label>
            <select
              className={"form-select"}
              onChange={(e) => handleOnChangeGroup(e.target.value)}
            >
              <option value="">Select your Group</option>
              {userGroups &&
                userGroups.length > 0 &&
                userGroups.map((item, index) => {
                  return (
                    <option key={`group-${index}`} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <hr />
          {selectGroup && (
            <div className="roles">
              <h5>Assign Roles:</h5>
              {assignRolesByGroup &&
                assignRolesByGroup.length > 0 &&
                assignRolesByGroup.map((item, index) => {
                  return (
                    <div class="form-check" key={`list-role-${index}`}>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value={item.id}
                        id={`list-role-${index}`}
                        checked={item.isAssigned}
                        onChange={(e) => handleSelectRole(e.target.value)}
                      />
                      <label
                        class="form-check-label"
                        for={`list-role-${index}`}
                      >
                        {item.url}
                      </label>
                    </div>
                  );
                })}
                <div className="mt-3">
                    <button className="btn btn-warning" onClick={() => handleSaveAssign()}>Save</button>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupRole;
