import * as yup from 'yup'

export const userRegisterForm = yup.object({
    titlePr: yup.string().required().max(100),
    titleEn: yup.string().max(50),
    tag: yup.string().max(50),
    alt: yup.string().max(50),
});
