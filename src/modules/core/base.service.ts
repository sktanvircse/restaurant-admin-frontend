// src/modules/core/base.service.ts
import { AUTH_TOKEN_KEY } from "@/lib/constants";
import axios, {
  AxiosRequestConfig,
  type AxiosRequestHeaders,
  type AxiosResponse,
} from "axios";
import Cookies from "js-cookie";
import { useCallback, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ApiResponse, SearchParamOptions } from "@/types";

export const useBaseService = <DataType, InputType = unknown>(
  route: string,
) => {
  const router = useRouter();
  const pathname = usePathname();

  const isCorsOrNetworkError = (error: any) => {
    return (
      !error.response &&
      (error.message === "Network Error" || error.code === "ERR_NETWORK")
    );
  };

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
      timeout: 5000000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    instance.interceptors.request.use((config) => {
      const hasFile = config.data && config.data.multipart === true;
      const cookies = Cookies.get(AUTH_TOKEN_KEY);
      const token = cookies || "";

      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": hasFile ? "multipart/form-data" : "application/json",
      } as unknown as AxiosRequestHeaders;

      return config;
    });

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (isCorsOrNetworkError(error)) {
          return {};
        }
        const originalRequest: AxiosRequestConfig & { _retry?: boolean } =
          error.config || {};

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const oldToken = Cookies.get(AUTH_TOKEN_KEY) || "";
          if (!oldToken) {
            if (pathname?.startsWith("/admin")) {
              router.push("/admin/login");
            } else {
              router.push("/login");
            }
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      },
    );

    return instance;
  }, [pathname, router]);

  const findAll = useCallback(
    (params?: unknown) => {
      return axiosInstance.get<DataType[]>(route, { params });
    },
    [axiosInstance, route],
  );

  const findAllByPost = (data?: unknown) => {
    return axiosInstance.post<DataType[]>(route, data);
  };

  const find = useCallback(
    (id: string | number, options?: { [key: string]: any }) =>
      axiosInstance.get<DataType>(`${route}/${id}`, {
        params: options,
      }),
    [axiosInstance, route],
  );

  const findPageBySlug = (slug: string, params?: unknown) =>
    axiosInstance.get<DataType>(`${route}/${slug}`, { params });

  const findByStore = useCallback(
    (id: string, store_id?: string) => {
      return axiosInstance.get<DataType>(`${route}/${id}`, {
        params: store_id ? { store_id } : undefined,
      });
    },
    [axiosInstance, route],
  );

  const create = (data: Record<string, unknown>) => {
    return axiosInstance.post<InputType, AxiosResponse<DataType>>(route, data);
  };

  const update = (id: string | number, data: Record<string, unknown>) => {
    return axiosInstance.put<InputType, AxiosResponse<DataType>>(
      `${route}/${id}`,
      data,
    );
  };

  const patchItem = (id: string | number, data: Record<string, unknown>) => {
    return axiosInstance.patch<DataType>(`${route}/${id}`, data);
  };

  const postEmpty = () => {
    return axiosInstance.post<InputType, AxiosResponse<DataType>>(route);
  };

  const deleteItem = (id: string | number) => {
    return axiosInstance.delete<DataType>(`${route}/${id}`);
  };

  const deleteItems = (data: Record<string, unknown>) => {
    return axiosInstance.delete<InputType, AxiosResponse<DataType>>(route, {
      data,
    });
  };

  const postItem = (id: string | number, data?: Record<string, unknown>) => {
    return axiosInstance.post<DataType>(`${route}/${id}`, data);
  };

  const putItem = (id: string | number, data?: Record<string, unknown>) => {
    return axiosInstance.put<DataType>(`${route}/${id}`, data);
  };

  const formatData = (data: DataType[] | undefined) => {
    const response: unknown = data;
    const responseData = response as ApiResponse<DataType>;
    const items: DataType[] = responseData?.data;
    return items;
  };

  const formatSearchParams = (params: Partial<SearchParamOptions>) => {
    return Object.entries(params)
      .filter(([, value]) => Boolean(value))
      .map(([k, v]) =>
        [
          "type",
          "categories",
          "tags",
          "author",
          "manufacturer",
          "shops",
        ].includes(k)
          ? `${k}.slug:${v}`
          : `${k}:${v}`,
      )
      .join(";");
  };

  return {
    findAll,
    findAllByPost,
    find,
    findPageBySlug,
    findByStore,
    create,
    postEmpty,
    update,
    patchItem,
    postItem,
    putItem,
    delete: deleteItem,
    deleteItems,
    formatData,
    formatSearchParams,
    getAxiosInstance: () => axiosInstance,
  };
};
