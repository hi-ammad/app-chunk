import bcryptjs from "bcryptjs";
import crypto from "crypto";
import otpGenerator from "otp-generator";
import { type HydratedDocument, Query } from "mongoose";

// Hash password before save to db
export const hashPasswordBeforeSave = async function (
  this: HydratedDocument<IUser>,
  next: (err?: Error) => void,
) {
  //  NOTE: Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  const hashPswrd = await bcryptjs.hash(this.password, 12);
  this.password = hashPswrd;
  this.password_changedAt = Date.now();
  next();
};

// hash password before update
export const hashPasswordBeforeUpdate = async function (
  this: Query<any, any, {}, any, "find">,
  next: (err?: Error) => void,
) {
  let update = { ...(this.getUpdate() as IUser) };
  //  NOTE: Only run this function if password was modified
  if (update.password) {
    // Hash the password
    update.password = await bcryptjs.hash(update.password, 12);
    this.setUpdate(update);
  }
  next();
};

export const createPasswordReset = async function (
  this: HydratedDocument<IUser>,
) {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  // OTP
  this.password_reset_otp = crypto.createHash("sha256").update(otp).digest("hex");

  // OTP
  this.password_reset_expires = Date.now() + 10 * 60 * 1000;

  return otp;
};

export const changePasswordAfter = function (
  this: HydratedDocument<IUser>,
  JWTTimestamp: number,
) {
  if (this.password_changedAt) {
    // const changedTimestamp = passwordChangedAt.getTime() / 1000;

    return JWTTimestamp < this.passwordChangedAt / 1000;
  }

  // False means NOT changed
  return false;
};

/** Compare Password */
/** Compare Plain Password With User Hashed Password
 * @returns true - false
 */
export const comparePassword = async function (
  this: HydratedDocument<IUser>,
  password: string,
) {
  return bcryptjs.compareSync(password, this.password);
};
