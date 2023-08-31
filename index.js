"use strict";

const defaultAllowedText = "User-agent: *\nDisallow:\n";
const defaultDisallowedText = "User-agent: *\nDisallow: /\n";

/**
 * Create koa middleware that handles requests for '/robots.txt', according to the current domain
 * @param  {array<string>} allowedDomains - Array of domains (strings), where search engines are allowed to crawl
 * @param  {string} [allowedText] - Content of the robots.txt for allowed domains
 * @param  {string} [disallowedText] - Content of the robots.txt for non-allowed domains
 * @return {function} koa middleware
 */
module.exports = (allowedDomains, allowedText, disallowedText) => {
  if (!Array.isArray(allowedDomains)) {
    throw new Error("Please supply array of allowed domains");
  }

  const allowed = new Set(allowedDomains.map((domain) => domain.toLowerCase()));

  // set allowedText to default, if not set
  if (typeof allowedText !== "string") {
    allowedText = defaultAllowedText;
  }

  // set disallowedText to default, if not set
  if (typeof disallowedText !== "string") {
    disallowedText = defaultDisallowedText;
  }

  return async (ctx, next) => {
    if (ctx.path.toLowerCase() !== "/robots.txt") {
      return await next();
    }

    ctx.body = !allowed.has(ctx.hostname.toLowerCase())
      ? disallowedText
      : allowedText;
  };
};
