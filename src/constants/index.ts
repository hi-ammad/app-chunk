export class Constant implements IConstant {
  private static _instance: Constant;

  server: { port: number; apiVersion: string; nodeEnv: string };

  sentry: { dsn: string };

  s3: { bucket: string; secretKey: string; accessKey: string; region: string };
  appUrl: string;
  redis: { password: string; host: string; port: number };
  google: { clientId: string; clientSecret: string; redirectUrl: string };

  jwt: {
    accessSecret: string;
    refreshSecret: string;
    resetSecret: string;
    resetExpire: string;
    accessExpire: string;
    refreshExpire: string;
  };

  db: { url: string };

  mailtrap: {
    from: string;
    host: string;
    port: number;
    userName: string;
    password: string;
  };

  sendgrid: {
    from: string;
    host: string;
    port: number;
    apiKey: string;
  };

  private constructor() {
    /* INFO: GOOGLE_AUTH_SSO*/
    this.google = {
      clientId: Bun.env.GOOGLE_CLIENT_ID,
      clientSecret: Bun.env.GOOGLE_CLIENT_SECRET,
      redirectUrl: Bun.env.GOOGLE_REDIRECT_URI,
    };

    /*  INFO: SENTRY */
    this.sentry = {
      dsn: Bun.env.SENTRY_DSN!,
    };

    this.appUrl = Bun.env.APP_URL!;

    /*  INFO: SERVER */
    this.server = {
      port: Bun.env.PORT,
      apiVersion: Bun.env.API_VERSION,
      nodeEnv: Bun.env.NODE_ENV,
    };

    /*  INFO: REDIS */
    this.redis = {
      password: Bun.env.REDIS_PASSWORD,
      host: Bun.env.REDIS_HOST,
      port: Bun.env.REDIS_PORT,
    };

    /*  INFO: DATABASE */
    this.db = {
      url: Bun.env.MONGO_URL,
    };

    /*  INFO: AWS_S3_BUCKET */
    this.s3 = {
      bucket: Bun.env.S3_BUCKET_NAME,
      secretKey: Bun.env.S3_SECRET_KEY,
      accessKey: Bun.env.S3_ACCESS_KEY,
      region: Bun.env.S3_REGION,
    };

    /*  INFO: JSON_WEB_TOKEN */
    this.jwt = {
      accessSecret: Bun.env.JWT_ACCESS_SECRET,
      refreshSecret: Bun.env.JWT_REFRESH_SECRET,
      accessExpire: Bun.env.JWT_ACCESS_EXPIRE,
      refreshExpire: Bun.env.JWT_REFRESH_EXPIRE,
      resetExpire: Bun.env.JWT_RESET_EXPIRE!,
      resetSecret: Bun.env.JWT_RESET_SECRET!,
    };

    /*  INFO: MAILTRAP */
    this.mailtrap = {
      from: Bun.env.MAILTRAP_FROM,
      host: Bun.env.MAILTRAP_HOST,
      port: Bun.env.MAILTRAP_PORT,
      userName: Bun.env.MAILTRAP_USERNAME,
      password: Bun.env.MAILTRAP_PASSWORD,
    };

    /*  INFO: SENDGRID */
    this.sendgrid = {
      from: Bun.env.SENDGRID_SENDER_EMAIL,
      host: Bun.env.SENDGRID_HOST,
      port: Bun.env.SENDGRID_PORT,
      apiKey: Bun.env.SENDGRID_API_KEY,
    };
  }

  /*  INFO: STATIC_INSTANCE */
  static get instance(): Constant {
    if (Constant._instance != null) return Constant._instance;
    Constant._instance = new Constant();
    return Constant._instance;
  }

  /*  INFO: OVERLOAD_toString() */
  public toString = (): string => {
    const { server, s3, jwt, mailtrap, db } = this;
    return `\n============= Env Variables <Start> =============
    \n server: { port: ${server.port} , nodeEnv: ${server.nodeEnv} , apiVersion : ${server.apiVersion} }
    \n db: { url: ${db.url} }
    \n s3 { accessKey: ${s3.accessKey} , secretKey: ${s3.secretKey} , bucket: ${s3.bucket} , region: ${s3.region} }
    \n jwt { accessKey: <${jwt.accessSecret}> , accessExpire: <${jwt.accessExpire}> , refreshSecret: <${jwt.refreshSecret}>  }
    \n mailtrap { from: <${mailtrap.from}> , host: <${mailtrap.host}> , port: <${mailtrap.port}> ,  userName: <${mailtrap.userName}> , password: <${mailtrap.password}>  }
    \n ============= Env Variables <End> =============`;
  };
}
