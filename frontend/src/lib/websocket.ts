import { WS_BASE_URL } from "./constants";
export function createLumoSocket(userId: number) {
  return new WebSocket(`${WS_BASE_URL}/api/v1/ws/lumo/${userId}`);
}
