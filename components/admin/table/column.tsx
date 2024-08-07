"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react"; // Import icons

const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

export const columns: ColumnDef<User>[] = [
  {
    header: "#",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <p className="text-14-medium">{row.getValue("name") || "N/A"}</p>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <p className="text-14-medium">{row.getValue("email")}</p>
    ),
  },
  {
    accessorKey: "isAdmin",
    header: "Admin Status",
    cell: ({ row }) => {
      const [isAdminState, setIsAdminState] = useState(row.original.isAdmin);
      const [isLoading, setIsLoading] = useState(false);
      // const updateAdmin = useMutation(api.users.updateAdminStatus);

      // const handleSubmit = async () => {
      //   if (row.original._id) {
      //     setIsLoading(true);
      //     try {
      //       await updateAdmin({
      //         userId: row.original._id,
      //         isAdmin: !isAdminState,
      //       });
      //       setIsAdminState(!isAdminState);
      //     } catch (error) {
      //       console.error("Failed to update admin status:", error);
      //     } finally {
      //       setIsLoading(false);
      //     }
      //   } else {
      //     console.error("User ID is undefined");
      //   }
      // };

      return (
        <div className="flex items-center gap-2">
          {isAdminState ? (
            <CheckCircle className="text-green-500" size={20} />
          ) : (
            <XCircle className="text-red-500" size={20} />
          )}
          <span className="mr-2">
            {isAdminState ? "Admin" : "Not Admin"}
          </span>
          <Button 
          
            disabled={isLoading}
            className={isLoading ? "opacity-50 cursor-not-allowed" : ""}
          >
            {isLoading ? "Updating..." : (isAdminState ? "Remove Admin" : "Make Admin")}
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Image
          src={row.getValue("image")}
          alt="User"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
    ),
  },
  {
    accessorKey: "_creationTime",
    header: "Creation Time",
    cell: ({ row }) => {
      const date = row.original._creationTime;
      const formattedDate = formatDateTime(date);
      return <p className="text-14-medium">{formattedDate}</p>;
    },
  },
];