/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Chat {
  id: number;
  welcomeMessage?: string;
  history?: { role: string; parts: { text: string }[] }[];
}
