import * as yup from 'yup';
const Validation = yup.object().shape({
  cardHolder: yup.string().required('請輸入持卡人姓名'),
  cardNumber: yup.string()
    .required('請輸入卡號')
    .matches(/^\d{16}$/, '請輸入 16 位數字卡號'),
  expDate: yup.string()
    .required('必填')
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, '格式錯誤 (MM/YY)'),
    cvv: yup.string().required('必填').matches(/^\d{3,4}$/, '3-4位數字'),
    isAutoRenew: yup.boolean(),
    agreedToTerms: yup.boolean().oneOf([true], '您必須同意服務條款')
  });
export default Validation;