import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Sidebar: React.FC = () => {
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Price</AccordionTrigger>
          <AccordionContent>
            <RadioGroup defaultValue="comfortable">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="r1" />
                <Label htmlFor="r1">High to Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comfortable" id="r2" />
                <Label htmlFor="r2">Low to High</Label>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Gender</AccordionTrigger>
          <AccordionContent>
            <Checkbox id="terms" />
            <Label htmlFor="terms">male</Label>
          </AccordionContent>
          <AccordionContent>
            <Checkbox id="terms" />
            <Label htmlFor="terms">female</Label>
          </AccordionContent>
          <AccordionContent>
            <Checkbox id="terms" />
            <Label htmlFor="terms">kids</Label>
          </AccordionContent>
          <AccordionContent>
            <Checkbox id="terms" />
            <Label htmlFor="terms">unisex</Label>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Brands</AccordionTrigger>
          <AccordionContent>
            <Checkbox id="terms" />
            <Label htmlFor="terms">Puma</Label>
          </AccordionContent>
          <AccordionContent>
            <Checkbox id="terms" />
            <Label htmlFor="terms">Nike</Label>
          </AccordionContent>
          <AccordionContent>
            <Checkbox id="terms" />
            <Label htmlFor="terms">Adidas</Label>
          </AccordionContent>
          <AccordionContent>
            <Checkbox id="terms" />
            <Label htmlFor="terms">H&M</Label>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Sizes</AccordionTrigger>
          <AccordionContent>
            <Checkbox id="terms" />
            <Label htmlFor="terms">XS</Label>
          </AccordionContent>
          <AccordionContent>
            <Checkbox id="terms" />
            <Label htmlFor="terms">S</Label>
          </AccordionContent>
          <AccordionContent>
            <Checkbox id="terms" />
            <Label htmlFor="terms">M</Label>
          </AccordionContent>
          <AccordionContent>
            <Checkbox id="terms" />
            <Label htmlFor="terms">L</Label>
          </AccordionContent>
          <AccordionContent>
            <Checkbox id="terms" />
            <Label htmlFor="terms">XL</Label>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <Checkbox id="terms" />
            <Label htmlFor="terms">1</Label>
          </AccordionContent>
          <AccordionContent>
            <Checkbox id="terms" />
            <Label htmlFor="terms">2</Label>
          </AccordionContent>
          <AccordionContent>
            <Checkbox id="terms" />
            <Label htmlFor="terms">3</Label>
          </AccordionContent>
          <AccordionContent>
            <Checkbox id="terms" />
            <Label htmlFor="terms">4</Label>
          </AccordionContent>
          <AccordionContent>
            <Checkbox id="terms" />
            <Label htmlFor="terms">5</Label>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Sidebar;
