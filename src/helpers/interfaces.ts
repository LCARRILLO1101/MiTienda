export interface Rating{
  rate:number;
  count:number;
}

export default interface Product{
  id:number;
  image:string;
  title:string;
  category:string;
  description:string;
  price:number;
  rating:Rating;

}

export interface FetchState{
  data:Product[];
  loading:boolean;
  error:string|null;
}