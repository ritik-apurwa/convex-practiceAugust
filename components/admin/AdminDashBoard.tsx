"use client";

import React from "react";
import { DataTable } from "./table/DataTable";
import { columns } from "./table/column";
import { mockUsers } from "./table/mockData"; // Importing mock data for testing
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { User } from "@/types"; // Adjust import according to your project structure

const AdminDashBoard = () => {
  // Fetch users using Convex query
  const users = useQuery(api.users.getUsers) || [];

  // Optionally, map data to ensure all fields are correctly formatted
  const formattedUsers: User[] = users.map((user) => ({
    ...user,
    _creationTime: new Date(user._creationTime), // Convert timestamp to Date
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {/* Pass formatted users to DataTable */}
      <DataTable columns={columns} data={formattedUsers} />
    </div>
  );
};

export default AdminDashBoard;
