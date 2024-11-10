"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Mail,
  User,
  Phone,
  UserCircle,
  MessageCircle,
  PenSquare,
  X,
  Check,
  Loader2,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { data: session, update: updateSession } = useSession();
  const user = session?.user;
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    displayName: "",
    telephoneNumber: "",
    lineId: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        surname: user.surname || "",
        displayName: user.displayName || "",
        telephoneNumber: user.telephoneNumber || "",
        lineId: user.lineId || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.name || !formData.surname || !formData.displayName) {
        toast.error("Name, Surname and Display Name are required");
        return;
      }

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          formDataToSend.append(key, value);
        }
      });

      const response = await fetch("/api/user/profile/update", {
        method: "PUT",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update profile");
      }

      const updatedProfile = await response.json();

      await updateSession({
        user: {
          ...session?.user,
          email: session?.user?.email,
          userId: session?.user?.userId,
          name: updatedProfile.name,
          surname: updatedProfile.surname,
          displayName: updatedProfile.displayName,
          telephoneNumber: updatedProfile.telephoneNumber,
          lineId: updatedProfile.lineId,
        },
        expires: session?.expires,
      });

      const profileResponse = await fetch("/api/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (profileResponse.ok) {
        const latestProfile = await profileResponse.json();
        setFormData({
          name: latestProfile.name,
          surname: latestProfile.surname,
          displayName: latestProfile.displayName,
          telephoneNumber: latestProfile.telephoneNumber,
          lineId: latestProfile.lineId,
        });
      }

      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const renderField = (
    label: string,
    icon: React.ReactNode,
    fieldName: keyof typeof formData
  ) => {
    return (
      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg shadow-xl">
        <div className="text-rose-500 mt-1">{icon}</div>
        <div className="flex-grow">
          <div className="text-gray-500 mb-1">{label}</div>
          {isEditing ? (
            <Input
              name={fieldName}
              value={formData[fieldName]}
              onChange={handleInputChange}
              className="max-w-sm"
            />
          ) : (
            <div className="text-gray-900">{formData[fieldName] || "-"}</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4 text-rose-950">
      <div className="bg-white rounded-lg shadow-xl ">
        <div className="bg-rose-500 text-white p-4 rounded-t-lg flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Profile Information</h1>
          <div className="flex items-center gap-2">
            {!isEditing && (
              <Button
                variant="ghost"
                className=" text-rose-950 bg-white hover:bg-rose-200 rounded-[8px] border-[2.5px] border-rose-600"
                onClick={() => setIsEditing(true)}
              >
                <div className="flex flex-row items-center space-x-[16px]">
                  <PenSquare className="w-5 h-5" />
                  <h1 className="text-[20px]"> Edit Profile</h1>
                </div>
              </Button>
            )}
            <Button
              variant="ghost"
              className=" text-rose-950 bg-white hover:bg-rose-200 rounded-[8px] border-[2.5px] border-rose-600"
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
            >
              <div className="flex flex-row items-center space-x-[16px]">
                <LogOut className="w-5 h-5" />
                <h1 className="text-[20px]"> Log Out</h1>
              </div>
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6">
            {/* Profile Display Name Header */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-32 h-32 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 text-4xl">
                {formData.displayName?.[0]?.toUpperCase() || "U"}
              </div>
              <h2 className="mt-4 text-xl font-semibold">
                {formData.displayName || "User"}
              </h2>
            </div>

            <div className="space-y-6">
              {/* Read-only fields */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <User className="w-6 h-6 text-rose-500 mt-1" />
                <div>
                  <div className="text-gray-500">User ID</div>
                  <div className="text-gray-900 break-all">{user?.userId}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Mail className="w-6 h-6 text-rose-500 mt-1" />
                <div>
                  <div className="text-gray-500">Email Address</div>
                  <div className="text-gray-900">{user?.email}</div>
                </div>
              </div>

              {/* Editable Fields */}
              {renderField("Name", <User className="w-6 h-6" />, "name")}
              {renderField("Surname", <User className="w-6 h-6" />, "surname")}
              {renderField(
                "Display Name",
                <UserCircle className="w-6 h-6" />,
                "displayName"
              )}
              {renderField(
                "Telephone Number",
                <Phone className="w-6 h-6" />,
                "telephoneNumber"
              )}
              {renderField(
                "Line ID",
                <MessageCircle className="w-6 h-6" />,
                "lineId"
              )}
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="mt-6 flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className=" bg-white text-rose-950 border-[2.5px] border-rose-600 hover:bg-rose-200 hover:text-rose-950"
                  onClick={() => {
                    setIsEditing(false);
                    if (user) {
                      setFormData({
                        name: user.name || "",
                        surname: user.surname || "",
                        displayName: user.displayName || "",
                        telephoneNumber: user.telephoneNumber || "",
                        lineId: user.lineId || "",
                      });
                    }
                  }}
                  disabled={isLoading}
                >
                  <div className="flex flex-row items-center space-x-[16px]">
                    <X className="w-4 h-4 mr-2" />
                    <h1 className="text-[20px]"> Cancel</h1>
                  </div>
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className=" bg-red-600 hover:bg-red-700 text-rose-50"
                >
                  <div className="flex flex-row items-center space-x-[16px]">
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4 mr-2" />
                    )}
                    <h1 className="text-[20px]"> Save Changes</h1>
                  </div>
                </Button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
