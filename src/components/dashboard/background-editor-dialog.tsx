"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Plus, Trash2, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColorStop {
  id: string;
  color: string;
  position: number;
}

interface BackgroundEditorDialogProps {
  initialValue: string;
  onApply: (value: string) => void;
  trigger?: React.ReactNode;
}

export function BackgroundEditorDialog({
  initialValue,
  onApply,
  trigger,
}: BackgroundEditorDialogProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(
    initialValue.includes("gradient") ? "gradient" : "solid"
  );

  // Solid state
  const [solidColor, setSolidColor] = useState(
    initialValue.includes("gradient") ? "#0a0a0a" : initialValue
  );

  // Gradient state
  const [gradientAngle, setGradientAngle] = useState(135);
  const [stops, setStops] = useState<ColorStop[]>(() => {
    if (initialValue.includes("gradient")) {
      // Very basic parser for initial value
      // This is a bit complex to do perfectly, so we'll just use defaults if it's too hard
      // For now, let's just use defaults or try to extract colors if possible
      return [
        { id: "1", color: "#667eea", position: 0 },
        { id: "2", color: "#764ba2", position: 100 },
      ];
    }
    return [
      { id: "1", color: "#667eea", position: 0 },
      { id: "2", color: "#764ba2", position: 100 },
    ];
  });

  const generateGradientString = () => {
    const sortedStops = [...stops].sort((a, b) => a.position - b.position);
    const stopsString = sortedStops
      .map((s) => `${s.color} ${s.position}%`)
      .join(", ");
    return `linear-gradient(${gradientAngle}deg, ${stopsString})`;
  };

  const currentPreview = activeTab === "solid" ? solidColor : generateGradientString();

  const handleApply = () => {
    onApply(currentPreview);
    setOpen(false);
  };

  const addStop = () => {
    if (stops.length >= 5) return;
    const newId = Math.random().toString(36).substr(2, 9);
    setStops([...stops, { id: newId, color: "#ffffff", position: 50 }]);
  };

  const removeStop = (id: string) => {
    if (stops.length <= 2) return;
    setStops(stops.filter((s) => s.id !== id));
  };

  const updateStop = (id: string, updates: Partial<ColorStop>) => {
    setStops(stops.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <Wand2 className="h-4 w-4" />
            Generate
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Background Editor</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          {/* Preview Area */}
          <div
            className="h-32 w-full rounded-lg border shadow-inner transition-all duration-300"
            style={{ background: currentPreview }}
          />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="solid">Solid</TabsTrigger>
              <TabsTrigger value="gradient">Gradient</TabsTrigger>
            </TabsList>

            <TabsContent value="solid" className="pt-4 space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="solid-color">Color</Label>
                <div className="flex gap-2">
                  <input
                    id="solid-color"
                    type="color"
                    value={solidColor}
                    onChange={(e) => setSolidColor(e.target.value)}
                    className="h-10 w-20 p-1 cursor-pointer bg-surface-high rounded-md border-none outline-none"
                  />
                  <input
                    type="text"
                    value={solidColor}
                    onChange={(e) => setSolidColor(e.target.value)}
                    className="flex-1 font-mono uppercase bg-surface-high rounded-md px-3 py-2 text-sm outline-none border border-outline-variant"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="gradient" className="pt-4 space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Angle ({gradientAngle}°)</Label>
                </div>
                <Slider
                  value={[gradientAngle]}
                  onValueChange={(vals) => setGradientAngle(vals[0])}
                  max={360}
                  step={1}
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Color Stops</Label>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={addStop}
                    disabled={stops.length >= 5}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3 max-h-[180px] overflow-y-auto pr-2">
                  {stops.map((stop) => (
                    <div key={stop.id} className="flex items-center gap-3">
                      <input
                        type="color"
                        value={stop.color}
                        onChange={(e) =>
                          updateStop(stop.id, { color: e.target.value })
                        }
                        className="h-8 w-12 p-1 cursor-pointer shrink-0 bg-surface-high rounded-md border-none outline-none"
                      />
                      <Slider
                        value={[stop.position]}
                        onValueChange={(vals) =>
                          updateStop(stop.id, { position: vals[0] })
                        }
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-xs font-mono w-8 text-right">
                        {stop.position}%
                      </span>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeStop(stop.id)}
                        disabled={stops.length <= 2}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleApply}>Apply Background</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
