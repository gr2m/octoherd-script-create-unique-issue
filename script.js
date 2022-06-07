// @ts-check

/**
 * create an issue with a unique title unless it already exists
 *
 * @param {import('@octoherd/cli').Octokit} octokit
 * @param {import('@octoherd/cli').Repository} repository
 * @param {object} options
 * @param {string} options.title Title of the issue to be created
 * @param {string} options.body Issue body text or path to fail containing the issue body
 */
export async function script(octokit, repository, { title, body }) {}
