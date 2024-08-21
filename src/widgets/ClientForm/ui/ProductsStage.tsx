import styles from "./ProductsStage.module.scss";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api";
import { Button } from "@/shared/ui/Button/Button";

import { MultiSelect } from "primereact/multiselect";
import { ErrorMessage } from "@/shared/ui/ErrorMessage/ErrorMessage";
import { Controller, useForm } from "react-hook-form";
import { useStage } from "..";
import { addStageSelector } from "../model/selectors";
import { useClientData } from "@/shared/storage/clientData";
import { useEffect, useState } from "react";
import { Documents } from "@/entities/Documents";
import { Title } from "@/shared/ui/Title/Title";

interface ProductsForm {
  selectedProducts: number[];
}
export const ProductsStage = () => {
  const addStage = useStage(addStageSelector);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductsForm>();
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: () => api.getProducts(),
    select: (data) => data.data,
  });

  const [productsDocs, setProductsDocs] = useState<number[]>([]);
  const products = data?.products;
  const setProducts = useClientData((state) => state.setProducts);
  const setProductsTime = useClientData((state) => state.setProductsTime);
  const userProudcts = useClientData((state) => state.products);

  const options = products?.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  const onSubmit = ({ selectedProducts }: ProductsForm) => {
    let minutesSum = 0;
    for (let i = 0; i < selectedProducts.length; i++) {
      const id = selectedProducts[i];
      const product = products?.find((product) => product.id === id);
      if (product) {
        minutesSum += product.time;
      }
    }

    const productsName = selectedProducts.map(
      (selectedProductId) =>
        products?.find((product) => product.id === selectedProductId)?.name ||
        ""
    );
    setProducts(productsName);
    setProductsTime(minutesSum);
    addStage();
  };

  useEffect(() => {
    setValue(
      "selectedProducts",
      userProudcts.map(
        (product) => products?.find((p) => p.name === product)?.id || 0
      )
    );
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Title htmlH="1" className={styles.documentTitle}>
          Нужные документы:{" "}
          <b>
            <Documents products={productsDocs} />
          </b>
        </Title>
        <div className={styles.multiInputContainer}>
          <Controller
            name="selectedProducts"
            control={control}
            rules={{ required: "Нужно выбрать хотя бы один продукт" }}
            render={({ field }) => (
              <MultiSelect
                // appendTo="self"
                className={styles.multiInput}
                showSelectAll={false}
                id={field.name}
                name="value"
                value={field.value}
                options={options}
                onChange={(e) => {
                  field.onChange(e.value);
                  setProductsDocs(e.value);
                }}
                optionLabel="label"
                optionValue="value"
                emptyMessage={"Сейчас недоступны продукты"}
                placeholder="Выберите продукты"
                panelStyle={{
                  marginTop: "10px",
                  backgroundColor: "var(--form-element-bg-color)",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: "10px",
                  gap: "10px",
                }}
                panelHeaderTemplate={() => <></>}
              />
            )}
          />
          <ErrorMessage id="">{errors.selectedProducts?.message}</ErrorMessage>
        </div>
        <Button type="submit">Далее</Button>
      </form>
    </>
  );
};
