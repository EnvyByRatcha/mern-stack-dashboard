export interface PieChartProps {
  title: string;
  value: number;
  series: Array<number>;
  colors: Array<string>;
}

export interface FormProps {
  type?: string;
  register: any;
  onFinish: (
    valuse: FieldValues
  ) => Promise<void | CreateResponse | UpdateResponse>;
  formLoading: boolean;
  handlesubmit: FormEventHandler<HTMLElement> | undefined;
  handleImageChange: (file: any) => void;
  onFinishHandler: (valuse: FieldValues) => Promise<void>;
  propertyImages: { name: string; url: string };
}

export interface CardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  photo: string;
}

export interface Property {
  _id: string;
  title: string;
  description: string;
  propertyType: string;
  location: string;
  price: number;
  photo: string;
  creator: Creator;
  __v: number;
}

export interface Creator {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  __v: number;
  allProperty: string[];
}
