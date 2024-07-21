import { util } from "@aws-appsync/utils";

export function request(ctx) {
  return {
    method: "DELETE",
    resourcePath: "/objects/" + ctx.arguments.id,
    params: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
}

export function response(ctx) {
  if (ctx.error) {
    return util.error(ctx.error.message, ctx.error.type);
  }
  if (ctx.result.statusCode == 200) {
    return JSON.parse(ctx.result.body);
  } else {
    return util.appendError(ctx.result.body, "ctx.result.statusCode");
  }
}