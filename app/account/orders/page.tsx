"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

type OrderStatus = "placed" | "processing" | "shipped" | "delivered" | "returned";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

interface TimelineStep {
  status: OrderStatus;
  label: string;
  date: string;
  completed: boolean;
  current: boolean;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  timeline: TimelineStep[];
  trackingNumber?: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: "AST-M1K2-A8B3",
    date: "August 15, 2024",
    items: [
      {
        id: "item-1",
        name: "Structured Oversized Blazer",
        price: 450,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400&auto=format&fit=crop",
        color: "Obsidian",
        size: "M",
        quantity: 1,
      },
      {
        id: "item-2",
        name: "Silk Camisole",
        price: 150,
        image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=400&auto=format&fit=crop",
        color: "Ivory",
        size: "S",
        quantity: 2,
      },
      {
        id: "item-3",
        name: "Minimalist Leather Belt",
        price: 95,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400&auto=format&fit=crop",
        color: "Black",
        size: "M",
        quantity: 1,
      },
    ],
    subtotal: 845,
    shipping: 0,
    tax: 67.6,
    total: 912.6,
    status: "delivered",
    timeline: [
      { status: "placed", label: "Order Placed", date: "Aug 15", completed: true, current: false },
      { status: "processing", label: "Processing", date: "Aug 15", completed: true, current: false },
      { status: "shipped", label: "Shipped", date: "Aug 17", completed: true, current: false },
      { status: "delivered", label: "Delivered", date: "Aug 22", completed: true, current: true },
    ],
    trackingNumber: "1Z999AA10123456784",
  },
  {
    id: "AST-J9L1-C4D7",
    date: "July 28, 2024",
    items: [
      {
        id: "item-4",
        name: "Double-Breasted Wool Blazer",
        price: 520,
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=400&auto=format&fit=crop",
        color: "Navy",
        size: "L",
        quantity: 1,
      },
    ],
    subtotal: 520,
    shipping: 0,
    tax: 41.6,
    total: 561.6,
    status: "delivered",
    timeline: [
      { status: "placed", label: "Order Placed", date: "Jul 28", completed: true, current: false },
      { status: "processing", label: "Processing", date: "Jul 28", completed: true, current: false },
      { status: "shipped", label: "Shipped", date: "Jul 30", completed: true, current: false },
      { status: "delivered", label: "Delivered", date: "Aug 4", completed: true, current: true },
    ],
    trackingNumber: "1Z999AA10987654321",
  },
  {
    id: "AST-H5F3-E2G9",
    date: "June 10, 2024",
    items: [
      {
        id: "item-5",
        name: "Cashmere Crewneck Sweater",
        price: 320,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=400&auto=format&fit=crop",
        color: "Oatmeal",
        size: "M",
        quantity: 1,
      },
      {
        id: "item-6",
        name: "Tailored Chinos",
        price: 185,
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=400&auto=format&fit=crop",
        color: "Khaki",
        size: "M",
        quantity: 1,
      },
    ],
    subtotal: 505,
    shipping: 0,
    tax: 40.4,
    total: 545.4,
    status: "returned",
    timeline: [
      { status: "placed", label: "Order Placed", date: "Jun 10", completed: true, current: false },
      { status: "processing", label: "Processing", date: "Jun 10", completed: true, current: false },
      { status: "shipped", label: "Shipped", date: "Jun 12", completed: true, current: false },
      { status: "delivered", label: "Delivered", date: "Jun 17", completed: true, current: false },
      { status: "returned", label: "Returned", date: "Jun 24", completed: true, current: true },
    ],
  },
];

const STATUS_STYLES: Record<OrderStatus, { bg: string; text: string; dot: string }> = {
  placed: { bg: "bg-surface-container-low", text: "text-on-surface-variant", dot: "bg-on-surface-variant" },
  processing: { bg: "bg-surface-container-low", text: "text-primary", dot: "bg-primary" },
  shipped: { bg: "bg-surface-container-low", text: "text-primary", dot: "bg-primary" },
  delivered: { bg: "bg-surface-container-low", text: "text-on-tertiary-container", dot: "bg-on-tertiary-container" },
  returned: { bg: "bg-error-container/20", text: "text-error", dot: "bg-error" },
};

export function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const styles = STATUS_STYLES[order.status];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="font-body-md text-primary font-medium">Order {order.id}</p>
          <p className="text-sm text-on-surface-variant">{order.date}</p>
        </div>
        <div className="flex items-center gap-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-label-caps ${styles.bg} ${styles.text} border border-outline-variant/30`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
          <span className="font-label-caps text-label-caps text-primary">
            {formatPrice(order.total)}
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-6 pb-4">
        <div className="flex items-center gap-0">
          {order.timeline.map((step, i) => (
            <div key={step.status} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-colors ${
                    step.completed
                      ? "bg-primary border-primary"
                      : step.current
                        ? "bg-primary border-primary"
                        : "bg-surface border-outline-variant"
                  }`}
                />
                <span
                  className={`text-[10px] font-label-caps text-center leading-tight ${
                    step.current ? "text-primary font-medium" : "text-on-surface-variant"
                  }`}
                >
                  {step.label}
                </span>
                <span className="text-[9px] text-on-surface-variant/60">
                  {step.date}
                </span>
              </div>
              {i < order.timeline.length - 1 && (
                <div
                  className={`flex-1 h-[2px] mx-1 mt-[-20px] ${
                    step.completed ? "bg-primary" : "bg-outline-variant/30"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-3 border-t border-outline-variant/30 flex items-center justify-center gap-2 text-on-surface-variant hover:text-primary transition-colors"
      >
        <span className="font-label-caps text-label-caps">
          {expanded ? "Hide Details" : "View Details"}
        </span>
        <span
          className={`material-symbols-outlined text-[18px] transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-outline-variant/30 p-6 flex flex-col gap-6">
          {/* Items */}
          <div className="flex flex-col gap-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative w-16 h-20 rounded bg-surface-container-high overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <p className="font-body-md text-primary text-sm">{item.name}</p>
                  <p className="text-xs text-on-surface-variant">
                    {item.color} / {item.size} &times; {item.quantity}
                  </p>
                </div>
                <span className="font-label-caps text-label-caps text-primary">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="flex flex-col gap-2 text-sm border-t border-outline-variant/30 pt-4">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Subtotal</span>
              <span className="text-primary">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Shipping</span>
              <span className="text-primary">
                {order.shipping === 0 ? "Complimentary" : formatPrice(order.shipping)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Tax</span>
              <span className="text-primary">{formatPrice(order.tax)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span className="text-primary">Total</span>
              <span className="text-primary">{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Tracking */}
          {order.trackingNumber && (
            <div className="bg-surface-container-low rounded-lg p-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px] text-primary">
                local_shipping
              </span>
              <div>
                <p className="text-xs text-on-surface-variant">Tracking Number</p>
                <p className="font-body-md text-primary text-sm font-medium">
                  {order.trackingNumber}
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="secondary" size="sm" icon="receipt_long" iconPosition="left">
              Download Invoice
            </Button>
            {order.status === "delivered" && (
              <Button variant="secondary" size="sm" icon="replay" iconPosition="left">
                Buy Again
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrdersPage() {
  const [filter, setFilter] = useState<string>("all");

  const statuses = ["all", "placed", "processing", "shipped", "delivered", "returned"];
  const filtered =
    filter === "all"
      ? MOCK_ORDERS
      : MOCK_ORDERS.filter((o) => o.status === filter);

  return (
    <div>
      <h1 className="font-headline-md text-headline-md text-primary mb-8">
        Order History
      </h1>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto hide-scrollbar">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full font-label-caps text-label-caps border transition-colors whitespace-nowrap ${
              filter === s
                ? "bg-primary text-on-primary border-primary"
                : "border-outline-variant/50 text-on-surface-variant hover:border-primary hover:text-primary"
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="flex flex-col gap-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
            <span className="material-symbols-outlined text-[48px] text-outline-variant">
              receipt_long
            </span>
            <p className="font-body-lg text-on-surface-variant">
              No orders found for this status.
            </p>
          </div>
        ) : (
          filtered.map((order) => <OrderCard key={order.id} order={order} />)
        )}
      </div>
    </div>
  );
}
