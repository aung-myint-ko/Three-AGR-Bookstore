import sign from "jwt-encode";
import jwt_decode from "jwt-decode";

export const useJwtEncode = (id) => {
  const secretKey = "LazyKim";
  const token = sign({ id }, secretKey);
  return token;
};

export const useJwtDecode = (jwtToken) => {
  const decoded = jwt_decode(jwtToken);
  return decoded;
};
