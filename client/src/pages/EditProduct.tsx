import axios from "axios";
import User from "@/interfaces/user.interface";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AiOutlineClose } from "react-icons/ai";
import { ThreeDots } from "react-loader-spinner";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "@/helpers/constants/server_url";
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const genderOptions: string[] = ["male", "female", "kids", "unisex"];
const sizeOptions: string[] = ["XS", "S", "M", "L", "XL"];

const EditProduct: React.FC = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    rating: "",
    gender: "",
    sizes: [] as string[],
  });
  const [productImages, setProductImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const user: User = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Redirect if user is not admin
    if (!user?.isAdmin) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    // Fetch product details
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/product/get-product/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        const { product } = data;
        setProductData({
          name: product.name,
          description: product.description,
          price: product.price,
          brand: product.brand,
          rating: product.rating,
          gender: product.gender,
          sizes: product.sizes,
        });
        setPreviewImages(product.productImages); // Populate existing images
      } catch (error) {
        console.error("Error fetching product:", error);
        navigate("/admin-dashboard");
      }
    };

    fetchProduct();
  }, [productId, user, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleGenderChange = (gender: string) => {
    setProductData((prevData) => ({ ...prevData, gender }));
  };

  const handleSizeChange = (size: string, isSelected: boolean | string) => {
    if (typeof isSelected === "boolean") {
      setProductData((prevData) => ({
        ...prevData,
        sizes: isSelected
          ? [...prevData.sizes, size]
          : prevData.sizes.filter((s) => s !== size),
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setProductImages((prevFiles) => [...prevFiles, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prevPreviews) => [...prevPreviews, ...previews]);
  };

  const removeImage = (index: number) => {
    setProductImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setPreviewImages((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("brand", productData.brand || "Urban Glare");
    formData.append("gender", productData.gender);
    formData.append("rating", productData.rating);
    productData.sizes.forEach((size) => formData.append("sizes", size));
    productImages.forEach((image) => formData.append("productImages", image));

    try {
      await axios.patch(
        `${BASE_URL}/product/edit-product/${productId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/admin-dashboard");
      toast.success("Product updated successfully!", {
        position: "bottom-right",
        theme: "dark",
        autoClose: 5000,
        draggable: true,
      });
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <Input
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            placeholder="Enter product description"
            maxLength={300}
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Price (₹)</label>
          <Input
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            type="number"
            min={0}
            placeholder="Enter price"
            required
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium mb-1">Brand</label>
          <Input
            name="brand"
            value={productData.brand}
            onChange={handleInputChange}
            placeholder="Brand Name"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium mb-1">Rating (*)</label>
          <Input
            name="rating"
            value={productData.rating}
            onChange={handleInputChange}
            type="number"
            min={0}
            max={5}
            placeholder="Enter rating"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <Select onValueChange={handleGenderChange} value={productData.gender}>
            <SelectTrigger>
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {genderOptions.map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    {gender}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Sizes */}
        <div>
          <label className="block text-sm font-medium mb-1">Sizes</label>
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((size) => (
              <label key={size} className="flex items-center space-x-2">
                <Checkbox
                  checked={productData.sizes.includes(size)}
                  onCheckedChange={(isSelected) =>
                    handleSizeChange(size, isSelected)
                  }
                />
                <span>{size}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Product Images */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Product Images
          </label>
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
          <div className="flex flex-wrap gap-3 mt-3">
            {previewImages.map((src, index) => (
              <div key={index} className="relative">
                <img
                  src={src}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded-md border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-white rounded-full p-1 shadow"
                >
                  <AiOutlineClose size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center"
          >
            {loading ? (
              <ThreeDots color="#ffffff" height={12} width={40} />
            ) : (
              "Update Product"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
