/* eslint-disable react-hooks/exhaustive-deps */
import Product from "@/interfaces/product.interface";

import { RootState } from "@/store/store";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  addFilteredProduct,
  clearProducts,
} from "@/store/slices/filteredProducts.slice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const allProducts: Product[] = useSelector(
    (state: RootState) => state?.allProduct
  );

  const [priceOrder, setPriceOrder] = useState<string | null>(null);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  // Update filtered products whenever a filter is changed
  useEffect(() => {
    applyFilters();
  }, [
    priceOrder,
    selectedGenders,
    selectedBrands,
    selectedSizes,
    selectedRatings,
  ]);

  const applyFilters = () => {
    let filteredProducts = [...allProducts];

    if (priceOrder) {
      filteredProducts.sort((a, b) =>
        priceOrder === "High to Low" ? b.price - a.price : a.price - b.price
      );
    }

    if (selectedGenders.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedGenders.includes(product.gender)
      );
    }

    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    if (selectedSizes.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product.sizes.some((size) => selectedSizes.includes(size))
      );
    }

    if (selectedRatings.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedRatings.includes(product.rating)
      );
    }

    dispatch(addFilteredProduct(filteredProducts));
  };

  const handleReset = () => {
    dispatch(clearProducts());
    setPriceOrder(null);
    setSelectedGenders([]);
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedRatings([]);
    dispatch(addFilteredProduct(allProducts)); // Resets to all products
  };

  return (
    <>
      {/* Reset Button */}
      <Button onClick={handleReset} className="mt-3 mb-4 w-full">
        CLEAR ALL
      </Button>

      <Accordion type="single" collapsible className="w-full">
        {/* Price Filter */}
        <AccordionItem value="item-1">
          <AccordionTrigger>SORT BY PRICE</AccordionTrigger>
          <AccordionContent>
            <RadioGroup onValueChange={setPriceOrder} value={priceOrder || ""}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="High to Low" id="high" />
                <Label htmlFor="high">High to Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Low to High" id="low" />
                <Label htmlFor="low">Low to High</Label>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        {/* Gender Filter */}
        <AccordionItem value="item-2">
          <AccordionTrigger>IDEAL FOR</AccordionTrigger>
          {["male", "female", "kids", "unisex"].map((gender) => (
            <AccordionContent key={gender}>
              <Checkbox
                checked={selectedGenders.includes(gender)}
                onCheckedChange={(isChecked) =>
                  setSelectedGenders((prev) =>
                    isChecked
                      ? [...prev, gender]
                      : prev.filter((g) => g !== gender)
                  )
                }
              />
              <Label className="pl-2">{gender}</Label>
            </AccordionContent>
          ))}
        </AccordionItem>

        {/* Brand Filter */}
        <AccordionItem value="item-3">
          <AccordionTrigger>BRAND</AccordionTrigger>
          {["Puma", "Nike", "Adidas", "H&M"].map((brand) => (
            <AccordionContent key={brand}>
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(isChecked) =>
                  setSelectedBrands((prev) =>
                    isChecked
                      ? [...prev, brand]
                      : prev.filter((b) => b !== brand)
                  )
                }
              />
              <Label className="pl-2">{brand}</Label>
            </AccordionContent>
          ))}
        </AccordionItem>

        {/* Size Filter */}
        <AccordionItem value="item-4">
          <AccordionTrigger>SIZE</AccordionTrigger>
          {["XS", "S", "M", "L", "XL"].map((size) => (
            <AccordionContent key={size}>
              <Checkbox
                checked={selectedSizes.includes(size)}
                onCheckedChange={(isChecked) =>
                  setSelectedSizes((prev) =>
                    isChecked ? [...prev, size] : prev.filter((s) => s !== size)
                  )
                }
              />
              <Label className="pl-2">{size}</Label>
            </AccordionContent>
          ))}
        </AccordionItem>

        {/* Rating Filter */}
        <AccordionItem value="item-5">
          <AccordionTrigger>RATINGS</AccordionTrigger>
          {[1, 2, 3, 4, 5].map((rating) => (
            <AccordionContent key={rating}>
              <Checkbox
                checked={selectedRatings.includes(rating)}
                onCheckedChange={(isChecked) =>
                  setSelectedRatings((prev) =>
                    isChecked
                      ? [...prev, rating]
                      : prev.filter((r) => r !== rating)
                  )
                }
              />
              <Label className="pl-2">{rating}</Label>
            </AccordionContent>
          ))}
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Sidebar;
