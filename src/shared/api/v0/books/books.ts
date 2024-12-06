import { apiInstance } from "@/shared/api/instance";

const BASE_API = "/books";

export function getAll() {
    return apiInstance.get(BASE_API);
}

export function save(dto) {
    return apiInstance.post(BASE_API, dto);
}