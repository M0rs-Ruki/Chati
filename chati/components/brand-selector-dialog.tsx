"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Search, Check, Loader2 } from "lucide-react";
import Image from "next/image";

interface BrandLogo {
  name: string;
  url: string;
}

interface Brand {
  id: string;
  name: string;
  logoUrl: BrandLogo[];
  status: "ACTIVE" | "INACTIVE";
  theme: "DARK" | "COLOR";
}

interface SelectedBrand {
  brandId: string;
  brandName: string;
  logoUrl: BrandLogo[];
  theme: "DARK" | "COLOR";
  isFullBrand: boolean; // true if entire brand selected, false if individual logos
}

interface BrandSelectorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (selectedBrands: SelectedBrand[]) => void;
  existingBrands?: Brand[];
}

export function BrandSelectorDialog({
  open,
  onOpenChange,
  onSelect,
  existingBrands = [],
}: BrandSelectorDialogProps) {
  const { toast } = useToast();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<
    Map<string, SelectedBrand>
  >(new Map());
  const [selectedLogos, setSelectedLogos] = useState<Map<string, Set<string>>>(
    new Map()
  ); // brandId -> Set of logo URLs

  useEffect(() => {
    if (open) {
      fetchBrands();
      setSelectedBrands(new Map());
      setSelectedLogos(new Map());
      setSearchQuery("");
    }
  }, [open]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredBrands(brands);
    } else {
      const filtered = brands.filter((brand) =>
        brand.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBrands(filtered);
    }
  }, [searchQuery, brands]);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/brands", {
        headers: { Authorization: `Bearer ${token ?? ""}` },
      });

      if (!res.ok) throw new Error("Failed to fetch brands");

      const result = await res.json();
      const fetchedBrands = result.data || [];
      setBrands(fetchedBrands);
      setFilteredBrands(fetchedBrands);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load brands",
        variant: "destructive",
      });
      setBrands([]);
      setFilteredBrands([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleBrandSelection = (brand: Brand) => {
    const brandKey = brand.id;
    const isCurrentlySelected = selectedBrands.has(brandKey);

    if (isCurrentlySelected) {
      // Remove entire brand
      const newSelectedBrands = new Map(selectedBrands);
      newSelectedBrands.delete(brandKey);
      setSelectedBrands(newSelectedBrands);

      // Also remove individual logo selections for this brand
      const newSelectedLogos = new Map(selectedLogos);
      newSelectedLogos.delete(brandKey);
      setSelectedLogos(newSelectedLogos);
    } else {
      // Add entire brand
      const newSelectedBrands = new Map(selectedBrands);
      newSelectedBrands.set(brandKey, {
        brandId: brand.id,
        brandName: brand.name,
        logoUrl: brand.logoUrl,
        theme: brand.theme,
        isFullBrand: true,
      });
      setSelectedBrands(newSelectedBrands);

      // Clear individual logo selections for this brand
      const newSelectedLogos = new Map(selectedLogos);
      newSelectedLogos.delete(brandKey);
      setSelectedLogos(newSelectedLogos);
    }
  };

  const toggleLogoSelection = (brand: Brand, logo: BrandLogo) => {
    const brandKey = brand.id;
    const isBrandFullySelected = selectedBrands.has(brandKey);

    // If brand is fully selected, deselect it first
    if (isBrandFullySelected) {
      const newSelectedBrands = new Map(selectedBrands);
      newSelectedBrands.delete(brandKey);
      setSelectedBrands(newSelectedBrands);
    }

    // Toggle individual logo
    const newSelectedLogos = new Map(selectedLogos);
    const logoSet = newSelectedLogos.get(brandKey) || new Set<string>();

    if (logoSet.has(logo.url)) {
      logoSet.delete(logo.url);
      if (logoSet.size === 0) {
        newSelectedLogos.delete(brandKey);
      } else {
        newSelectedLogos.set(brandKey, logoSet);
      }
    } else {
      logoSet.add(logo.url);
      newSelectedLogos.set(brandKey, logoSet);
    }

    setSelectedLogos(newSelectedLogos);
  };

  const isBrandSelected = (brandId: string) => {
    return selectedBrands.has(brandId);
  };

  const isLogoSelected = (brandId: string, logoUrl: string) => {
    const logoSet = selectedLogos.get(brandId);
    return logoSet?.has(logoUrl) || false;
  };

  const getSelectedCount = () => {
    let count = 0;
    // Count full brands
    count += selectedBrands.size;
    // Count individual logos (excluding those from fully selected brands)
    selectedLogos.forEach((logoSet, brandId) => {
      if (!selectedBrands.has(brandId)) {
        count += logoSet.size;
      }
    });
    return count;
  };

  const handleConfirmSelection = () => {
    const result: SelectedBrand[] = [];

    // Add fully selected brands
    selectedBrands.forEach((selectedBrand) => {
      result.push(selectedBrand);
    });

    // Add individual logo selections (only for brands not fully selected)
    selectedLogos.forEach((logoSet, brandId) => {
      if (!selectedBrands.has(brandId)) {
        const brand = brands.find((b) => b.id === brandId);
        if (brand) {
          const selectedLogosForBrand = brand.logoUrl.filter((logo) =>
            logoSet.has(logo.url)
          );
          if (selectedLogosForBrand.length > 0) {
            result.push({
              brandId: brand.id,
              brandName: brand.name,
              logoUrl: selectedLogosForBrand,
              theme: brand.theme,
              isFullBrand: false,
            });
          }
        }
      }
    });

    if (result.length === 0) {
      toast({
        title: "No selection",
        description: "Please select at least one brand or logo",
        variant: "destructive",
      });
      return;
    }

    onSelect(result);
    onOpenChange(false);
    toast({
      title: "Success",
      description: `${result.length} item(s) selected successfully`,
    });
  };

  const getTotalSelectedLogos = () => {
    let total = 0;
    selectedBrands.forEach((brand) => {
      total += brand.logoUrl.length;
    });
    selectedLogos.forEach((logoSet, brandId) => {
      if (!selectedBrands.has(brandId)) {
        total += logoSet.size;
      }
    });
    return total;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Brands for Slider</DialogTitle>
          <DialogDescription>
            Select entire brands or individual logos. You can select brands one
            by one or choose specific logos from brands.
            <br />
            <span className="font-semibold text-green-600">
              {getTotalSelectedLogos()} logo(s) selected from{" "}
              {getSelectedCount()} item(s)
            </span>
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="brands"
          className="flex-1 flex flex-col overflow-hidden"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="brands">Select by Brand</TabsTrigger>
            <TabsTrigger value="logos">Select Individual Logos</TabsTrigger>
          </TabsList>

          {/* Select by Brand Tab */}
          <TabsContent
            value="brands"
            className="flex-1 overflow-hidden flex flex-col mt-4"
          >
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto border rounded-lg p-4">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                </div>
              ) : filteredBrands.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                  {searchQuery
                    ? "No brands found matching your search"
                    : "No brands available"}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredBrands.map((brand) => {
                    const isSelected = isBrandSelected(brand.id);
                    return (
                      <div
                        key={brand.id}
                        className={`border rounded-lg p-4 transition-all ${
                          isSelected
                            ? "border-green-500 bg-green-50 ring-2 ring-green-500"
                            : "border-gray-200 hover:border-green-300"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => toggleBrandSelection(brand)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-lg">
                                {brand.name}
                              </h3>
                              <span className="text-xs text-gray-500">
                                {brand.logoUrl.length} logo(s)
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {brand.logoUrl.slice(0, 5).map((logo, idx) => (
                                <div
                                  key={idx}
                                  className={`w-16 h-16 border rounded-lg p-2 bg-white flex items-center justify-center transition-all ${
                                    brand.theme === "DARK"
                                      ? "grayscale hover:grayscale-0"
                                      : ""
                                  }`}
                                >
                                  <Image
                                    src={logo.url}
                                    alt={logo.name}
                                    width={48}
                                    height={48}
                                    className="max-w-full max-h-full object-contain"
                                  />
                                </div>
                              ))}
                              {brand.logoUrl.length > 5 && (
                                <div className="w-16 h-16 border rounded-lg bg-gray-100 flex items-center justify-center">
                                  <span className="text-xs font-medium text-gray-600">
                                    +{brand.logoUrl.length - 5}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Select Individual Logos Tab */}
          <TabsContent
            value="logos"
            className="flex-1 overflow-hidden flex flex-col mt-4"
          >
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto border rounded-lg p-4">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                </div>
              ) : filteredBrands.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                  {searchQuery
                    ? "No brands found matching your search"
                    : "No brands available"}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredBrands.map((brand) => {
                    const hasSelectedLogos = selectedLogos.has(brand.id);
                    const isBrandFullySelected = selectedBrands.has(brand.id);
                    return (
                      <div
                        key={brand.id}
                        className="border rounded-lg p-4 bg-gray-50"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-lg">
                            {brand.name}
                          </h3>
                          {isBrandFullySelected && (
                            <span className="text-xs text-green-600 font-medium">
                              Entire brand selected
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                          {brand.logoUrl.map((logo, idx) => {
                            const isSelected =
                              isBrandFullySelected ||
                              isLogoSelected(brand.id, logo.url);
                            return (
                              <button
                                key={idx}
                                onClick={() => toggleLogoSelection(brand, logo)}
                                className={`relative border-2 rounded-lg p-2 bg-white transition-all ${
                                  isSelected
                                    ? "border-green-500 ring-2 ring-green-500"
                                    : "border-gray-200 hover:border-green-300"
                                }`}
                                disabled={isBrandFullySelected}
                              >
                                {isSelected && (
                                  <div className="absolute top-1 right-1 bg-green-600 text-white rounded-full p-1 z-10">
                                    <Check className="w-3 h-3" />
                                  </div>
                                )}
                                <div
                                  className={`aspect-square flex items-center justify-center mb-1 ${
                                    brand.theme === "DARK"
                                      ? "grayscale hover:grayscale-0"
                                      : ""
                                  }`}
                                >
                                  <Image
                                    src={logo.url}
                                    alt={logo.name}
                                    width={64}
                                    height={64}
                                    className="max-w-full max-h-full object-contain"
                                  />
                                </div>
                                <p className="text-xs text-center truncate">
                                  {logo.name}
                                </p>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {getTotalSelectedLogos()} logo(s) from {getSelectedCount()}{" "}
            selection(s)
          </div>
          <div className="flex gap-2">
            <Button onClick={() => onOpenChange(false)} variant="outline">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmSelection}
              className="bg-green-600 hover:bg-green-700"
              disabled={getSelectedCount() === 0}
            >
              Confirm Selection ({getSelectedCount()})
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
