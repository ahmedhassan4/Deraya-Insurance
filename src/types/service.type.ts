export interface ServiceType {
  id: number;
  title: string;
  inner_title: string;
  desc: string;
  image: string;
  inner_image: string;
  bullet_points: string[];
  hiddenInput: boolean;
  fields: string[];
}

export interface ServiceResponse {
  data: ServiceType[];
}
