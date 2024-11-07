// src/app/libs/getUserProfile.ts
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.resolve(
  process.cwd(),
  "src/app/libs/grpc/proto/auth.proto"
);

interface ProfileResponse {
  userId: string;
  name: string;
  surname: string;
  displayName: string;
  email: string;
  telephoneNumber: string;
  lineId?: string;
  profileImage?: string;
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

export default async function getUserProfile(
  userId: string
): Promise<ProfileResponse> {
  return new Promise((resolve, reject) => {
    client.GetProfile(
      { userId },
      (error: Error | null, response: ProfileResponse) => {
        if (error) {
          console.error("gRPC get profile error:", error);
          reject(error);
          return;
        }
        console.log("gRPC get profile response:", response);
        resolve(response);
      }
    );
  });
}
