export function createYupErrorsObject(error) {
    return error.inner.reduce((prev, curr) => {
        const path = curr.path
            .replace(/\[/g, '.')
            .replace(/\]/g, '');

        return { ...prev,
            [path]: curr.errors[0],
        }
   }, {});
}