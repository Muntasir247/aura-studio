"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { AddressCard } from "@/components/account/AddressCard";
import { SettingsForm } from "@/components/account/SettingsForm";

const MOCK_ADDRESSES = [
  {
    id: "addr-1",
    label: "Home",
    name: "Alexandra Sterling",
    address: "742 Park Avenue, Apt 12A",
    city: "New York",
    state: "NY",
    zip: "10021",
    country: "United States",
    phone: "+1 (555) 012-3456",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Office",
    name: "Alexandra Sterling",
    address: "550 Fifth Avenue, Suite 4200",
    city: "New York",
    state: "NY",
    zip: "10036",
    country: "United States",
    phone: "+1 (555) 987-6543",
    isDefault: false,
  },
];

export default function SettingsPage() {
  const [addresses, setAddresses] = useState(MOCK_ADDRESSES);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="flex flex-col gap-16">
      {/* Profile Settings */}
      <section>
        <h1 className="font-headline-md text-headline-md text-primary mb-8">
          Settings
        </h1>
        <SettingsForm />
      </section>

      {/* Password */}
      <section>
        <h2 className="font-headline-sm text-headline-sm text-primary mb-6">
          Change Password
        </h2>
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6">
          <div className="flex flex-col gap-4 max-w-md">
            <Input
              variant="enclosed"
              label="Current Password"
              type="password"
              placeholder="••••••••"
            />
            <Input
              variant="enclosed"
              label="New Password"
              type="password"
              placeholder="••••••••"
            />
            <Input
              variant="enclosed"
              label="Confirm New Password"
              type="password"
              placeholder="••••••••"
            />
            <div>
              <Button variant="secondary" size="sm">
                Update Password
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Addresses */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline-sm text-headline-sm text-primary">
            Saved Addresses
          </h2>
          <Button
            variant="secondary"
            size="sm"
            icon="add"
            iconPosition="left"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            Add Address
          </Button>
        </div>

        {/* Add form */}
        {showAddForm && (
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 mb-6">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4">
              NEW ADDRESS
            </h3>
            <div className="flex flex-col gap-4 max-w-lg">
              <Input variant="enclosed" label="Label" placeholder="e.g. Home, Office" />
              <div className="grid grid-cols-2 gap-4">
                <Input variant="enclosed" label="First Name" placeholder="Alexandra" />
                <Input variant="enclosed" label="Last Name" placeholder="Sterling" />
              </div>
              <Input variant="enclosed" label="Address" placeholder="123 Fashion Ave" />
              <div className="grid grid-cols-3 gap-4">
                <Input variant="enclosed" label="City" placeholder="New York" />
                <Input variant="enclosed" label="State" placeholder="NY" />
                <Input variant="enclosed" label="ZIP" placeholder="10001" />
              </div>
              <Input variant="enclosed" label="Phone" placeholder="+1 (555) 000-0000" />
              <div className="flex gap-3">
                <Button variant="primary" size="sm" onClick={() => setShowAddForm(false)}>
                  Save Address
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Address cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <AddressCard
              key={addr.id}
              address={addr}
              onSetDefault={() => handleSetDefault(addr.id)}
              onDelete={() => handleDelete(addr.id)}
            />
          ))}
        </div>
      </section>

      {/* Notification preferences */}
      <section>
        <h2 className="font-headline-sm text-headline-sm text-primary mb-6">
          Email Preferences
        </h2>
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 flex flex-col gap-4">
          {[
            { label: "Order updates & shipping notifications", checked: true },
            { label: "New arrivals & product launches", checked: true },
            { label: "Promotional offers & sales", checked: false },
            { label: "Style guides & editorial content", checked: true },
          ].map((pref) => (
            <label
              key={pref.label}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                defaultChecked={pref.checked}
                className="w-4 h-4 accent-primary rounded border-outline-variant"
              />
              <span className="font-body-md text-on-surface-variant">
                {pref.label}
              </span>
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}
