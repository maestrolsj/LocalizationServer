import bcrypt from "bcrypt";
import md5 from "md5";

export const encrypt = async (password: string) => {
  return await bcrypt.hash(
    md5(password),
    parseInt(process.env.PASSWORD_SALT_ROUNDS as string)
  );
};

export const verify = async (password: string, hash?: string) => {
  if (hash) {
    return await bcrypt.compare(md5(password), hash);
  } else {
    return false;
  }
};
