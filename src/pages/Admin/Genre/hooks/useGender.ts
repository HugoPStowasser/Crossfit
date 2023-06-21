import { useEffect, useState } from "react";
import { TGenreData, TGenreFormValues, TGenreHttp } from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { genreFormSchema } from "../schemas/schema";
import { useNavigate, useParams } from "react-router-dom";
import { mapperHttpToForm, mapperHttpToTable } from "../mappers";
import { useCustomToast } from "../../../../hooks/useCustomToast";
import { useQuery } from "react-query";
import { useGenreRequest } from "./useGenreRequest";

export const useGenre = () => {
  const [genre, setGenre] = useState<TGenreData>({} as TGenreData);
  const { idGenre } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const apiGenre = useGenreRequest();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TGenreFormValues>({
    resolver: zodResolver(genreFormSchema),
    defaultValues: {
      name: "",
    },
    shouldUnregister: false,
  });

  const getGenreById = async (id: number) => {
    try {
      const { data }: { data: TGenreHttp } = await apiGenre.getById(id);
      setGenre(mapperHttpToForm(data));
      return mapperHttpToForm(data);
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar o gênero!`,
      });
    }
    return {};
  };

  const getAllGenres = async () => {
    try {
      setIsLoading(true);
      const { data }: { data: TGenreHttp[] } = await apiGenre.getAll();
      return mapperHttpToTable(data);
    } catch (error) {
      errorToast({
        title: `Não foi possível encontrar os gêneros!`,
      });
    } finally {
      setIsLoading(false);
    }
    return [];
  };

  const { refetch, data: allGenres } = useQuery({
    queryKey: ["genre"],
    queryFn: getAllGenres,
  });

  const deleteById = async (id: number) => {
    try {
      await apiGenre.deleteById(id);
      refetch();
      successToast({
        title: `Gênero deletado com sucesso!`,
      });
    } catch (error) {
      errorToast({
        title: `Não foi possível deletar o gênero!`,
      });
    }
  };

  useEffect(() => {
    if (idGenre) {
      getGenreById(Number(idGenre));
    }
  }, [idGenre]);

  const onSubmitHandler = async (formValues: TGenreFormValues) => {
    try {
      setIsLoading(true);
      const { name } = formValues;
      if (genre.idGenre) {
        await apiGenre.update({
          name,
          idGenre: genre.idGenre,
        });
        successToast({
          title: `Gênero editado com sucesso!`,
        });
      } else {
        await apiGenre.insert({ name });
        successToast({
          title: `Gênero cadastrado com sucesso!`,
        });
      }
      navigate("/admin/genre");
    } catch (err) {
      errorToast({
        title: `Não foi possível estabelecer conexão com o servidor`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onSubmitHandler,
    register,
    handleSubmit,
    errors,
    allGenres,
    getAllGenres,
    genre,
    setValue,
    deleteById,
    isLoading,
  };
};
