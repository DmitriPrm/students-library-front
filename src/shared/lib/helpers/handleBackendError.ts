
export function handleBackendError(e) {
    const message: string = e?.response?.data?.message || "Произошла неизвестная ошибка";
    console.error(message);
    ElMessage.error({
       message,
    });
}