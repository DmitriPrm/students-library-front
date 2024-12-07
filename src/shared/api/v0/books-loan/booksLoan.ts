import { apiInstance } from "@/shared/api/instance";

const BASE_URL = "/books-loan";

export function getAll() {
    return apiInstance.get(BASE_URL);
}

export function save(dto: any) {
    return apiInstance.post(BASE_URL, dto);
}