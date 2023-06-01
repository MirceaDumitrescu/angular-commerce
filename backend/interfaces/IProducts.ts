export default interface IProdcuts {
  title?: string;
  categories?: string[];
  sku?: string;
  stock?: number;
  price?: number;
  long_description?: string;
  short_description?: string;
  images?: string[];
  thumbnail?: string;
  supplier?: string;
  weight?: number;
  dimensions?: string;
  date?: Date;
}
