import { Button } from "@/shared/ui/Button/Button";
import styles from "./PersonsStage.module.scss";
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "@/shared/ui/Input/Input";
import { useStage } from "..";
import { addStageSelector } from "../model/selectors";
import { User } from "@/shared/types/api";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api";
import { useEffect } from "react";
import { useClientEditingData } from "@/shared/storage/clientDataEditing";

interface PersonsForm {
  name: string;
  surname: string;
  middle_name: string;
  phone_number: string;
  persons: User[];
}
export const PersonsStage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => api.getCurrUser(),
    select: (data) => data.data,
  });

  const setPersons = useClientEditingData((state) => state.setPersons);
  const addStage = useStage(addStageSelector);
  const setMainPerson = useClientEditingData((state) => state.setMainPerson);
  const mainPerson = useClientEditingData((state) => state.mainPerson);
  const {
    setValue,
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<PersonsForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "persons",
  });

  const onSubmit = (data: PersonsForm) => {
    const mainPerson = {
      name: data.name,
      surname: data.surname,
      middle_name: data.middle_name,
      phone_number: data.phone_number,
    };
    const persons = [
      ...data.persons.map((person) => {
        const { name, surname, middle_name, phone_number } = person;
        return {
          name,
          surname,
          middle_name,
          phone_number,
        };
      }),
    ];
    setMainPerson(mainPerson);
    setPersons(persons);
    addStage();
  };
  const persons = useClientEditingData((state) => state.persons);
  useEffect(() => {
    if (mainPerson) {
      const { name, surname, middle_name, phone_number } = mainPerson;
      setValue("name", name);
      setValue("surname", surname);
      setValue("middle_name", middle_name);
      setValue("phone_number", phone_number);
    }
    if (persons) {
      for (let i = 0; i < persons.length; i++) {
        const person = persons[i];
        append({ ...person, id: String(i) });
      }
    }
  }, [mainPerson, persons]);
  return (
    <>
      {/* {isError && <h1>Произошла ошибка...</h1>} */}
      {isLoading && <h1>Загрузка...</h1>}
      {!isLoading && (
        <div className={styles.container}>
          <h1>Введите ФИО и номер телефона участников встречи</h1>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <ul className={styles.inputsList}>
              <li className={styles.inputs}>
                <Input
                  disabled={true}
                  register={register(`name`, { required: true })}
                  placeholder="Имя"
                  errorText={errors.name?.message}
                  defaultValue={data?.name}
                />
                <Input
                  disabled={true}
                  register={register(`surname`, { required: true })}
                  placeholder="Фамилия"
                  errorText={errors.surname?.message}
                  defaultValue={data?.surname}
                />
                <Input
                  disabled={true}
                  register={register(`middle_name`, { required: true })}
                  placeholder="Отчество"
                  errorText={errors.middle_name?.message}
                  defaultValue={data?.middle_name}
                />
                <Input
                  disabled={true}
                  register={register(`phone_number`, { required: true })}
                  placeholder="Телефон"
                  errorText={errors.phone_number?.message}
                  defaultValue={data?.phone_number}
                />
              </li>
              {fields.map((item, index) => (
                <li key={item.id} className={styles.listInputsContainer}>
                  <div className={styles.inputs}>
                    <Input
                      register={register(`persons.${index}.name` as const, {
                        required: true,
                      })}
                      errorText={errors.persons?.[index]?.name?.message}
                      placeholder="Имя"
                    />
                    <Input
                      register={register(`persons.${index}.surname` as const, {
                        required: true,
                      })}
                      errorText={errors.persons?.[index]?.surname?.message}
                      placeholder="Фамилия"
                    />
                    <Input
                      register={register(
                        `persons.${index}.middle_name` as const,
                        {
                          required: true,
                        }
                      )}
                      errorText={errors.persons?.[index]?.middle_name?.message}
                      placeholder="Отчество"
                    />
                    <Input
                      register={register(
                        `persons.${index}.phone_number` as const,
                        {
                          required: true,
                        }
                      )}
                      errorText={errors.persons?.[index]?.phone_number?.message}
                      placeholder="Телефон"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className={styles.deleteButton}
                  >
                    -
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={styles.addButton}
              onClick={() =>
                append({
                  id: "",
                  name: "",
                  surname: "",
                  middle_name: "",
                  phone_number: "",
                })
              }
            >
              +
            </button>
            <Button type="submit">Далее</Button>
          </form>
        </div>
      )}
    </>
  );
};
