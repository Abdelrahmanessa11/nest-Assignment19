

export const generateSlug = (value: string) => {
const slug = value. replace(/^\s+/g, "-").toLocaleLowerCase()
return slug
}
