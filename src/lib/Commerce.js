import Commerce from '@chec/commerce.js';

const commerce = new Commerce(process.env.REACT_APP_COMMERCE_KEY, true);

export default commerce;