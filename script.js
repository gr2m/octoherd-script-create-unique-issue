// @ts-check

import { readFile } from "node:fs/promises";

/**
 * create an issue with a unique title unless it already exists
 *
 * @param {import('@octoherd/cli').Octokit} octokit
 * @param {import('@octoherd/cli').Repository} repository
 * @param {object} options
 * @param {string} options.title Title of the issue to be created
 * @param {string} options.body Issue body text or path to fail containing the issue body
 */
export async function script(octokit, repository, options) {
  // make sure the issue does not yet exist
  for await (const response of octokit.paginate.iterator(
    "GET /repos/{owner}/{repo}/issues",
    {
      owner: repository.owner.login,
      repo: repository.name,
      per_page: 100,
      state: "open",
    }
  )) {
    for (const issue of response.data) {
      if (issue.title === options.title) {
        octokit.log.info(`Issue already exists: ${issue.html_url}`);
        return;
      }
    }
  }

  const body = await readBody(octokit, options.body);

  const { data: newIssue } = await octokit.request(
    "POST /repos/{owner}/{repo}/issues",
    {
      owner: repository.owner.login,
      repo: repository.name,
      title: options.title,
      body,
    }
  );

  octokit.log.info(`Issue created: ${newIssue.html_url}`);
}

// we only need to read body from options once
let stateBody;

/**
 *
 * @param {import('@octoherd/cli').Octokit} octokit
 * @param {string} body
 * @returns
 */
async function readBody(octokit, body) {
  if (stateBody) return stateBody;

  const hasLineBreaks = body.split("\n").length > 1;

  if (hasLineBreaks) {
    stateBody = body;
  } else {
    // attempt to read the files
    try {
      stateBody = await readFile(body, "utf8");
      octokit.log.info(`Read body from file: ${body}`);
    } catch (error) {
      stateBody = body;
      octokit.log.info(
        `"${body}" is not a path or no file exists at that path. Using as body text.`
      );
    }
  }

  return stateBody;
}
