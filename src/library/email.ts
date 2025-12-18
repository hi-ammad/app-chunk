import nodemailer from "nodemailer";
import pug from "pug";
import { readFileSync } from "fs";
import handlebars from "handlebars";
import { convert } from "html-to-text";
import type { HydratedDocument } from "mongoose";
import { Constant } from "@/constants";
import type IEmail from "@/types/email";
import sgMail from "@sendgrid/mail";
import { MailService } from "@sendgrid/mail";
import type { Transporter } from "nodemailer";
import.meta.dir;
import path from "path";

export default class Email implements IEmail {
  id: number;
  to: string;
  firstName: string;
  url: string;
  otp: string;
  from: string;

  constructor(user: IUser | HydratedDocument<IUser>, url: string, otp: string) {
    this.id = user.id,
      this.to = user.email;
    this.firstName = user.user_name
    this.url = url; /* VERIFICATION_OR_PROFILE_PHOTO_UPDATE_URL */
    this.otp = otp;
    this.from = `<${Constant.instance.server.nodeEnv === "production" ? Constant.instance.sendgrid.from : Constant.instance.mailtrap.from}>`;
  }

  newTransport(): MailService | Transporter {
    /* PRODUCTION - USE SENDGRID */
    //  INFO: 1) IF THE NODE_ENV IS PRODUCTION, USE SENDGRID TO SEND EMAILS.

    if (Constant.instance.server.nodeEnv === "production" || Constant.instance.server.nodeEnv === "test") {
      const { apiKey } = Constant.instance.sendgrid;
      sgMail.setApiKey(apiKey);
      return sgMail;
    }

    /* DEVELOPMENT - USE MAILTRAP */
    const { host, port, userName, password } = Constant.instance.mailtrap;
    return nodemailer.createTransport({
      host: host,
      port: port,
      auth: {
        user: userName,
        pass: password,
      },
    });
  }

  async send(template: string, subject: string) {
    // 1. Read HBS template file
    const templatePath = path.join(
      __dirname,
      `../../views/email/${template}.hbs`
    );
    const source = readFileSync(templatePath, "utf-8");
    const compiledTemplate = handlebars.compile(source);

    // 2. Generate HTML using template context
    const html = compiledTemplate({
      id: this.id,
      firstName: this.firstName,
      email: this.to,
      url: this.url,
      otp: this.otp,
      subject,
    });

    // 3. Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    // 4. Send email
    const transport = this.newTransport();
    if (transport instanceof MailService) {
      await transport.send(mailOptions);
    } else {
      await transport.sendMail(mailOptions);
    }
  }

  /* SEND_THE_ACTUAL_EMAIL */
  async send2(template: string, subject: string) {
    //  INFO: 1) RENDER_HTML_BASED_ON_A_PUG_TEMPLATE
    const html = pug.renderFile(
      `${__dirname}/../../views/email/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        otp: this.otp,
        subject,
      },
    );
    //  INFO: 2) DEFINE_EMAIL_OPTIONS
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
      //   text: htmlToText.convert(html),
    };

    //  INFO: 3) CREATE_A_TRANSPORT_AND_SEND_EMAIL
    const transport = this.newTransport();

    //  INFO: 4) if tansport is an instance of MailService, use sendgrid , otherwise use mailtrap 
    if (transport instanceof MailService) await transport.send(mailOptions)
    else await transport.sendMail(mailOptions);
  }

  /*  INFO: SENDS_A_WELCOME_MESSAGE_TO_THE_USER_ASYNCHRONOUSLY. */
  async sendWelcome() {
    await this.send("welcome", "Welcome to the  Family!");
  }

  async sendAdminWelcome() {
    await this.send(
      "admin_welcome",
      "user Profile has been created successfull",
    );
  }

  async sendAdminVerifyNotid() {
    await this.send("admin_verify_notification", "A user has been verified successfully.!");
  }

  /*  INFO: SENDS_A_VERIFICATION_OTP_(ONE-TIME_PASSWORD)_ASYNCHRONOUSLY. */
  async sendVerification() {
    await this.send("send_verification", "Verification OTP!");
  }

  /* INFO: SENDS_A_PROFILE_PHOTO_UPDATE_VERIFICATION_OTP_(ONE-TIME_PASSWORD) */
  async verifyEmail() {
    await this.send("welcome", "Welcome to the   Family!");
  }

  /*  INFO: SENDS_A_PASSWORD_RESET_TOKEN_TO_THE_USER_ASYNCHRONOUSLY. */
  async sendPasswordReset() {
    await this.send(
      "password_reset",
      "Your password reset token (valid for only 10 minutes)",
    );
  }

  /*  INFO: Profile Complete Notification. */
  async sendProfileCompleteNotification() {
    await this.send(
      "profile_complete",
      "user Profile has been completed successfull",
    );
  }

  /*  INFO: Profile Complete Notification. */
  async sendAdminProfileCompleteNotification() {
    await this.send(
      "admin_profile_completes",
      "user Profile has been completed successfull",
    );
  }

}

