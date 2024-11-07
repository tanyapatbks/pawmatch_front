// src/app/libs/userLogin.ts
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.resolve(
  process.cwd(),
  "src/app/libs/grpc/proto/auth.proto"
);

interface LoginResponse {
  token: string;
  userId: string;
}

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = (grpc.loadPackageDefinition(packageDefinition) as any).auth;
const client = new proto.AuthService(
  "127.0.0.1:50051",
  grpc.credentials.createInsecure()
);

export default async function userLogin(
  userEmail: string,
  userPassword: string
) {
  return new Promise<LoginResponse>((resolve, reject) => {
    console.log("Attempting gRPC login:", { userEmail });

    client.Login(
      { email: userEmail, password: userPassword },
      (error: Error | null, response: LoginResponse) => {
        if (error) {
          console.error("gRPC login error:", error);
          reject(error);
          return;
        }

        console.log("gRPC login response:", response);
        resolve(response);
      }
    );
  });
}
