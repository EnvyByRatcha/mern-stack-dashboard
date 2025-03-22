import { useGetIdentity } from "@refinedev/core";
import React, { useState } from "react";
import { CustomForm } from "../components";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";

const CreateProperties = () => {
  const { data: user } = useGetIdentity<any>();

  const [properImage, setProperImage] = useState({
    name: "",
    url: "",
  });

  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) => {
      return new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });
    };
    reader(file).then((result: string) => {
      setProperImage({ name: file?.name, url: result });
    });
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!properImage.name) return alert("Please upload image");
    await onFinish({
      ...data,
      photo: properImage.url,
      email: user.email,
    });
  };

  return (
    <div>
      <CustomForm
        type="Create"
        register={register}
        onFinish={onFinish}
        formLoading={formLoading}
        handlesubmit={handleSubmit}
        handleImageChange={handleImageChange}
        onFinishHandler={onFinishHandler}
        propertyImages={properImage}
      />
    </div>
  );
};

export default CreateProperties;
