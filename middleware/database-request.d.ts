import { IncomingMessage, ServerResponse } from "http";
import { Db } from "mongodb";

interface IncomingDbMessage {
  db: Db;
  body: any;
}

interface NextServerResponse implements ServerResponse {
    send: Send<T>;
}
