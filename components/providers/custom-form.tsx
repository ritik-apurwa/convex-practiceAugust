import React from "react";
import { Control, Controller } from "react-hook-form";
import { IconType } from "react-icons";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import UploadImages from "./image-upload";

export enum FormType {
  INPUT = "input",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  SELECT = "select",
  NUMBER_INPUT = "numberInput",
  SKELETON = "skeleton",
  IMAGEUPLOAD = "imageUpload",
}

interface FormProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  icon?: IconType;
  disabled?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  formType: FormType;
}

const RenderInput = ({ field, props }: { field: any; props: FormProps }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(parseFloat(e.target.value));
  };

  const Icon: IconType | undefined = props.icon;

  switch (props.formType) {
    case FormType.NUMBER_INPUT:
      return (
        <FormControl>
          <Input
            type="number"
            {...field}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </FormControl>
      );

    case FormType.INPUT:
      return (
        <FormControl>
          <div className="relative flex items-center">
            {Icon && (
              <div className="absolute left-3">
                <Icon className="text-gray-400" />
              </div>
            )}
            <Input
              placeholder={props.placeholder}
              {...field}
              className={`w-full p-2 border rounded-md ${Icon ? "pl-10" : ""}`}
            />
          </div>
        </FormControl>
      );

    case FormType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            className="w-full p-2 border rounded-md"
          />
        </FormControl>
      );

    case FormType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center space-x-2">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <Label
              htmlFor={props.name}
              className="text-sm font-medium text-gray-700"
            >
              {props.label}
            </Label>
          </div>
        </FormControl>
      );
    case FormType.IMAGEUPLOAD:
      return (
        <UploadImages
          setImages={(images) => field.onChange(images)}
          setImageStorageIds={() => {}}
          images={field.value || []}
        />
      );

    case FormType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent>{props.children}</SelectContent>
          </Select>
        </FormControl>
      );

    case FormType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;

    default:
      return null;
  }
};

const CustomForm = (props: FormProps) => {
  const { control, name, label, formType } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {formType !== FormType.CHECKBOX && label && (
            <FormLabel className="text-sm font-medium text-gray-700 mb-1">
              {label}
            </FormLabel>
          )}
          <RenderInput field={field} props={props} />
          <FormMessage className="text-sm text-red-500 mt-1" />
        </FormItem>
      )}
    />
  );
};

export default CustomForm;
