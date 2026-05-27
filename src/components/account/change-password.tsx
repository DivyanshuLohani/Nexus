"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export function ChangePasswordDialog() {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    console.log({
      currentPassword,
      newPassword,
      confirmPassword,
    });
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Every field is required");
      return;
    }
    if (confirmPassword !== newPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const { data, error } = await authClient.changePassword({
      newPassword,
      currentPassword,
    });
    if (error && error.status != 200) {
      toast.error(error.message ?? "Failed to update password, try again");
    } else if (data) {
      console.log(data);
      toast.success("Password updated successfully");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Change Password</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>

            <DialogDescription>
              Enter your current password and choose a new one.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Current Password</Label>

              <Input
                id="current-password"
                name="currentPassword"
                type="password"
                placeholder="Enter current password"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>

              <Input
                id="new-password"
                name="newPassword"
                type="password"
                placeholder="Enter new password"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>

              <Input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Update Password</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
