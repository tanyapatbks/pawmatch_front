// src/app/libs/userRegister.ts
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.resolve(
  process.cwd(),
  "src/app/libs/grpc/proto/auth.proto"
);

interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  surname: string;
  displayName: string;
  telephoneNumber?: string;
  lineId?: string;
  profileImage?: Buffer;
}

interface RegisterResponse {
  userId: string;
  token: string;
  message: string;
}

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
  bytes: Buffer, // Add support for bytes type
});

const proto = (grpc.loadPackageDefinition(packageDefinition) as any).auth;
const client = new proto.AuthService(
  "127.0.0.1:50051",
  grpc.credentials.createInsecure()
);

export default async function userRegister(
  userData: RegisterRequest
): Promise<RegisterResponse> {
  return new Promise((resolve, reject) => {
    console.log("Attempting gRPC register:", { email: userData.email });

    client.Register(
      userData,
      (error: Error | null, response: RegisterResponse) => {
        if (error) {
          console.error("gRPC register error:", error);
          reject(error);
          return;
        }

        console.log("gRPC register response:", response);
        resolve(response);
      }
    );
  });
}
