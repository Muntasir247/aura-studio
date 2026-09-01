"use client";

import { Button } from "@/components/ui/Button";

interface Address {
  id: string;
  label: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

interface AddressCardProps {
  address: Address;
  onSetDefault: () => void;
  onDelete: () => void;
}

export function AddressCard({ address, onSetDefault, onDelete }: AddressCardProps) {
  return (
    <div
      className={`bg-surface-container-lowest border rounded-lg p-6 flex flex-col gap-4 ${
        address.isDefault
          ? "border-primary"
          : "border-outline-variant/30"
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <span className="font-label-caps text-label-caps text-primary">
            {address.label}
          </span>
          {address.isDefault && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-label-caps bg-primary text-on-primary">
              Default
            </span>
          )}
        </div>
        <button
          className="text-on-surface-variant hover:text-error transition-colors"
          aria-label="Delete address"
        >
          <span className="material-symbols-outlined text-[18px]">delete</span>
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-body-md text-primary text-sm">{address.name}</p>
        <p className="font-body-md text-on-surface-variant text-sm">
          {address.address}
        </p>
        <p className="font-body-md text-on-surface-variant text-sm">
          {address.city}, {address.state} {address.zip}
        </p>
        <p className="font-body-md text-on-surface-variant text-sm">
          {address.country}
        </p>
        <p className="font-body-md text-on-surface-variant text-sm mt-1">
          {address.phone}
        </p>
      </div>

      <div className="flex gap-3 mt-auto">
        {!address.isDefault && (
          <Button variant="text" size="sm" onClick={onSetDefault}>
            Set as Default
          </Button>
        )}
        <Button variant="text" size="sm">
          Edit
        </Button>
      </div>
    </div>
  );
}
