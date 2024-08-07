import React, { useState, useEffect } from "react";
import { Product, ProductZodSchemaNew } from "@/types";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash } from "lucide-react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import CustomForm, { FormType } from "../providers/custom-form";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import UploadImages from "../providers/image-upload";
import { SelectItem } from "../ui/select";

interface ProductControlProps {
  initialData?: Product & { _id: Id<"newproduct"> };
  type: "create" | "update" | "delete";
}

const ProductCrud: React.FC<ProductControlProps> = ({ type, initialData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [imageStorageIds, setImageStorageIds] = useState<Id<"_storage">[]>([]);

  const form = useForm<Product>({
    resolver: zodResolver(ProductZodSchemaNew),
    mode: "onChange", // Enable validation on change
    defaultValues:
      type === "create"
        ? { name: "", price: 0, images: [] }
        : { ...initialData, images: initialData?.images || [] },
  });

  const { isValid } = form.formState;

  const createProduct = useMutation(api.newproduct.createProduct);
  const updateProduct = useMutation(api.newproduct.updateProduct);
  const deleteProduct = useMutation(api.newproduct.deleteProduct);

  useEffect(() => {
    if (type === "update" && initialData) {
      // Set initial images when updating
      setImages(initialData.images || []);
    } else if (type === "create") {
      // Clear images when creating a new product
      setImages([]);
    }
  }, [type, initialData]);

  const handleSubmit = async (values: Product) => {
    setIsSubmitting(true);
    try {
      const productData = {
        ...values,
        images: images, // use the images state
      };

      if (type === "create") {
        await createProduct(productData);
      } else if (type === "update" && initialData) {
        await updateProduct({ id: initialData._id, ...productData });
      } else if (type === "delete" && initialData) {
        await deleteProduct({ id: initialData._id });
      }

      form.reset();
      setIsOpen(false);
    } catch (error) {
      console.error(`Error ${type}ing product:`, error);
    }
    setIsSubmitting(false);
  };

  const handleOpen = () => {
    if (type === "update" && initialData) {
      form.reset(initialData);
      setImages(initialData.images || []);
    } else if (type === "create") {
      form.reset({ name: "", price: 0, images: [] });
      setImages([]);
    }
    setIsOpen(true);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size={type === "create" ? "lg" : "sm"}
          onClick={handleOpen}
        >
          {type === "create" && <Plus className="mr-2" />}
          {type === "update" && <Edit className="mr-2" />}
          {type === "delete" && <Trash className="mr-2" />}
          {type.charAt(0).toUpperCase() + type.slice(1)} Product
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="container mx-auto max-w-5xl max-h-screen overflow-y-auto no-scrollbar">
        <AlertDialogHeader>
          <AlertDialogTitle>Product Operation</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          {type === "create" && "Create a new Product"}
          {type === "update" && "Update the existing Product"}
          {type === "delete" && "Are you sure you want to delete this Product?"}
        </AlertDialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {type !== "delete" && (
              <>
                <CustomForm
                  control={form.control}
                  name="name"
                  label="Name"
                  placeholder="Enter product name"
                  formType={FormType.INPUT}
                />
                <CustomForm
                  control={form.control}
                  name="price"
                  label="Price"
                  placeholder="Enter product price"
                  formType={FormType.NUMBER_INPUT}
                />
                <CustomForm
                  control={form.control}
                  name="category" // Add your selector field name
                  label="Category"
                  placeholder="Select product category"
                  formType={FormType.SELECT}
                >
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                </CustomForm>

                <CustomForm
                  control={form.control}
                  name="isFeatured" // Add your checkbox field name
                  label="Featured"
                  formType={FormType.CHECKBOX}
                />
                <CustomForm
                  control={form.control}
                  name="phoneNumber" // Add your checkbox field name
                  label="Phone Number"
                  formType={FormType.PHONE_INPUT}
                  placeholder="555-555-555-3"
                />

                <UploadImages
                  setImages={setImages}
                  setImageStorageIds={setImageStorageIds}
                  images={images}
                />
              </>
            )}
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                type="submit"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting
                  ? "Processing..."
                  : type.charAt(0).toUpperCase() + type.slice(1)}
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProductCrud;
