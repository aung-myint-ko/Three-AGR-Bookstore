import sign from "jwt-encode";
import jwt_decode from "jwt-decode";

export const jwtEncode = (id) => {
  const secretKey = "LazyKim";
  const token = sign({ id }, secretKey);
  return token;
};

export const jwtDecode = (jwtToken) => {
  const decoded = jwt_decode(jwtToken);
  return decoded;
};
