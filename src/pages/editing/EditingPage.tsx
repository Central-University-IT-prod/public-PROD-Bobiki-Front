import { api } from "@/shared/api";
import { useClientEditingData } from "@/shared/storage/clientDataEditing";
import { Page } from "@/shared/ui/Page/Page";
import ClientEditingForm from "@/widgets/ClientEditingForm";
import StageIndicator from "@/widgets/StageIndicatorEditing";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const EditingPage = ({ id }: { id: string }) => {
  const { isSuccess, data } = useQuery({
    queryKey: ["userMeeting", id],
    queryFn: () => api.getUserMeeting(id),
    select: (data) => data.data,
  });

  const clientEditingData = useClientEditingData();
  const { setProducts, setMainPerson, setPersons, setPlace } =
    clientEditingData;

  useEffect(() => {
    if (data) {
      const {
        products,
        user,
        additional_users,
        meeting: { place },
      } = data;
      setProducts(products.map((product) => product.name));
      setMainPerson(user);
      setPersons(additional_users);
      setPlace(place);
    }
  }, [isSuccess, data]);

  return (
    <Page center>
      <StageIndicator />
      <ClientEditingForm id={id} />
    </Page>
  );
};
