import { useQueries } from "@tanstack/react-query";
import styles from "./index.module.scss";
import { api } from "@/shared/api";

interface DocumentsProps {
  products: number[];
}

export const Documents = ({ products }: DocumentsProps) => {
  const documentStrings: string[] = [];
  const queries = [
    ...products.map((productId) => ({
      queryKey: ["documents", productId],
      queryFn: () => api.getProduct(`${productId}`),
    })),
  ];

  const results = useQueries({
    queries,
  });

  results.map((result) => {
    if (result.data) {
      documentStrings.push(...result.data.data[1].documents);
    }
  });
  const filteredProducts = [...new Set(documentStrings)];
  return <div className={styles.documents}>{filteredProducts.join(", ")}</div>;
};
