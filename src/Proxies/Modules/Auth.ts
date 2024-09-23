import { UserLogin } from "@src/Types/Auth";
import ProxyBase from "../ProxyBase";

class AuthProxy extends ProxyBase {
  login(params: UserLogin) {
    //* bỏ comment khi ghép api thật 
    // return this.post('/auth/login', params);
    return {
      status: 200,
      data: {
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImV4cCI6MTcyNzE4NTkyNC40MDYyMTMzLCJpZCI6MTIzLCJuYW1lIjoiYWRtaW4ifQ.uzU8-c-jiNAOuX9d93Du7uoED4Hqrl8FsXj4Dmmr3g8",
        name: "Admin",
        role: "admin",
        status: "active",
        email: "admin@gmail.com",
        avatar: "",
      },
    };
  }
}

const authProxy = new AuthProxy();
export default authProxy;
