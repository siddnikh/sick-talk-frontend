import { useState, useEffect } from "react";
import api from "../../services/api";
import AdminTasks from "./AdminTasks";
import UserTasks from "./UserTasks";

const Tasks = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchUserRole = async () => {
      const response = await api.get("/auth/me");
      setUserRole(response.data.role);
    };
    fetchUserRole();
  }, []);

  if (userRole === "admin") {
    return <AdminTasks />;
  } else {
    return <UserTasks />;
  }
};

export default Tasks;
