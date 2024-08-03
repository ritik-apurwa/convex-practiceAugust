import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { useMutation } from "convex/react";
import { useUploadFiles } from "@xixixao/uploadstuff/react";


import { Input } from "../ui/input";
import { Id } from "@/convex/_generated/dataModel";
import { useToast } from "../ui/use-toast";
import { api } from "@/convex/_generated/api";

export interface UploadImagesProps {
  setImages: Dispatch<SetStateAction<string[]>>;
  setImageStorageIds: Dispatch<SetStateAction<Id<"_storage">[]>>;
  images: string[];
}

const UploadImages = ({
  setImages,
  setImageStorageIds,
  images,
}: UploadImagesProps) => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const getImageUrl = useMutation(api.newproduct.getUrl);

  const handleImage = async (blobs: Blob[], fileNames: string[]) => {
    setIsImageLoading(true);

    try {
      const files = blobs.map(
        (blob, index) =>
          new File([blob], fileNames[index], { type: blob.type })
      );
      const uploaded = await startUpload(files);
      const storageIds = uploaded.map(
        (upload) => (upload.response as any).storageId
      );
      setImageStorageIds((prevIds) => [...prevIds, ...storageIds].slice(-3));

      const imageUrls = await Promise.all(
        storageIds.map((storageId) => getImageUrl({ storageId }))
      );

      const validImageUrls = imageUrls.filter(
        (url): url is string => url !== null
      );

      setImages((prevImages) => [...prevImages, ...validImageUrls].slice(-3));
      setIsImageLoading(false);
      toast({
        title: "Images uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading images:", error);
      toast({ title: "Error uploading images", variant: "destructive" });
    } finally {
      setIsImageLoading(false);
    }
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      const blobs = await Promise.all(
        Array.from(files).map((file) =>
          file.arrayBuffer().then((ab) => new Blob([ab], { type: file.type }))
        )
      );
      const fileNames = Array.from(files).map((file) => file.name);
      handleImage(blobs, fileNames);
    } catch (error) {
      console.error("Error processing images:", error);
      toast({ title: "Error processing images", variant: "destructive" });
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative lg:w-36 lg:h-36 size-14 border border-gray-300 rounded-lg overflow-hidden"
        >
          <img
            src={image}
            className="object-cover w-full h-full"
            alt={`thumbnail ${index + 1}`}
          />
        </div>
      ))}
      {images.length < 3 && (
        <div
          className="flex flex-col items-center justify-center border-dashed border-2 border-gray-300 p-2 rounded-lg cursor-pointer"
          onClick={() => imageRef?.current?.click()}
        >
          <Input
            type="file"
            className="hidden"
            ref={imageRef}
            onChange={uploadImage}
            multiple
            accept="image/*"
          />
          {!isImageLoading ? (
            <div className="flex flex-col justify-center lg:w-32 lg:h-32 size-14 text-center items-center gap-1">
              <Upload size={20} className="text-blue-400" />
              <h2 className="text-sm font-bold text-blue-500">
                Upload <br /> Image
              </h2>
            </div>
          ) : (
            <div className="flex flex-row gap-x-2 items-center font-sm">
              <Loader2 className="animate-spin" />
              <span className="text-xs">Uploading ..</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadImages;