const jsonToForm = {

    buildFormData: (formData: FormData, data: object, currentKey?:any, parentKey?: any) => {
        if (data && typeof data === 'object' &&
            !(data instanceof Date) &&
            !(data instanceof File) &&
            !(data instanceof FileList)) {
            Object.keys(data).forEach(key => {
                jsonToForm.buildFormData(formData, data[key], parentKey ? `${parentKey}` : key, parentKey ? `${parentKey}[${key}]` : key);
            });
        } else if (data instanceof File || data instanceof FileList) {
            const value: any = data == null ? '' : data;
            formData.append(currentKey, value);
        } else {
            const value: any = data == null ? '' : data;
            formData.append(parentKey, value);
        }
    },
    transform: (json: object) => {
        const formData = new FormData();
        jsonToForm.buildFormData(formData, json);
        return formData;
    }
}

export default jsonToForm