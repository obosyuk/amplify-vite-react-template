import type { Schema } from "../../data/resource"
import { env } from '$amplify/env/say-hello';

export const handler: Schema["sayHello"]["functionHandler"] = async (event) => {
  // arguments typed from `.arguments()`
  // const { name } = event.arguments
  // return typed from `.returns()`
  // console.log("Hello, ", name)
  // return `Hello, ${name}!`
  return `Hello, ${env.NAME}!`;
}