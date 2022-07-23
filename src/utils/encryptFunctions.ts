import bcrypt from "bcrypt"

export const encrypt = {
  bcrypt: {
    encryptPassword: encryptPasswordWithBcrypt,
    decryptPasswordAndCompare: decryptPasswordAndCompareWithBcrypt,
  },
}

function encryptPasswordWithBcrypt(password: string) {
  const hashSalt = 10

  const hashPassword = bcrypt.hashSync(password, hashSalt)

  return hashPassword
}

function decryptPasswordAndCompareWithBcrypt(
  password: string,
  hashPassword: string,
) {
  if (!password || !hashPassword) return false

  return bcrypt.compareSync(password, hashPassword)
}
