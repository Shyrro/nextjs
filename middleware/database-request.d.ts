import { IncomingMessage, ServerResponse } from "http";
import { Db } from "mongodb";

interface IncomingDbMessage implements IncomingMessage {
  db: Db;
  body: any;
}

interface NextServerResponse implements ServerResponse {
    send: Send<T>;
}
