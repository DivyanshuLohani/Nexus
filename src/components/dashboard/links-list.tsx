"use client";

import { useState, useEffect } from "react";
import ListLinkItem from "./list-link-item";
import { createLinkAction } from "@/lib/actions/createLink";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";

import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

interface LinksListProps {
  initialLinks: DbLink[];
  pageId: string;
  onUpdate: () => void;
}

export default function LinksList({
  initialLinks,
  pageId,
  onUpdate,
}: LinksListProps) {
  const [links, setLinks] = useState<DbLink[]>(
    initialLinks.sort((a, b) => a.order - b.order),
  );
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLinks(initialLinks);
  }, [initialLinks]);

  // ✅ create new link inline
  const handleAdd = async () => {
    const tempId = nanoid();

    const newLink = {
      id: tempId,
      label: "",
      url: "",
      order: links.length + 1,
    } as DbLink;

    // optimistic add
    setLinks((prev) => [...prev, newLink]);

    try {
      setCreating(true);

      const created = await createLinkAction(
        pageId,
        "New Link",
        "https://example.com",
        links.length + 1,
      );

      // replace temp with real
      setLinks((prev) => prev.map((l) => (l.id === tempId ? created : l)));
      onUpdate();
    } catch {
      toast.error("Failed to create link");
      setLinks((prev) => prev.filter((l) => l.id !== tempId));
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = (id: string) => {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  };

  const handleUpdate = (updated: DbLink) => {
    setLinks((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    onUpdate();
  };

  return (
    <div className="container p-2">
      <div className="space-y-3">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={async (event) => {
            const { active, over } = event;

            if (!over || active.id === over.id) return;

            const oldIndex = links.findIndex((i) => i.id === active.id);
            const newIndex = links.findIndex((i) => i.id === over.id);

            const newItems = arrayMove(links, oldIndex, newIndex).map(
              (item, index) => ({
                ...item,
                order: index + 1,
              }),
            );

            // update UI
            setLinks(newItems);

            await updateLinksOrderAction(
              newItems.map((i) => ({
                id: i.id,
                order: i.order,
              })),
            );
            onUpdate();
          }}
        >
          <SortableContext
            items={links.map((l) => l.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {links.map((link) => (
                <SortableItem
                  key={link.id}
                  link={link}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <Button
          onClick={handleAdd}
          disabled={creating}
          className="w-full mt-4 flex justify-center"
          variant="secondary"
        >
          <Plus size={16} className="mr-2" />
          {creating ? "Adding..." : "Add New Link"}
        </Button>
      </div>
    </div>
  );
}

import { useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { updateLinksOrderAction } from "@/lib/actions/updateLink";
import { DbLink } from "@/lib/db/schema";
import Button from "../ui/button";
import { Plus } from "lucide-react";

function SortableItem(props: {
  link: DbLink;
  onDelete: (id: string) => void;
  onUpdate: (link: DbLink) => void;
}) {
  const { link } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <ListLinkItem
        {...props}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}
