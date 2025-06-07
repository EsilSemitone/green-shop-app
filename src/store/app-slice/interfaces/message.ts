import { MESSAGE_TYPE } from "../enums/message-type";

export interface IMessage {
    content: string;
    type: MESSAGE_TYPE;
}
