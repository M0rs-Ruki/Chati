"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Save, Menu, Check, GripVertical } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface NavigationItem {
  id: string; // ✅ Added ID for drag-drop
  title: string;
  href: string;
}

interface Navigation {
  key: "header" | "footer";
  items: NavigationItem[];
}

// ✅ Sortable Item Component
const SortableMenuItem = ({
  item,
  index,
  updateMenuItem,
  removeMenuItem,
}: {
  item: NavigationItem;
  index: number;
  updateMenuItem: (
    index: number,
    field: keyof NavigationItem,
    value: string
  ) => void;
  removeMenuItem: (index: number) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-lg shadow p-6 border-2 hover:border-emerald-300 transition"
    >
      <div className="flex items-center gap-4 mb-4">
        {/* ✅ Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-2 hover:bg-gray-100 rounded"
        >
          <GripVertical size={20} className="text-gray-400" />
        </button>

        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
          <Menu size={20} className="text-white" />
        </div>
        <input
          type="text"
          placeholder="Menu Item Title"
          value={item.title}
          onChange={(e) => updateMenuItem(index, "title", e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-semibold"
        />
        <button
          onClick={() => removeMenuItem(index)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Link URL
        </label>
        <input
          type="text"
          placeholder="/page-url"
          value={item.href}
          onChange={(e) => updateMenuItem(index, "href", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

// ✅ Nav Editor with Drag-Drop
const NavEditor = ({
  nav,
  setNav,
  title,
}: {
  nav: NavigationItem[];
  setNav: (items: NavigationItem[]) => void;
  title: string;
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = nav.findIndex((item) => item.id === active.id);
      const newIndex = nav.findIndex((item) => item.id === over.id);
      setNav(arrayMove(nav, oldIndex, newIndex));
    }
  };

  const addMenuItem = () => {
    setNav([
      ...nav,
      {
        id: `item-${Date.now()}`, // ✅ Generate unique ID
        title: "New Menu Item",
        href: "#",
      },
    ]);
  };

  const updateMenuItem = (
    index: number,
    field: keyof NavigationItem,
    value: string
  ) => {
    const newItems = [...nav];
    newItems[index] = { ...newItems[index], [field]: value };
    setNav(newItems);
  };

  const removeMenuItem = (index: number) => {
    if (confirm("Delete this menu item?")) {
      setNav(nav.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-lg shadow-lg text-white">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-emerald-100 mt-1">
            Drag to reorder • Click to edit
          </p>
        </div>
        <button
          onClick={addMenuItem}
          className="px-4 py-2 bg-white text-emerald-600 rounded-lg hover:bg-emerald-50 flex items-center gap-2 font-semibold"
        >
          <Plus size={20} />
          Add Menu Item
        </button>
      </div>

      {nav.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={nav.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {nav.map((item, index) => (
                <SortableMenuItem
                  key={item.id}
                  item={item}
                  index={index}
                  updateMenuItem={updateMenuItem}
                  removeMenuItem={removeMenuItem}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Menu size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No Menu Items Yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start building your navigation by adding menu items.
          </p>
          <button
            onClick={addMenuItem}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 inline-flex items-center gap-2"
          >
            <Plus size={20} />
            Create First Menu Item
          </button>
        </div>
      )}
    </div>
  );
};

// ✅ Main Component - Add ID generation
export default function NavigationPage() {
  const [headerNav, setHeaderNav] = useState<NavigationItem[]>([]);
  const [footerNav, setFooterNav] = useState<NavigationItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"header" | "footer">("header");

  useEffect(() => {
    fetchNavigation();
  }, []);

  const fetchNavigation = async () => {
    try {
      const [headerRes, footerRes] = await Promise.all([
        fetch(`/api/navigation?key=header`, { credentials: "include" }),
        fetch(`/api/navigation?key=footer`, { credentials: "include" }),
      ]);

      if (headerRes.ok) {
        const data = await headerRes.json();
        // ✅ Add IDs to existing items
        const items = (data.navigation?.items || []).map(
          (item: Omit<NavigationItem, "id"> & { id?: string }, i: number) => ({
            ...item,
            id: item.id || `item-${Date.now()}-${i}`,
          })
        );
        setHeaderNav(items);
      }

      if (footerRes.ok) {
        const data = await footerRes.json();
        // ✅ Add IDs to existing items
        const items = (data.navigation?.items || []).map(
          (item: Omit<NavigationItem, "id"> & { id?: string }, i: number) => ({
            ...item,
            id: item.id || `item-${Date.now()}-${i}`,
          })
        );
        setFooterNav(items);
      }
    } catch (error) {
      console.error("Failed to fetch navigation:", error);
    }
  };

  const saveNavigation = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      // ✅ Remove IDs before saving (backend doesn't need them)
      const cleanHeader = headerNav.map(({ id, ...item }) => item);
      const cleanFooter = footerNav.map(({ id, ...item }) => item);

      await Promise.all([
        fetch("/api/navigation", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ key: "header", items: cleanHeader }),
        }),
        fetch("/api/navigation", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ key: "footer", items: cleanFooter }),
        }),
      ]);

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save navigation:", error);
      alert("Error saving navigation. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Navigation Builder
          </h1>
          <p className="text-gray-600 mt-1">
            Drag items to reorder • Create professional menus
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saveSuccess && (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200">
              <Check size={20} />
              <span className="font-semibold">Saved!</span>
            </div>
          )}
          <button
            onClick={saveNavigation}
            disabled={isSaving}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-2 font-semibold"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <Save size={20} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow p-2 inline-flex gap-2">
        <button
          onClick={() => setActiveTab("header")}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            activeTab === "header"
              ? "bg-emerald-100 text-emerald-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Header Menu
        </button>
        <button
          onClick={() => setActiveTab("footer")}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            activeTab === "footer"
              ? "bg-emerald-100 text-emerald-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Footer Menu
        </button>
      </div>

      {/* Content */}
      {activeTab === "header" && (
        <NavEditor
          nav={headerNav}
          setNav={setHeaderNav}
          title="Header Navigation"
        />
      )}
      {activeTab === "footer" && (
        <NavEditor
          nav={footerNav}
          setNav={setFooterNav}
          title="Footer Navigation"
        />
      )}
    </div>
  );
}
