"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const MOCK_PROFILE = {
  firstName: "Alexandra",
  lastName: "Sterling",
  email: "alex@studioclient.com",
  phone: "+880 1878927350",
};

export function SettingsForm() {
  const [profile, setProfile] = useState(MOCK_PROFILE);
  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6">
      <div className="flex flex-col gap-4 max-w-lg">
        <div className="grid grid-cols-2 gap-4">
          <Input
            variant="enclosed"
            label="First Name"
            value={profile.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
          <Input
            variant="enclosed"
            label="Last Name"
            value={profile.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </div>
        <Input
          variant="enclosed"
          label="Email"
          type="email"
          value={profile.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <Input
          variant="enclosed"
          label="Phone"
          type="tel"
          value={profile.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />

        <div className="flex items-center gap-3 mt-2">
          <Button variant="primary" size="sm" onClick={handleSave}>
            {saved ? "Saved!" : "Save Changes"}
          </Button>
          {saved && (
            <span className="text-sm text-on-tertiary-container flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              Profile updated successfully
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
