import { billingData } from "@src/Common/data";
import ProxyBase from "../ProxyBase";

interface IGetBillingParams {
  page?: number;
  perPage?: number;
}
class BillingProxy extends ProxyBase {
  getBillings(params: IGetBillingParams) {
    //* bỏ comment khi ghép api thật
    return {
      status: 200,
      data: billingData,
    }
    return this.get('/billing', params);
  }
}

const billingProxy = new BillingProxy();
export default billingProxy;