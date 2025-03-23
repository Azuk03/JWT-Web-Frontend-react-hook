import { useState, useEffect } from "react";
import { fetchAllRoles, deleteRole, updateRole } from "../../services/roleService";
import { toast } from "react-toastify";
import { forwardRef, useImperativeHandle } from 'react';

const TableRole = forwardRef(({setAction, setDataUpdateRole}, ref) => {
    const [listRoles, setListRoles] = useState([]);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        const res = await fetchAllRoles();
        if(res && +res.EC === 0) {
            setListRoles(res.DT);
        }
    }

    useImperativeHandle(ref, () => ({
        fetchRoles
      }));

    const handleDeleteRole = async (role) => {
        const res = await deleteRole(role);
        if(res && +res.EC === 0) {
            toast.success(res.EM);
            fetchRoles();
        } else {
            toast.error(res.EM);
        }
    }

    const handleEditRole = (role) => {
        setAction("UPDATE");
        setDataUpdateRole(role);
    }

  return (
    <>
        <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">URL</th>
                  <th scope="col">Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listRoles && listRoles.length > 0 ? (
                  <>
                    {listRoles.map((item, index) => {
                      return (
                        <tr key={`row-${index}`}>
                          <td>{item.id}</td>
                          <td>{item.url}</td>
                          <td>{item.description}</td>
                          <td>
                            <button
                              className="btn btn-warning refresh"
                              onClick={() => handleEditRole(item)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDeleteRole(item)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">Not found Roles</td>
                  </tr>
                )}
              </tbody>
            </table>
    </>
  )
})

export default TableRole;
